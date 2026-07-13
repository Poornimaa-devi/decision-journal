// ==========================================
// Decision Journal
// Day 14 - Week 2 Review & Refactoring
// ==========================================

// ==========================
// 1. Variables
// ==========================

const appName = "Decision Journal";
let userName = "Guest";

// ==========================
// 2. Goals Array
// ==========================

const goals = [];

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

    // ==========================
    // 6. Initial Render
    // ==========================

    renderGoals();

});

// ==========================
// 5. Functions
// ==========================

function showWelcomeMessage() {
    alert(`Welcome ${userName} to ${appName}!`);
}

function showLoginMessage() {
    alert("Login feature coming soon...");
}

function showSignupMessage() {
    alert("Signup feature coming soon...");
}

function renderGoals() {

    goalList.innerHTML = "";

    goals.forEach(function (goal) {

        const goalCard = document.createElement("div");

        goalCard.className = "goal-item";

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>
            <p><strong>Deadline:</strong> ${goal.deadline}</p>
            <p><strong>Priority:</strong> ${goal.priority}</p>
            <p><strong>Status:</strong> ${
                goal.completed ? "Completed ✅" : "In Progress ⏳"
            }</p>
        `;

        goalList.appendChild(goalCard);

    });

}

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
        title,
        deadline,
        priority,
        completed: false
    };

    goals.push(newGoal);

    renderGoals();

    goalForm.reset();

}