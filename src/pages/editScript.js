
const urlParams = new URLSearchParams(window.location.search);
const taskIndex = urlParams.get("index");

let list = JSON.parse(localStorage.getItem("todoList")) || [];

const editInput = document.getElementById("editInputValue");
const saveBtn = document.getElementById("saveBtn");

if (taskIndex !== null && list[taskIndex] !== undefined) {
    const taskData = list[taskIndex];
    
    if (typeof taskData === "object" && taskData !== null) {
        editInput.value = taskData.text;
    } else {
        editInput.value = taskData;
    }
}

saveBtn.addEventListener("click", () => {
    if (editInput.value.trim() !== "") {
        if (typeof list[taskIndex] === "object" && list[taskIndex] !== null) {
            list[taskIndex].text = editInput.value.trim();
        } else {
            list[taskIndex] = editInput.value.trim();
        }

        localStorage.setItem("todoList", JSON.stringify(list));
        
        window.location.href = "../index.html"; 
    }
});