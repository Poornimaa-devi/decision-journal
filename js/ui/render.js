function renderGoals() {

    goalList.innerHTML = "";

    // --------------------------
    // Empty State - No Goals
    // --------------------------

    if (goals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Goals Available</h3>
                <p>Create your first goal to get started!</p>
            </div>
        `;

        return;
    }
    
    // --------------------------
    // Search, Filter & Sort
    // --------------------------

    const filteredGoals = applySearchFilterAndSort();

    // --------------------------
    // No Matching Results
    // --------------------------

    if (filteredGoals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Matching Goals</h3>
                <p>Try changing your search or filter.</p>
            </div>
        `;

        showNotification("ℹ No matching goals found.", "info");

        return;
    }

    // --------------------------
    // Display Goals
    // --------------------------

    filteredGoals.forEach(function (goal) {

        const originalIndex = goals.indexOf(goal);

        const goalCard = document.createElement("div");

        goalCard.className = "goal-item";

        goalCard.innerHTML = `
            <h3>${goal.title}</h3>

            <p><strong>Deadline:</strong> ${goal.deadline}</p>

            <p>
                <strong>Priority:</strong>
                <span class="priority-badge ${goal.priority.toLowerCase()}">
                    ${goal.priority}
                </span>
            </p>

            <p><strong>Progress:</strong> ${goal.progress}%</p>

            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width: ${goal.progress}%;">
                </div>
            </div>

            <p>
                <strong>Status:</strong>
                ${goal.completed ? "Completed ✅" : "In Progress ⏳"}
            </p>

            <button
                class="edit-btn"
                onclick="editGoal(${originalIndex})">
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteGoal(${originalIndex})">
                Delete
            </button>
        `;

        goalList.appendChild(goalCard);

    });

}

function applySearchFilterAndSort() {

    const searchText = searchInput.value.toLowerCase();
    const selectedPriority = priorityFilter.value;
    const selectedSort = sortOption.value;

    // Create a copy of the original array
    let filteredGoals = [...goals];

    // --------------------------
    // Search
    // --------------------------
    filteredGoals = filteredGoals.filter(function(goal) {
        return goal.title.toLowerCase().includes(searchText);
    });

    // --------------------------
    // Filter
    // --------------------------
    if (selectedPriority !== "All") {

        filteredGoals = filteredGoals.filter(function(goal) {
            return goal.priority === selectedPriority;
        });

    }

    // --------------------------
    // Sort
    // --------------------------
    switch (selectedSort) {

        case "titleAZ":
            filteredGoals.sort(function(a, b) {
                return a.title.localeCompare(b.title);
            });
            break;

        case "titleZA":
            filteredGoals.sort(function(a, b) {
                return b.title.localeCompare(a.title);
            });
            break;

        case "deadline":
            filteredGoals.sort(function(a, b) {
                return new Date(a.deadline) - new Date(b.deadline);
            });
            break;

        case "priority":

            const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            filteredGoals.sort(function(a, b) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            break;
    }
     return filteredGoals;

}