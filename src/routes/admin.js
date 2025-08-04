const express = require('express');
const router = express.Router();
const db = require('../config/db');


// Middleware to check for admin user
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.email === 'admin@example.com') {
        return next();
    }
    res.redirect('/');
};

// Admin page - list all users with pagination
router.get('/', isAdmin, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const countQuery = 'SELECT COUNT(*) AS count FROM users';
    db.query(countQuery, (err, countResult) => {
        if (err) throw err;

        const totalUsers = countResult[0].count;
        const totalPages = Math.ceil(totalUsers / limit);

        const query = 'SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?';
        db.query(query, [limit, offset], (err, results) => {
            if (err) throw err;
            res.render('admin', {
                title: 'Admin - User Management',
                user: req.session.user,
                users: results,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});

// Add a new user
router.post('/add', isAdmin, (req, res) => {
    const { user_name, email, password } = req.body;
    const query = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
    db.query(query, [user_name, email, password], (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Update user
router.post('/update/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    const { user_name, email } = req.body;
    const query = 'UPDATE users SET user_name = ?, email = ? WHERE user_id = ?';
    db.query(query, [user_name, email, id], (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Delete user
router.get('/delete/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

module.exports = router;
