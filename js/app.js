
const appName = "Decision Journal";
let userName = "Guest";
let searchInput;
let priorityFilter;
let sortOption;
let goals = [];

let goalForm;
let goalList;
let getStartedBtn;
let loginBtn;
let signupBtn;

let totalGoalsElement;
let completedGoalsElement;
let pendingGoalsElement;
let highPriorityGoalsElement;

let notification;
// ==========================
// 4. Event Listeners
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    // Select DOM Elements
    goalForm = document.getElementById("goalForm");
    goalList = document.getElementById("goalList");
    searchInput = document.getElementById("searchInput");
    priorityFilter = document.getElementById("priorityFilter");
    sortOption = document.getElementById("sortOption");

    getStartedBtn = document.getElementById("getStartedBtn");
    loginBtn = document.getElementById("loginBtn");
    signupBtn = document.getElementById("signupBtn");

    // Register Event Listeners
    getStartedBtn.addEventListener("click", showWelcomeMessage);
    loginBtn.addEventListener("click", showLoginMessage);
    signupBtn.addEventListener("click", showSignupMessage);
    searchInput.addEventListener("input", renderGoals);
    priorityFilter.addEventListener("change", renderGoals);
    goalForm.addEventListener("submit", createGoal);
    sortOption.addEventListener("change", renderGoals);

    totalGoalsElement = document.getElementById("totalGoals");
    completedGoalsElement = document.getElementById("completedGoals");
    pendingGoalsElement = document.getElementById("pendingGoals");
    highPriorityGoalsElement = document.getElementById("highPriorityGoals");
    notification = document.getElementById("notification");

    // Load Saved Goals
    loadGoals();

    // Initial Render
    renderGoals();

    updateDashboard();

});

// ==========================
// 5. Functions
// ==========================

// Welcome Button
function showWelcomeMessage() {
    alert(`Welcome ${userName} to ${appName}!`);
}

// Login Button
function showLoginMessage() {
    alert("Login feature coming soon...");
}

// Signup Button
function showSignupMessage() {
    alert("Signup feature coming soon...");
}

// ==========================
// Render Goals
// ==========================

