// ==========================
// Decision Journal
// Day 6 - JavaScript Basics
// ==========================

// Variables
const appName = "Decision Journal";
let userName = "Guest";

// Function for Get Started button
function welcomeUser() {
    alert("Welcome to " + appName + "!");
}

// Function for Login button
function loginMessage() {
    alert("Login feature coming soon...");
}

// Function for Signup button
function signupMessage() {
    alert("Signup feature coming soon...");
}

// Event Listeners

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