let input = document.querySelector("input");
let total = document.querySelector("#total");
let complete = document.querySelector("#Complete");
let btn = document.querySelector(".btn");
let keyboard = document.querySelector(".keyboard");
let taskList = document.querySelector(".dis");
let maxCount = 5;
let count = 0;
complete.textContent = 0;

// virtual button created//

// Create alphabet buttons
for(let i = 97; i <= 122; i++) {
    let cl = String.fromCharCode(i);
    let btns = document.createElement("button");
    btns.textContent = cl;
    keyboard.append(btns);
    btns.addEventListener("click", () => {
        input.value += btns.textContent;
    });
}

// Add backspace button
const backspaceBtn = document.createElement("button");
backspaceBtn.textContent = "⌫"; // or "Back"
backspaceBtn.classList.add("backspace-btn");
keyboard.append(backspaceBtn)     
backspaceBtn.addEventListener("click", () => {
    input.value = input.value.slice(0, -1); // Remove last character
});

keyboard.append(backspaceBtn);




// add task //

const addTask = () => {
    const taskText = input.value.trim();
    
    // Check empty task
    if (taskText === "") {
        alert("Task is empty! Please enter task.");
        input.value = "";
        return;
    }

    // Check maximum tasks
    if (count >= maxCount) {
        alert("Max 5 tasks only");
        input.value = "";
        return;
    }

    // Check duplicate tasks
    const existingTasks = Array.from(taskList.querySelectorAll('.normal'));
    const isDuplicate = existingTasks.some(task => 
        task.textContent.trim().toLowerCase() === taskText.toLowerCase()
    );

    if (isDuplicate) {
        alert("This task already exists!");
        input.value = "";
        return;
    }

    // Create new task
    let taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <div class="li-content">
            <input class="check" type="checkbox">
            <span class="normal">${taskText}</span>
        </div>
        <div class="li-btn">
            <button class="Edit">✎</button>
            <button class="remove">✖</button>
        </div>
    `;
    
    taskList.append(taskItem);
    input.value = "";
    count++;
    total.textContent=count;

  // In the remove event listener
taskItem.querySelector(".remove").addEventListener("click", () => {
    // Check if task was completed before removing
    const wasChecked = taskItem.querySelector(".check").checked;
    if (wasChecked) {
        complete.textContent = Math.max(0, parseInt(complete.textContent) - 1);
    }
    
    taskItem.remove();
    count--;
    total.textContent = count;
});

// In the checkbox change event
taskItem.querySelector(".check").addEventListener("change", function() {
    const taskText = this.closest('.li-content').querySelector('.normal');
    
    if (this.checked) {
        taskText.classList.add('line-through');
        complete.textContent++;
    } else {
        taskText.classList.remove('line-through');
        complete.textContent = Math.max(0, parseInt(complete.textContent) - 1);
    }
});
    let edit=taskItem.querySelector(".Edit");
   edit.addEventListener("click", () => {
    // Change edit button to save icon
    edit.textContent = '💾';
    
    const taskEdit = taskItem.querySelector(".normal");
    const currentText = taskEdit.textContent;
    
    // Create edit input
    const editInput = document.createElement("input");
    editInput.value = currentText;
    editInput.classList.add("edit-input");
    
    // Replace text with input field
    taskEdit.replaceWith(editInput);
    editInput.focus();

    const saveChanges = () => {
        const newText = editInput.value.trim();
        
        // 1. Validate empty input
        if (!newText) {
            alert("Task cannot be empty!");
            editInput.replaceWith(taskEdit);
            edit.textContent = '✎';
            return;
        }

        // 2. Check duplicates (excluding current task)
        const editExistingTasks = Array.from(taskList.querySelectorAll('.normal'))
            .filter(task => task !== taskEdit) // Exclude current task
            .map(task => task.textContent.trim().toLowerCase());

        if (editExistingTasks.includes(newText.toLowerCase())) {
            alert("This task already exists!");
            editInput.replaceWith(taskEdit);
            edit.textContent = '✎';
            return;
        }

        // 3. Update task text
        taskEdit.textContent = newText;
        editInput.replaceWith(taskEdit);
        edit.textContent = '✎'; // Reset to edit icon
    };

    // Save on Enter key press
    editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") saveChanges();
    });

    // Save when clicking outside (blur)
    editInput.addEventListener("blur", saveChanges);
});
    
};



btn.addEventListener("click",()=> {
        addTask();
})

