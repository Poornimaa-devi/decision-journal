// ==========================================
// Decision Journal
// Day 11 - DOM Manipulation
// ==========================================

// ==========================
// Variables
// ==========================

const appName = "Decision Journal";
let userName = "Guest";

// ==========================
// User Object
// ==========================

const user = {
    name: "Demo User",
    email: "demo@example.com",
    joinedOn: "2026-08-08",
    totalGoals: 4
};

// ==========================
// Goals Array
// ==========================

const goals = [
    {
        title: "Learn MERN Stack",
        progress: 20,
        completed: false
    },
    {
        title: "Solve 100 DSA Problems",
        progress: 45,
        completed: false
    },
    {
        title: "Build Decision Journal",
        progress: 10,
        completed: false
    },
    {
        title: "Complete AWS Certification",
        progress: 60,
        completed: false
    }
];

// ==========================
// Console Output
// ==========================

console.log("Application Name:", appName);
console.log("User:", user);
console.log("Goals:", goals);

// ==========================
// Functions
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

// Display goals on webpage
function displayGoals() {

    const goalList = document.getElementById("goalList");

    goals.forEach(function(goal) {

        const goalItem = document.createElement("div");

        goalItem.className = "goal-item";

        goalItem.textContent = goal.title;

        goalList.appendChild(goalItem);

    });

}

// ==========================
// Event Listeners
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    const getStartedBtn = document.getElementById("getStartedBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", showWelcomeMessage);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", showLoginMessage);
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", showSignupMessage);
    }

    displayGoals();

});