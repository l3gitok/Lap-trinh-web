const Todo = require('../models/todo.js');

exports.getAllTodos = async (req, res) => {
    try {
        const results = await Todo.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error getting todos:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        
        // Validation
        if (!title || !due_date) {
            return res.status(400).json({ error: 'Title and due date are required' });
        }

        await Todo.create(title, description, new Date(due_date));
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, due_date, completed } = req.body;

        // Validation
        if (!title || !due_date) {
            return res.status(400).json({ error: 'Title and due date are required' });
        }

        const result = await Todo.update(id, title, description, completed, new Date(due_date));
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.delete(id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
