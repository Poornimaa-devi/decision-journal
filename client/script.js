// ==========================================
// Decision Journal
// Day 13 - Rendering & UI
// ==========================================

const appName = "Decision Journal";
let userName = "Guest";

// ==========================
// Goals Array (Source of Truth)
// ==========================

const goals = [];

// ==========================
// Welcome Messages
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

// ==========================
// Render Goals
// ==========================

function renderGoals() {

    const goalList = document.getElementById("goalList");

    // Clear old UI
    goalList.innerHTML = "";

    // Generate UI from data
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
        title,
        deadline,
        priority,
        completed: false
    };

    // Update data
    goals.push(newGoal);

    console.log(goals);

    // Re-render UI
    renderGoals();

    // Clear form
    document.getElementById("goalForm").reset();

}

// ==========================
// Event Listeners
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("getStartedBtn")
        .addEventListener("click", showWelcomeMessage);

    document
        .getElementById("loginBtn")
        .addEventListener("click", showLoginMessage);

    document
        .getElementById("signupBtn")
        .addEventListener("click", showSignupMessage);

    document
        .getElementById("goalForm")
        .addEventListener("submit", createGoal);

    // Initial render
    renderGoals();

});