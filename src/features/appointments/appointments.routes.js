const express = require('express');
const db = require('../../config/database');

const router = express.Router();

// 3. Create Appointment
router.post('/', (req, res) => {
    const { user_id, specialist, date, time } = req.body;

    if (!user_id || !specialist || !date || !time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = `INSERT INTO appointments (user_id, specialist, date, time) VALUES (?, ?, ?, ?)`;
    db.run(sql, [user_id, specialist, date, time], function(err) {
        if (err) {
            console.error("Database Error: ", err);
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        res.status(201).json({ message: 'Appointment booked successfully', appointmentId: this.lastID });
    });
});

// 4. Get User Appointments
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    const sql = `SELECT * FROM appointments WHERE user_id = ? ORDER BY date DESC, time DESC`;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error("Database Error: ", err);
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        res.status(200).json({ appointments: rows });
    });
});

// 5. Cancel Appointment
router.put('/:id/cancel', (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE appointments SET status = 'Cancelled' WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.error("Database Error: ", err);
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }
        res.status(200).json({ message: 'Appointment cancelled successfully' });
    });
});

module.exports = router;
