const fs = require('fs');
const path = require('path');

const dirs = [
    'src/config',
    'src/features/auth',
    'src/features/appointments',
    'src/features/dashboard',
    'src/features/medical',
    'src/features/user',
    'src/features/core',
    'src/features/support'
];

dirs.forEach(dir => {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Move database config
fs.renameSync(path.join(__dirname, 'database.js'), path.join(__dirname, 'src/config/database.js'));
// Keep database.sqlite at root, we'll update the config file path.

// Move HTML files
const fileMap = {
    'login.html': 'src/features/auth/login.html',
    'signup.html': 'src/features/auth/signup.html',
    'forgot-password.html': 'src/features/auth/forgot-password.html',

    'appointments.html': 'src/features/appointments/appointments.html',
    'appointment-history.html': 'src/features/appointments/appointment-history.html',
    'doctors.html': 'src/features/appointments/doctors.html',

    'dashboard.html': 'src/features/dashboard/dashboard.html',
    'main.html': 'src/features/dashboard/main.html',

    'records.html': 'src/features/medical/records.html',
    'emergency.html': 'src/features/medical/emergency.html',
    'search.html': 'src/features/medical/search.html',

    'profile.html': 'src/features/user/profile.html',
    'settings.html': 'src/features/user/settings.html',
    'notifications.html': 'src/features/user/notifications.html',
    'contact.html': 'src/features/user/contact.html',

    'chatbot.html': 'src/features/support/chatbot.html',

    'index.html': 'src/features/core/index.html'
};

for (const [file, dest] of Object.entries(fileMap)) {
    const srcPath = path.join(__dirname, file);
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, path.join(__dirname, dest));
    }
}

// Update database.js path
let dbCode = fs.readFileSync(path.join(__dirname, 'src/config/database.js'), 'utf8');
dbCode = dbCode.replace("path.resolve(__dirname, 'database.sqlite')", "path.resolve(process.cwd(), 'database.sqlite')");
fs.writeFileSync(path.join(__dirname, 'src/config/database.js'), dbCode);

console.log("Files moved to feature-based folders successfully.");
