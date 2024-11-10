const db = require('../configs/database');
const util = require('util');

// Promisify the db.query method
const query = util.promisify(db.query).bind(db);

const Todo = {
    getAll: async () => {
        return await query('SELECT * FROM todos ORDER BY due_date ASC');
    },
    
    create: async (title, description, due_date) => {
        return await query(
            'INSERT INTO todos (title, description, due_date) VALUES (?, ?, ?)',
            [title, description, due_date]
        );
    },
    
    update: async (id, title, description, completed, due_date) => {
        return await query(
            'UPDATE todos SET title = ?, description = ?, completed = ?, due_date = ? WHERE id = ?',
            [title, description, completed, due_date, id]
        );
    },
    
    delete: async (id) => {
        return await query('DELETE FROM todos WHERE id = ?', [id]);
    }
};

module.exports = Todo;