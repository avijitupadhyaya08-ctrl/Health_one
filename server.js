const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Expose Static HTML Views (Mapped seamlessly via feature-folders so internal links don't break)
const featureDirs = [
    'src/features/auth',
    'src/features/appointments',
    'src/features/dashboard',
    'src/features/medical',
    'src/features/user',
    'src/features/core',
    'src/features/support',
    'src/features/skin-disease'
];

featureDirs.forEach(dir => {
    app.use(express.static(path.join(__dirname, dir)));
});

// Import Feature Routers
const authRoutes = require('./src/features/auth/auth.routes');
const appointmentRoutes = require('./src/features/appointments/appointments.routes');
const skinDiseaseRoutes = require('./src/features/skin-disease/skin-disease.routes');

// API Mounts
app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/skin-disease', skinDiseaseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
