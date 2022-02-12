const textInput = document.querySelector(".todo-add");
const todosList = document.querySelector(".todos-list");
const fromInput = document.querySelector("form");

const createTodo = function (todoJSON) {

    const {text, checked, id} = todoJSON;

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
    todoText.innerText = text;
    
    if(checked) {
        todo.classList.add("done");
        todoInput.checked = true;
    }
    todo.setAttribute("todo-id",id);


    todo.appendChild(todoDelete);
    todo.appendChild(todoInput);
    todo.appendChild(todoText);


    todoInput.addEventListener("change",function(event) {
        const query = `http://localhost:8080/todo/${todo.getAttribute("todo-id")}`;
        fetch(query, {method:"PATCH",headers: {"Content-Type" : "application/json"}})
        .then(function(res) {
            todo.classList.toggle("done");
        })   
    })
    
    todoDelete.addEventListener("click",function(event) {
        const query = `http://localhost:8080/todo/${todo.getAttribute("todo-id")}`;
        fetch(query, {method:"DELETE",headers: {"Content-Type" : "application/json"}})
        .then(function(res) {
            removeTodo(todo);
        })   
    })

    return todo;
}


const renderTodo = function(todo) {
    todosList.prepend(todo);
}

const removeTodo = function(todo) {
    todo.remove();
}

const retrieveTodos = function() {
    const query = `http://localhost:8080/todos`;

    fetch(query,{method:"GET"})
    .then(function(res) {
        return res.json();
    }) 
    .then(function(todos) {
        todos.forEach(function(todo) {
            if(todo) renderTodo(createTodo(todo));
        })
    })
}

fromInput.addEventListener("submit", function(e) {
    e.preventDefault;
    const {value} = textInput;

    fetch("http://localhost:8080/todo", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify( {"text":value, "checked":false} ) })
        
    .then(function(res) {
        return res.json();
    })
    .then(function(jsonTodo) {
        const newTodo = createTodo(jsonTodo);
        renderTodo(newTodo);
        textInput.value="";
    })
    .catch(function(err) {
        console.log(err);
    }); 

})

window.onload = retrieveTodos();



    


    





