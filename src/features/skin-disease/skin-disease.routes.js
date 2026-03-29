const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const router = express.Router();

// Configuration for multer upload
const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'skin-scan-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const modelDir = path.join(__dirname, '../../../skin-disease-model');
const detectScript = path.join(modelDir, 'detect.py');
const modelFile = path.join(modelDir, 'skin_disease_model_ISIC_densenet.h5');

// Route for analyzing the image
router.post('/analyze', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // Spawn python process
    const pythonProcess = spawn('python', [
        detectScript,
        imagePath,
        '--model_path', modelFile
    ]);

    let dataString = '';
    let errorString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
    });

    pythonProcess.on('close', (code) => {
        // Clean up the uploaded file after processing
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Could not delete uploaded file:", err);
        });

        if (code !== 0) {
            console.error(`Python script exited with code ${code}: ${errorString}`);
            return res.status(500).json({ success: false, message: 'Image analysis failed during script execution', error: errorString });
        }

        // Parse Output
        try {
            // Expected output log format from detect.py:
            // --- Detection Results ---
            // 1. Melanoma: 80.5%
            // 2. Melanocytic nevus: 10.2%
            
            const results = [];
            const resultLines = dataString.split('\n');
            let parsing = false;
            
            for(let line of resultLines) {
                line = line.trim();
                if (line.includes('--- Detection Results ---')) {
                    parsing = true;
                    continue;
                }
                
                if (parsing && line.match(/^\d+\./)) {
                    // Extract rank, name, and percentage
                    const match = line.match(/^\d+\.\s+(.+):\s+([\d.]+)%$/);
                    if (match) {
                        results.push({
                            condition: match[1].trim(),
                            probability: parseFloat(match[2])
                        });
                    }
                }
            }
            
            if (results.length === 0) {
                // If parsing fails for some reason (e.g. prediction failed, or no model)
                if (dataString.includes('Detection failed')) {
                   return res.status(500).json({ success: false, message: 'Detection failed inside Python script', log: dataString });
                }
                if (dataString.includes('not found')) {
                   return res.status(500).json({ success: false, message: 'Model file not found. Ensure create_dummy_model.py is meant to be run or download the real model.', log: dataString });
                }
            }

            return res.json({
                success: true,
                results: results,
                rawLogs: dataString
            });

        } catch(e) {
            console.error("Error parsing python output", e, dataString);
            return res.status(500).json({ success: false, message: 'Failed to process AI results', internal_err: e.toString() });
        }
    });
});

module.exports = router;
