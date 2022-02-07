const textInput = document.querySelector(".todo-add");
const todosList = document.querySelector(".todos-list");
const fromInput = document.querySelector("form");

const createTodo = function (todoTxt) {
    const todo = document.createElement("div");
    todo.classList.add("todo")

    const todoDelete = document.createElement("div");
    todoDelete.classList.add("todo-delete");
    todoDelete.innerText="x";

    const todoInput = document.createElement("input");
    todoInput.classList.add("input-ck");
    todoInput.setAttribute("type", "checkbox");

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = todoTxt;
    
    todo.appendChild(todoDelete);
    todo.appendChild(todoInput);
    todo.appendChild(todoText);


    todoInput.addEventListener("change",function(event) {
        todo.classList.toggle("done");
    })
    
    todoDelete.addEventListener("click",function(event) {
        removeTodo(todo);
    })

    return todo;
}


const addTodo = function(todo) {
    todosList.prepend(todo);
}

const removeTodo = function(todo) {
    todo.remove();
}

const changeTodo = function(todo) {

}





fromInput.addEventListener("submit", function(e) {
    e.preventDefault;
    const {value} = textInput;
    const newTodo = createTodo(value);

    console.log(newTodo);

    addTodo(newTodo);
    textInput.value="";
});




