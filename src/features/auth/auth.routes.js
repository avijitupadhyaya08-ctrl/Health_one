const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../config/database');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { fullname, age, gender, email, password } = req.body;

    if (!fullname || !age || !gender || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `INSERT INTO users (fullname, age, gender, email, password) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [fullname, age, gender, email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Email already exists.' });
                }
                console.error("Database Error: ", err);
                return res.status(500).json({ error: 'Database error occurred.' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (error) {
        console.error("Signup Error: ", error);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            console.error("Database Error: ", err);
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                fullname: user.fullname,
                age: user.age,
                gender: user.gender,
                email: user.email
            }
        });
    });
});

module.exports = router;
