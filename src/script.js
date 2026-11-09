let todoList = document.getElementById("Todo-list")

let addTask = document.getElementById("addTask")

let submit = document.getElementById("submit")

let deleteBtn = document.getElementById("delete-btn")

let list = JSON.parse(localStorage.getItem("todoList")) || []

submit.addEventListener("click", (event) => {
    if (addTask.value != '') {
        list.push({
            text: addTask.value,
            completed: false
        });
        addTask.value = ""
        let lists = JSON.stringify(list);
        localStorage.setItem("todoList", lists)
        renderList()
    }
})

function renderList() {
    todoList.innerHTML = "" // Clear existing items to avoid duplicate rendering

    list.forEach((item, index) => {
        todoList.innerHTML += `
            <div id="todo-${index}" class="todo-list">
                <p style="text-decoration: ${item.completed ? 'line-through' : 'none'}">${item.text}</p>
                <div class="todo-list-btn">
                    <input type="checkbox" class="todo-checkbox" data-index="${index}" ${item.completed ? 'checked' : ''}>
                    <button class="edit-btn">
                        <a href="./pages/editPage.html?index=${index}">Edit</a>
                    </button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            </div>`;
    })
}

todoList.addEventListener("change", (event) => {
    if (event.target.classList.contains("todo-checkbox")) {
        const index = event.target.dataset.index;

        list[index].completed = event.target.checked;

        localStorage.setItem("todoList", JSON.stringify(list))

        renderList()
    }
})

todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;

        const isConfirmed = confirm("Are you sure you want to delete this task?");

        if (isConfirmed) {
            list.splice(index, 1);

            localStorage.setItem("todoList", JSON.stringify(list));

            renderList();
        }

    }
});

renderList()

const urlParams = new URLSearchParams(window.location.search);
const taskIndex = urlParams.get("index");

console.log("Task Index from URL:", taskIndex);
const editInput = document.getElementById("editInputValue");
const saveBtn = document.getElementById("saveBtn");

if (taskIndex !== null && list[taskIndex]) {
    editInput.value = list[taskIndex].text;
}

saveBtn.addEventListener("click", () => {
    if (editInput.value.trim() !== "") {
        list[taskIndex].text = editInput.value.trim();
        localStorage.setItem("todoList", JSON.stringify(list));

        window.location.href = "../../index.html";
    }
});

