const express = require('express');
const app = express();
const port = 3000;
const todosRouter = require('./src/routers/todos');
const bodyParser = require('body-parser');
app.use(express.json());

app.use(bodyParser.json());
app.use('/api', todosRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
