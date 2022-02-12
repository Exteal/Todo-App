const express = require("express");
const bodyParser = require("body-parser");

const todosRouter = require("./routes/todos.js");
const todoRouter = require("./routes/todo.js");
const dbMiddleware = require("./middlewares/dbMiddleware.js");
const cors = require("./middlewares/cors.js");

const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(dbMiddleware);
app.use(cors);


app.use(todosRouter);
app.use(todoRouter);

app.listen(port, () => {
    console.log(`ecoute en cours au port ${port}`);
});