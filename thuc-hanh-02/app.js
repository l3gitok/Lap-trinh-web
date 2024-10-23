
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];


app.get('/users', (req, res) => {
    res.json(users);
});


app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    users = users.map(user => (user.id === userId ? updatedUser : user));
    res.status(200).json(updatedUser);
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});