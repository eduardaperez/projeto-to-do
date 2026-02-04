// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

const tagsBtn = document.querySelectorAll(".tag-btn");
const colorPicker = document.querySelector(".color-picker");

let oldInputValue;
let selectedColor = null;

// Funções

const saveTodo = (text, color = null) => {
  //criando a div
  const todo = document.createElement("div");
  todo.classList.add("todo");

  // criando o title
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;

  if (color) {
    todo.style.borderLeft = `6px solid ${color}`;
    todo.dataset.color = color;
  }

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
  todo.appendChild(todoTitle);
  todo.appendChild(doneBtn);
  todo.appendChild(editBtn);
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  // reset após salvar
  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      if (selectedColor) {
        todo.style.borderLeft = `6px solid ${selectedColor}`;
        todo.dataset.color = selectedColor;
      } else {
        todo.style.borderLeft = "";
        delete todo.dataset.color;
      }
    }
  });
};

const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    const normalizeTodo = search.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none"),
      );
      break;
    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none"),
      );
      break;
    default:
      break;
  }
};

const toggleColorPicker = (formControl, submitBtn) => {
  if (tagContainer.parentElement === formControl) {
    tagContainer.classList.toggle("show");
  } else {
    formControl.insertBefore(tagContainer, submitBtn);
    tagContainer.classList.add("show");
  }
};

const paintTagIcon = (formControl, color) => {
  const icon = formControl.querySelector(".tag-btn i");

  if (!color) {
    icon.style.color = ""; // volta ao padrão
  } else {
    icon.style.color = color;
  }
};

const resetTagIcons = () => {
  selectedColor = null;

  const todoFormControl = todoForm.querySelector(".form-control");
  paintTagIcon(todoFormControl, null);

  const editFormControl = editForm.querySelector(".form-control");
  paintTagIcon(editFormControl, null);
};

const closeColorPicker = () => {
  tagContainer.classList.remove("show");
  resetTagIcons();
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    // Salvar input
    saveTodo(inputValue, selectedColor);
    selectedColor = null; // reset
  }
  closeColorPicker();
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    if (window.confirm("Tem certeza que deseja excluir a tarefa?")) {
      parentEl.remove();
    }
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    const editFormControl = editForm.querySelector(".form-control");

    if (parentEl.dataset.color) {
      selectedColor = parentEl.dataset.color;

      // mostrar seletor no form de edição
      const submitBtn = editFormControl.querySelector("button[type='submit']");
      editFormControl.insertBefore(tagContainer, submitBtn);
    }

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
    paintTagIcon(editFormControl, selectedColor);
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
  resetTagIcons();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
  resetTagIcons();
  closeColorPicker();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

const tagContainer = document.createElement("div");
tagContainer.classList.add("color-picker");

tagContainer.innerHTML = `
            <span data-color="#da1c1c"></span>
            <span data-color="#f17611"></span>
            <span data-color="#e2b913"></span>
            <span data-color="#129724"></span>
            <span id="no-tag" data-color="#102f5e"></span>
            `;

tagsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const formControl = btn.closest(".form-control");
    const submitBtn = formControl.querySelector("button[type='submit']");

    toggleColorPicker(formControl, submitBtn);
  });
});

tagContainer.addEventListener("click", (e) => {
  const colorEl = e.target.closest("span");
  if (!colorEl) return;

  const formControl = tagContainer.parentElement;

  if (colorEl.id === "no-tag") {
    selectedColor = null;
  } else {
    selectedColor = colorEl.dataset.color;
  }

  document
    .querySelectorAll(".color-picker span")
    .forEach((span) => span.classList.remove("active"));

  colorEl.classList.add("active");
  paintTagIcon(formControl, selectedColor);
  tagContainer.classList.remove("show");
});
