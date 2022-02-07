const textInput = document.querySelector(".todo-add");
const todosList = document.querySelector(".todos");
const fromInput = document.querySelector("form");

const createTodo = function (todoTxt) {
    const todo = document.createElement("div");
    todo.classList.add("todo")

    const todoDelete = document.createElement("div");
    todoDelete.classList.add("todo-delete");
    todoDelete.innerText="x";

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = todoTxt;
    
    todo.appendChild(todoDelete);
    todo.appendChild(input);
    todo.appendChild(todoText);

    return todo;
}


const addTodo = function(todo) {
    todosList.appendChild(todo);
}

fromInput.addEventListener("submit", function(e) {
    e.preventDefault;
    const {value} = textInput;
    const newTodo = createTodo(value);

    console.log(newTodo);

    addTodo(newTodo);
    textInput.value="";
});




