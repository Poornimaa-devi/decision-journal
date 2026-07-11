// ==========================================
// Decision Journal
// Day 12 - Forms & Validation
// ==========================================

const appName = "Decision Journal";
let userName = "Guest";

const goals = [];

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

function displayGoals() {

    const goalList = document.getElementById("goalList");

    goalList.innerHTML = "";

    goals.forEach(function(goal){

        const goalItem = document.createElement("div");

        goalItem.className = "goal-item";

        goalItem.innerHTML = `
            <h3>${goal.title}</h3>
            <p>Deadline: ${goal.deadline}</p>
            <p>Priority: ${goal.priority}</p>
        `;

        goalList.appendChild(goalItem);

    });

}

function createGoal(event){

    event.preventDefault();

    const title = document.getElementById("goalTitle").value;

    const deadline = document.getElementById("deadline").value;

    const priority = document.getElementById("priority").value;

    const goal = {

        title,

        deadline,

        priority,

        completed:false

    };

    goals.push(goal);

    console.log(goals);

    displayGoals();

    document.getElementById("goalForm").reset();

}

// ==========================
// Event Listeners
// ==========================

document.addEventListener("DOMContentLoaded",function(){

    document
        .getElementById("getStartedBtn")
        .addEventListener("click",showWelcomeMessage);

    document
        .getElementById("loginBtn")
        .addEventListener("click",showLoginMessage);

    document
        .getElementById("signupBtn")
        .addEventListener("click",showSignupMessage);

    document
        .getElementById("goalForm")
        .addEventListener("submit",createGoal);

});