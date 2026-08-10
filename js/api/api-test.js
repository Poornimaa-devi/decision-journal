// ==========================================
// Day 34 - API Experiment
// ==========================================

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const todoList = document.getElementById("todoList");


// ==========================================
// Fetch Todos
// ==========================================

async function fetchTodos() {

    try {

        console.log("Sending request...");

        const response = await fetch(API_URL);

        console.log("Response received:", response);

        // Check HTTP status
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert response body into JSON
        const todos = await response.json();

        console.log("Todo data:", todos);

        displayTodos(todos);

    } catch (error) {

        console.error("API request failed:", error);

        todoList.innerHTML = `
            <p>Failed to load todos.</p>
        `;
    }
}


// ==========================================
// Display Todos
// ==========================================

function displayTodos(todos) {

    const firstFiveTodos = todos.slice(0, 5);

    firstFiveTodos.forEach(function (todo) {

        const todoElement = document.createElement("p");

        todoElement.textContent =
            `${todo.id}. ${todo.title}`;

        todoList.appendChild(todoElement);

    });

}

fetchTodos();