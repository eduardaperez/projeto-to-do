// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


// const tagButton = document.querySelector(".tag-btn");
// const colorPicker = document.querySelector(".color-picker");
// let selectedTagColor = null;

// Funções

const saveTodo = (text) => {
    //criando a div
    const todo = document.createElement("div");
    todo.classList.add("todo");

    // salvando a tag
    // todo.dataset.tagColor = selectedTagColor || "";

    // // criando a tag visual
    // const tag = document.createElement("div");
    // tag.classList.add("tag");

    // if(selectedTagColor) {
    //     const tagIcon = document.createElement("i");
    //     tagIcon.classList.add("fa", "fa-tag")

    //     tagIcon.style.color = selectedTagColor;
    //     console.log(tagIcon)
    //     tag.appendChild(tagIcon);
    // }

    // criando o title
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;

    // criando os botões
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';


    //adicionando tudo
    // todo.appendChild(tag);
    todo.appendChild(todoTitle);
    todo.appendChild(doneBtn);
    todo.appendChild(editBtn);
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    // reset após salvar
    // resetTagButton();
    todoInput.value = "";
    todoInput.focus();
    
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
}


// const resetTagButton = () => {
//     selectedTagColor = null;

//     tagButton.style.backgroundColor = "#fdfdfd";
//     tagButton.querySelector("i").style.color = "#102f5e";
// };

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        console.log(inputValue);
        // Salvar input
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains("remove-todo")) {
        if(window.confirm("Tem certeza que deseja excluir a tarefa?")) {
            parentEl.remove();
        }
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

// tagButton.addEventListener("click", () => {
//   colorPicker.style.display =
//     colorPicker.style.display === "flex" ? "none" : "flex";
// });

// document.querySelectorAll(".color-picker span").forEach(color => {
//   color.addEventListener("click", (e) => {

//     if(color.id !== "no-tag") {
//         selectedTagColor = color.dataset.color;
//     } else {
//         selectedTagColor = null;
//     }

//     tagButton.style.backgroundColor = "#fdfdfd";
//     tagButton.querySelector("i").style.color = selectedTagColor;

//     colorPicker.style.display = "none";
//   });
// });