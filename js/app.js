// ==========================================
// Decision Journal
// app.js - Application Entry Point
// ==========================================

import {
    COMPLETED_PROGRESS,
    MIN_PROGRESS
} from "./utils/constants.js";

import {
    validateGoal
} from "./validation/validateGoal.js";

import {
    saveGoals,
    loadGoals
} from "./storage/localStorage.js";

import {
    renderGoals
} from "./ui/render.js";

import {
    updateDashboard
} from "./ui/dashboard.js";

import {
    showNotification
} from "./ui/notifications.js";

import { generateId } from "./utils/helpers.js";

// ==========================================
// Application Variables
// ==========================================

const appName = "Decision Journal";
let userName = "Guest";

let goals = [];


// ==========================================
// DOM Elements
// ==========================================

let goalForm;
let searchInput;
let priorityFilter;
let sortOption;

let getStartedBtn;
let loginBtn;
let signupBtn;


// ==========================================
// Application Start
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Select DOM elements

    goalForm = document.getElementById("goalForm");

    searchInput = document.getElementById("searchInput");

    priorityFilter = document.getElementById("priorityFilter");

    sortOption = document.getElementById("sortOption");

    getStartedBtn =
        document.getElementById("getStartedBtn");

    loginBtn =
        document.getElementById("loginBtn");

    signupBtn =
        document.getElementById("signupBtn");


    // Register event listeners

    getStartedBtn.addEventListener(
        "click",
        showWelcomeMessage
    );

    loginBtn.addEventListener(
        "click",
        showLoginMessage
    );

    signupBtn.addEventListener(
        "click",
        showSignupMessage
    );

    searchInput.addEventListener(
        "input",
        renderGoals
    );

    priorityFilter.addEventListener(
        "change",
        renderGoals
    );

    sortOption.addEventListener(
        "change",
        renderGoals
    );

    goalForm.addEventListener(
        "submit",
        createGoal
    );


    // Load saved goals

    goals = loadGoals();


    // Initial UI

    renderGoals(goals);

    updateDashboard(goals);

});


// ==========================================
// Welcome Button
// ==========================================

function showWelcomeMessage() {

    alert(
        `Welcome ${userName} to ${appName}!`
    );

}


// ==========================================
// Login Button
// ==========================================

function showLoginMessage() {

    alert("Login feature coming soon...");

}


// ==========================================
// Signup Button
// ==========================================

function showSignupMessage() {

    alert("Signup feature coming soon...");

}


// ==========================================
// Create Goal
// ==========================================

function createGoal(event) {

    event.preventDefault();


    // Prevent duplicate submission

    const submitButton =
        goalForm.querySelector(
            "button[type='submit']"
        );

    if (submitButton.disabled) {
        return;
    }

    submitButton.disabled = true;


    // Read input

    const title =
        document.getElementById("goalTitle")
            .value
            .trim();

    const deadline =
        document.getElementById("deadline")
            .value;

    const priority =
        document.getElementById("priority")
            .value;

    const progress =
        Number(
            document.getElementById("progress")
                .value
        );


    // Validate

    const validation = validateGoal(
        title,
        priority,
        deadline,
        progress
    );


    if (!validation.valid) {

        showNotification(
            validation.message,
            "error"
        );

        submitButton.disabled = false;

        return;
    }


    // Create goal

    const newGoal = {

        id: generateId(),

        title: title,

        deadline: deadline,

        priority: priority,

        progress: progress,

        completed:
            progress === COMPLETED_PROGRESS

    };


    // Update data

    goals.push(newGoal);


    // Save

    saveGoals(goals);


    // Update UI

    renderGoals(goals);

    updateDashboard(goals);


    // Reset form

    goalForm.reset();

    document.getElementById("progress").value =
        MIN_PROGRESS;


    // Notification

    showNotification(
        "✅ Goal created successfully.",
        "success"
    );


    // Enable button

    submitButton.disabled = false;

}


// ==========================================
// Edit Goal
// ==========================================

function editGoal(index) {

    if (!goals[index]) {

        showNotification(
            "❌ Goal not found.",
            "error"
        );

        return;
    }


    // Edit title

    const newTitle = prompt(
        "Enter new goal title:",
        goals[index].title
    );


    if (newTitle === null) {
        return;
    }


    if (newTitle.trim() === "") {

        showNotification(
            "❌ Goal title cannot be empty.",
            "error"
        );

        return;
    }


    // Edit progress

    const newProgress = prompt(
        "Enter progress (0 - 100):",
        goals[index].progress
    );


    if (newProgress === null) {
        return;
    }


    const progress = Number(newProgress);


    if (
        isNaN(progress) ||
        progress < MIN_PROGRESS ||
        progress > COMPLETED_PROGRESS
    ) {

        showNotification(
            "❌ Progress must be between 0 and 100.",
            "error"
        );

        return;
    }


    // Update goal

    goals[index].title =
        newTitle.trim();

    goals[index].progress =
        progress;

    goals[index].completed =
        progress === COMPLETED_PROGRESS;


    // Save

    saveGoals(goals);


    // Refresh UI

    renderGoals(goals);

    updateDashboard(goals);


    // Notification

    showNotification(
        "✅ Goal updated successfully.",
        "success"
    );

}


// ==========================================
// Delete Goal
// ==========================================

function deleteGoal(index) {

    if (!goals[index]) {

        showNotification(
            "❌ Goal not found.",
            "error"
        );

        return;
    }


    const confirmDelete = confirm(
        "Are you sure you want to delete this goal?"
    );


    if (!confirmDelete) {
        return;
    }


    // Delete

    goals.splice(index, 1);


    // Save

    saveGoals(goals);


    // Refresh UI

    renderGoals(goals);

    updateDashboard(goals);


    // Notification

    showNotification(
        "✅ Goal deleted successfully.",
        "success"
    );

}