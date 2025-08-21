const addBtn = document.getElementById("addBtn");
const assignmentInput = document.getElementById("assignment");
const dueDateInput = document.getElementById("dueDate");
const assignmentList = document.getElementById("assignmentList");
const notifyTip = document.getElementById("notifyTip");
const enableNotifyBtn = document.getElementById("enableNotifyBtn");

// Check notification permission at start
if (Notification.permission !== "granted") {
    notifyTip.hidden = false;
}

enableNotifyBtn.addEventListener("click", async () => {
    let permission = await Notification.requestPermission();
    if (permission === "granted") {
        notifyTip.hidden = true;
    }
});

addBtn.addEventListener("click", () => {
    const name = assignmentInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!name || !dueDate) {
        alert("Please enter both assignment name and due date/time.");
        return;
    }

    const li = document.createElement("li");
    const due = new Date(dueDate);
    li.innerHTML = `
    <span>${name} - Due: ${due.toLocaleString()}</span>
    <div>
      <button class="doneBtn">✔</button>
      <button class="deleteBtn">❌</button>
    </div>
  `;

    assignmentList.appendChild(li);
    assignmentInput.value = "";
    dueDateInput.value = "";

    const doneBtn = li.querySelector(".doneBtn");
    const deleteBtn = li.querySelector(".deleteBtn");

    doneBtn.addEventListener("click", () => {
        li.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    // Notification logic: remind 1 minute before
    const now = new Date();
    const msUntilDue = due - now - 60000; // 1 min before due
    if (msUntilDue > 0 && Notification.permission === "granted") {
        setTimeout(() => {
            new Notification(`Reminder: ${name} is due in 1 minute!`);
        }, msUntilDue);
    }
});
