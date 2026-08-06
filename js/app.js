
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


