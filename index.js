function buildNewTodo(value) {
  const todoList = document.querySelector("#todo-list ul");
  // create li element
  const parentLi = document.createElement("li");

  // create todo title
  const todoSpanTitle = document.createElement("span");
  todoSpanTitle.textContent = value;
  const randomId = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
  parentLi.setAttribute("id", randomId);
  // create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.classList.add("actions");
  deleteButton.addEventListener("click", () => {
    deleteTodo(randomId);
  });
  // create edit button
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.classList.add("actions");
  // add title and delete and edit to li
  editButton.addEventListener("click", () => {
    console.log("edit button clicked");
    const listItem = editButton.parentElement;
    const span = listItem.querySelector("span");

    const editDivID = document.getElementById(`${listItem.id}div`);

    if (!editDivID) {
      const editDiv = document.createElement("div");
      editDiv.id = listItem.id + "div";
      const input = document.createElement("input");
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";

      editDiv.appendChild(input);
      editDiv.appendChild(saveButton);

      listItem.appendChild(editDiv);
      saveButton.addEventListener("click", () => {
        const newValue = input.value;
        span.textContent = newValue;

        editDiv.remove();
      });
    } else {
      editDivID.remove();
    }
  });
  parentLi.append(todoSpanTitle, deleteButton, editButton);
  todoList.append(parentLi);
}

const searchFunction = () => {
  const todoList = document.querySelector("#todo-list ul");
  const searchText = document.querySelector("#inputSearch").value;
  const children = todoList.children;
  Array.from(children).forEach((elem) => {
    elem.style.display = "block";
    if (!elem.querySelector("span").innerText.startsWith(searchText)) {
      elem.style.display = "none";
    }
  });
};

function deleteTodo(randomId) {
  const todoItem1 = document.getElementById(`${randomId}`);
  todoItem1.remove();
}

function addNewTodo() {
  const todoItem = document.getElementById("todo-item");
  const warning = document.getElementById("warning");
  const todoItemValue = todoItem.value;
  if (!todoItemValue.length) {
    warning.classList.remove("hidden-item");
    return;
  }
  if (!warning.classList.contains("hidden-item")) {
    warning.classList.add("hidden-item");
  }
  buildNewTodo(todoItemValue);
  todoItem.value = "";
}
