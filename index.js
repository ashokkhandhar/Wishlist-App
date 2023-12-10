const userInput = document.querySelector(".input");
const addButton = document.querySelector(".add-btn");
const todoContainer = document.querySelector(".todo-container");

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

addButton.addEventListener("click", (event)=>{
    event.preventDefault();
    let todo = userInput.value;
    if(todo.length > 0) {
        todoList.push({id: uuid(), todo, isDone: false});
    }
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList(todoList);
    userInput.value = "";
});

todoContainer.addEventListener("click", (event)=>{
    let key = event.target.dataset.key;
    let delKey = event.target.dataset.delkey;
    todoList = todoList.map(currElement => currElement.id === key ? {...currElement, isDone: !currElement.isDone} : currElement);
    todoList = todoList.filter(currElement => currElement.id !== delKey);
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList(todoList);
});

function renderTodoList(todoList) {
    todoContainer.innerHTML = todoList.map(
        ({todo, id, isDone}) =>
        `<div class="new-item">
            <input id="item-${id}" data-key=${id} class="new-checklist t-pointer" type="checkbox" ${isDone ? "checked" : ""}>
            <label data-key=${id} class="new-todo t-pointer ${isDone ? "checked" : ""}" for="item-${id}"> ${todo} </label>
            <button class="rmv-btn btn" data-delkey=${id}>Remove</button>
        </div>`
    ).join('');
}

renderTodoList(todoList);