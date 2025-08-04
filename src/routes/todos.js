const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Todo list with pagination
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const userId = req.session.user.user_id;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const countQuery = 'SELECT COUNT(*) AS count FROM todos WHERE user_id = ?';
    db.query(countQuery, [userId], (err, countResult) => {
        if (err) throw err;

        const totalTodos = countResult[0].count;
        const totalPages = Math.ceil(totalTodos / limit);

        const query = 'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
        db.query(query, [userId, limit, offset], (err, results) => {
            if (err) throw err;
            res.render('todos', {
                title: 'Todo List',
                user: req.session.user,
                todos: results,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});

// Add todo
router.post('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const userId = req.session.user.user_id;
    const { title } = req.body;
    const query = 'INSERT INTO todos (user_id, title) VALUES (?, ?)';
    db.query(query, [userId, title], (err, results) => {
        if (err) throw err;
        res.redirect('/todos');
    });
});

// Update todo
router.post('/update/:id', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const { id } = req.params;
    const { is_completed } = req.body;
    const query = 'UPDATE todos SET is_completed = ? WHERE todo_id = ? AND user_id = ?';
    db.query(query, [is_completed === 'true', id, req.session.user.user_id], (err, results) => {
        if (err) throw err;
        res.redirect('/todos');
    });
});

// Delete todo
router.get('/delete/:id', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE todo_id = ? AND user_id = ?';
    db.query(query, [id, req.session.user.user_id], (err, results) => {
        if (err) throw err;
        res.redirect('/todos');
    });
});

module.exports = router;
