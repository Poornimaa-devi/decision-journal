
const appName = "Decision Journal";
let userName = "Guest";

const user = {
    name: "Demo User",
    email: "demo@example.com",
    joinedOn: "2026-08-08",
    totalGoals: 1
};

const goal = {
    title: "Learn MERN Stack",
    deadline: "2026-10-01",
    progress: 20,
    completed: false
};

console.log("===== Decision Journal =====");

console.log("Application Name:");
console.log(appName);

console.log("----------------------------");

console.log("User Details:");
console.log(user);

console.log("----------------------------");

console.log("Goal Details:");
console.log(goal);

console.log("----------------------------");

function welcomeUser() {
    alert("Welcome to " + appName + "!");
}

// Login Button
function loginMessage() {
    alert("Login feature coming soon...");
}

// Signup Button
function signupMessage() {
    alert("Signup feature coming soon...");
}

document.addEventListener("DOMContentLoaded", () => {

    const getStartedBtn = document.getElementById("getStartedBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", welcomeUser);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", loginMessage);
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", signupMessage);
    }

});