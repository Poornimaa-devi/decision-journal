
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

    // Load Saved Goals
    loadGoals();

    // Initial Render
    renderGoals();

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

    const filteredGoals = applySearchFilterAndSort();

    filteredGoals.forEach(function(goal){

        const originalIndex = goals.indexOf(goal);

        const goalCard = document.createElement("div");

        goalCard.className = "goal-item";

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>

            <p><strong>Deadline:</strong> ${goal.deadline}</p>

            <p><strong>Priority:</strong> ${goal.priority}</p>

            <p><strong>Status:</strong>
                ${goal.completed ? "Completed ✅" : "In Progress ⏳"}
            </p>

            <button class="edit-btn"
                onclick="editGoal(${originalIndex})">
                Edit
            </button>

            <button class="delete-btn"
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

    const newTitle = prompt(
        "Enter new goal title:",
        goals[index].title
    );

    if (newTitle === null) {
        return;
    }

    if (newTitle.trim() === "") {
        alert("Goal title cannot be empty.");
        return;
    }

    goals[index].title = newTitle.trim();

    saveGoals();

    renderGoals();

}

// ==========================
// Delete Goal
// ==========================

function deleteGoal(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this goal?"
    );

    if (!confirmDelete) {
        return;
    }

    goals.splice(index, 1);

    saveGoals();

    renderGoals();

}


// ==========================
// Create Goal
// ==========================

function createGoal(event) {

    // Prevent page refresh
    event.preventDefault();

    // Read input values
    const title = document.getElementById("goalTitle").value.trim();
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    // Validation
    if (title === "") {
        alert("Please enter a goal title.");
        return;
    }

    // Create Goal Object
    const newGoal = {
        title: title,
        deadline: deadline,
        priority: priority,
        completed: false
    };

    // Add goal to array
    goals.push(newGoal);

    // Save to Local Storage
    saveGoals();

    // Refresh UI
    renderGoals();

    // Clear form
    goalForm.reset();
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

    const savedGoals = localStorage.getItem("decisionJournalGoals");

    if (savedGoals) {

        goals = JSON.parse(savedGoals);

    } else {

        goals = [];

    }

}