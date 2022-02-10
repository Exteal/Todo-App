const express = require("express");
const todosRouter = require("./routes/todos");
const todoRouter = require("./routes/todo");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(todosRouter);

app.use(todoRouter);

app.listen(port, () => {
    console.log(`ecoute en cours au port ${port}`);
});