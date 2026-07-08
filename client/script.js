// ==========================================
// Decision Journal
// Day 9 - Functions & Code Organization
// ==========================================

// ==========================
// Variables
// ==========================

const appName = "Decision Journal";
let userName = "Guest";

// ==========================
// Objects
// ==========================

// User Object
const user = {
    name: "Demo User",
    email: "demo@example.com",
    joinedOn: "2026-08-08",
    totalGoals: 1
};

// Goal Object
const goal = {
    title: "Learn MERN Stack",
    deadline: "2026-10-01",
    progress: 20,
    completed: false
};

// ==========================
// Console Output
// ==========================

console.log("===== Decision Journal =====");

console.log("Application Name:", appName);

console.log("User Details:", user);

console.log("Goal Details:", goal);

// ==========================
// Functions
// ==========================

// Displays a welcome message
function showWelcomeMessage() {
    alert(`Welcome ${userName} to ${appName}!`);
}

// Displays a login message
function showLoginMessage() {
    alert("Login feature coming soon...");
}

// Displays a signup message
function showSignupMessage() {
    alert("Signup feature coming soon...");
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

});