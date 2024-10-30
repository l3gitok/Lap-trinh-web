const express = require('express');
const router = express.Router();

const { request } = require("express");

const db = require("../configs/database");
router.get('/', async (req, res) => {
    db.query('SELECT * FROM todos', (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json(result);
    });
});
router.post('/', (req, res) => {
    const { title, description, due_date, completed } = req.body;

    if (!title || !description || !due_date || completed === undefined) {
        return res.status(400).send('Bad Request: Missing required fields');
    }

    const query = 'INSERT INTO todos (title, description, due_date, completed) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, due_date, completed], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.status(201).json({ id: result.insertId, title, description, due_date, completed });
    });
});
router.put('/:id', (req, res) => {
    const { title, description, due_date, completed } = req.body;
    const id = req.params.id;


    const query = 'UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?';
    db.query(query, [title, description, due_date, completed, id], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json({ id, title, description, due_date, completed});
    });
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json({ id });
    });
});

module.exports = router;

