const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routers/todos');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
