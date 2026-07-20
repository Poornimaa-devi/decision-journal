// ==========================================
// Decision Journal
// Day 17 - Local Storage & Complete CRUD
// ==========================================

// ==========================
// 1. Variables
// ==========================

const appName = "Decision Journal";
let userName = "Guest";

// ==========================
// 2. Goals Array
// ==========================

let goals = [];

// ==========================
// 3. DOM Element Selection
// ==========================

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

    getStartedBtn = document.getElementById("getStartedBtn");
    loginBtn = document.getElementById("loginBtn");
    signupBtn = document.getElementById("signupBtn");

    // Register Event Listeners
    getStartedBtn.addEventListener("click", showWelcomeMessage);
    loginBtn.addEventListener("click", showLoginMessage);
    signupBtn.addEventListener("click", showSignupMessage);

    goalForm.addEventListener("submit", createGoal);

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

    goals.forEach(function (goal, index) {

        const goalCard = document.createElement("div");

        goalCard.className = "goal-item";

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>

            <p><strong>Deadline:</strong> ${goal.deadline}</p>

            <p><strong>Priority:</strong> ${goal.priority}</p>

            <p><strong>Status:</strong>
                ${goal.completed ? "Completed ✅" : "In Progress ⏳"}
            </p>

            <button class="edit-btn" onclick="editGoal(${index})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteGoal(${index})">
                Delete
            </button>
        `;

        goalList.appendChild(goalCard);

    });

}

// ==========================
// Create Goal
// ==========================

function createGoal(event) {

    event.preventDefault();

    const title = document.getElementById("goalTitle").value.trim();
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    if (title === "") {
        alert("Please enter a goal title.");
        return;
    }

    const newGoal = {

        id: Date.now(),

        title: title,

        deadline: deadline,

        priority: priority,

        completed: false

    };

    goals.push(newGoal);

    saveGoals();

    renderGoals();

    goalForm.reset();

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