function renderGoals() {

    goalList.innerHTML = "";

    // --------------------------
    // Empty State - No Goals
    // --------------------------

    if (goals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Goals Available</h3>
                <p>Create your first goal to get started!</p>
            </div>
        `;

        return;
    }

    // --------------------------
    // Search, Filter & Sort
    // --------------------------

    const filteredGoals = applySearchFilterAndSort();

    // --------------------------
    // No Matching Results
    // --------------------------

    if (filteredGoals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Matching Goals</h3>
                <p>Try changing your search or filter.</p>
            </div>
        `;

        showNotification("ℹ No matching goals found.", "info");

        return;
    }

    // --------------------------
    // Display Goals
    // --------------------------

    filteredGoals.forEach(function (goal) {

        const originalIndex = goals.indexOf(goal);

        const goalCard = document.createElement("div");

        goalCard.className = "goal-item";

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>

            <p><strong>Deadline:</strong> ${goal.deadline}</p>

            <p>
                <strong>Priority:</strong>
                <span class="priority-badge ${goal.priority.toLowerCase()}">
                    ${goal.priority}
                </span>
            </p>

            <p><strong>Progress:</strong> ${goal.progress}%</p>

            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width: ${goal.progress}%;">
                </div>
            </div>

            <p>
                <strong>Status:</strong>
                ${goal.completed ? "Completed ✅" : "In Progress ⏳"}
            </p>

            <button
                class="edit-btn"
                onclick="editGoal(${originalIndex})">
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteGoal(${originalIndex})">
                Delete
            </button>
        `;

        goalList.appendChild(goalCard);

    });

}

// ==========================
// Search, Filter & Sort Goals
// ==========================

function applySearchFilterAndSort() {

    const searchText = searchInput.value.toLowerCase();
    const selectedPriority = priorityFilter.value;
    const selectedSort = sortOption.value;

    // Create a copy of the original array
    let filteredGoals = [...goals];

    // --------------------------
    // Search
    // --------------------------
    filteredGoals = filteredGoals.filter(function(goal) {
        return goal.title.toLowerCase().includes(searchText);
    });

    // --------------------------
    // Filter
    // --------------------------
    if (selectedPriority !== "All") {

        filteredGoals = filteredGoals.filter(function(goal) {
            return goal.priority === selectedPriority;
        });

    }

    // --------------------------
    // Sort
    // --------------------------
    switch (selectedSort) {

        case "titleAZ":
            filteredGoals.sort(function(a, b) {
                return a.title.localeCompare(b.title);
            });
            break;

        case "titleZA":
            filteredGoals.sort(function(a, b) {
                return b.title.localeCompare(a.title);
            });
            break;

        case "deadline":
            filteredGoals.sort(function(a, b) {
                return new Date(a.deadline) - new Date(b.deadline);
            });
            break;

        case "priority":

            const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            filteredGoals.sort(function(a, b) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            break;
    }

    return filteredGoals;

}
// ==========================
// Update Goal
// ==========================

function editGoal(index) {

    if (!goals[index]) {
    showNotification("❌ Goal not found.", "error");
    return;
    }

    // Edit Title
    const newTitle = prompt(
        "Enter new goal title:",
        goals[index].title
    );

    if (newTitle === null) {
        return;
    }

    if (newTitle.trim() === "") {
        showNotification("❌ Goal title cannot be empty.", "error");
        return;
    }

    // Edit Progress
    const newProgress = prompt(
        "Enter progress (0 - 100):",
        goals[index].progress
    );

    if (newProgress === null) {
        return;
    }

    const progress = Number(newProgress);

    if (isNaN(progress) || progress < 0 || progress > 100) {
        showNotification("❌ Progress must be between 0 and 100.", "error");
        return;
    }

    // Update Goal
    goals[index].title = newTitle.trim();
    goals[index].progress = progress;
    goals[index].completed = (progress === 100);

    // Save & Refresh
    saveGoals();
    renderGoals();
    updateDashboard();

    showNotification("✅ Goal updated successfully.", "success");

}

// ==========================
// Delete Goal
// ==========================

function deleteGoal(index) {

    if (!goals[index]) {
    showNotification("❌ Goal not found.", "error");
    return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this goal?"
    );

    if (!confirmDelete) {
        return;
    }

    goals.splice(index, 1);

    saveGoals();

    renderGoals();

    updateDashboard();

    showNotification("✅ Goal deleted successfully.", "success");

}


// ==========================
// Create Goal with Validation
// ==========================

function createGoal(event) {
    
    const submitButton = goalForm.querySelector("button[type='submit']");
submitButton.disabled = true;

    event.preventDefault();

    const title = document.getElementById("goalTitle").value.trim();
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;
    const progress = Number(document.getElementById("progress").value);

    // --------------------------
    // Goal Title Validation
    // --------------------------

    if (title === "") {
        showNotification("❌ Goal title cannot be empty.", "error");
        return;
    }

    if (title.length < 3) {
        showNotification("❌ Goal title must contain at least 3 characters.", "error");
        return;
    }

    submitButton.disabled = false;

    // --------------------------
    // Priority Validation
    // --------------------------

    const validPriorities = ["High", "Medium", "Low"];

    if (!validPriorities.includes(priority)) {
        showNotification("❌ Please select a valid priority.", "error");
        return;
    }

    submitButton.disabled = false;

    // --------------------------
    // Deadline Validation
    // --------------------------

    if (deadline === "") {
        showNotification("❌ Please select a deadline.", "error");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(deadline);

    if (selectedDate < today) {
        showNotification("❌ Deadline cannot be earlier than today.", "error");
        return;
    }

    submitButton.disabled = false;

    // --------------------------
    // Progress Validation
    // --------------------------

    if (isNaN(progress) || progress < 0 || progress > 100) {
        showNotification("❌ Progress must be between 0 and 100.", "error");
        return;
    }

    submitButton.disabled = false;

    // --------------------------
    // Create Goal Object
    // --------------------------

    const newGoal = {

        id: Date.now(),

        title: title,

        deadline: deadline,

        priority: priority,

        progress: progress,

        completed: progress === 100

    };

    // --------------------------
    // Save Goal
    // --------------------------

    goals.push(newGoal);

    saveGoals();

    submitButton.disabled = false;

    renderGoals();

    updateDashboard();

    goalForm.reset();

    document.getElementById("progress").value = 0;

    showNotification("✅ Goal created successfully.", "success");

}


// ==========================
// Save Goals to Local Storage
// ==========================

function saveGoals() {

    localStorage.setItem(
        "decisionJournalGoals",
        JSON.stringify(goals)
    );

}

// ==========================
// Load Goals from Local Storage
// ==========================

function loadGoals() {

    try {

        const savedGoals = localStorage.getItem("decisionJournalGoals");

        if (savedGoals) {

            goals = JSON.parse(savedGoals);

            if (!Array.isArray(goals)) {
                throw new Error("Invalid Local Storage data.");
            }

        } else {

            goals = [];

        }

    } catch (error) {

        goals = [];

        localStorage.removeItem("decisionJournalGoals");

        showNotification(
            "⚠ Invalid saved data found. Starting with an empty goal list.",
            "warning"
        );

    }

}

// ==========================
// Update Dashboard
// ==========================

function updateDashboard() {

    const totalGoals = goals.length;

    const completedGoals = goals.filter(function(goal) {
        return goal.completed;
    }).length;

    const pendingGoals = goals.filter(function(goal) {
        return !goal.completed;
    }).length;

    const highPriorityGoals = goals.filter(function(goal) {
        return goal.priority === "High";
    }).length;

    totalGoalsElement.textContent = totalGoals;
    completedGoalsElement.textContent = completedGoals;
    pendingGoalsElement.textContent = pendingGoals;
    highPriorityGoalsElement.textContent = highPriorityGoals;

}

// ==========================
// Show Notification
// ==========================

function showNotification(message, type) {

    notification.textContent = message;

    notification.className = "notification";

    notification.classList.add(type);

    setTimeout(function () {
        notification.classList.add("hidden");
    }, 3000);

}