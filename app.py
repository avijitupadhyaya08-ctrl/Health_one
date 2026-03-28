from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) # Enable CORS to allow the frontend to safely communicate with the backend

# Create an uploads directory to temporarily store scanned images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "LumiHealth AI Backend is running successfully! 🚀"})

@app.route('/api/scan', methods=['POST'])
def scan_image():
    """
    Mock AI API endpoint that handles image uploads from scan.html
    """
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided in the request"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
        
    # Save the uploaded file locally
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    # Simulate an AI analysis result
    return jsonify({
        "status": "success",
        "scan_type": "Chest X-Ray / MRI Scan",
        "confidence": 98.5,
        "findings": "No Anomalies Detected"
    })

if __name__ == '__main__':
    # Start the Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
