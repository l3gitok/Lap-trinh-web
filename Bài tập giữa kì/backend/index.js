const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routers/todos');
const authRoutes = require('./routers/authRoutes');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors(
));
app.use(bodyParser.json());
app.use('/api', todoRoutes);
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
