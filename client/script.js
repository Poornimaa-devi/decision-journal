// ==========================================
// Decision Journal
// Day 10 - Arrays and Objects
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
    totalGoals: 3
};

// ==========================
// Goals Array
// ==========================

const goals = [
    {
        title: "Learn MERN Stack",
        deadline: "2026-10-01",
        progress: 20,
        completed: false
    },
    {
        title: "Solve 100 DSA Problems",
        deadline: "2026-09-15",
        progress: 45,
        completed: false
    },
    {
        title: "Build Decision Journal",
        deadline: "2026-11-01",
        progress: 10,
        completed: false
    }
];

// ==========================
// Console Output
// ==========================

console.log("===== Decision Journal =====");

console.log("Application Name:", appName);

console.log("User Details:");
console.log(user);

console.log("---------------------------");

console.log("Total Goals:", goals.length);

console.log("---------------------------");

console.log("Goal Titles:");

goals.forEach(function (goal, index) {
    console.log((index + 1) + ". " + goal.title);
});

console.log("---------------------------");

console.log("Complete Goal Details:");

console.log(goals);

// ==========================
// Functions
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