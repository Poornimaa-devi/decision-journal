export function renderGoals(
    goals,
    searchInput,
    priorityFilter,
    sortOption,
    onEdit,
    onDelete
) {

    const goalList =
        document.getElementById("goalList");
    goalList.innerHTML = "";

    if (goals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Goals Available</h3>
                <p>Create your first goal to get started!</p>
            </div>
        `;

        return;
    }
    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedPriority =
        priorityFilter.value;

    const selectedSort =
        sortOption.value;

    let filteredGoals =
        [...goals];

    filteredGoals =
        filteredGoals.filter(function(goal) {

            return goal.title
                .toLowerCase()
                .includes(searchText);

        });

    if (selectedPriority !== "All") {

        filteredGoals =
            filteredGoals.filter(function(goal) {
                return goal.priority === selectedPriority;
            });
    }

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
                return new Date(a.deadline) -
                       new Date(b.deadline);

            });

            break;
        case "priority":
            const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            filteredGoals.sort(function(a, b) {

                return priorityOrder[a.priority] -
                       priorityOrder[b.priority];
            });

            break;
    }

    if (filteredGoals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-state">
                <h3>No Matching Goals</h3>
                <p>Try changing your search or filter.</p>
            </div>
        `;

        return;
    }

    filteredGoals.forEach(function(goal) {

        const originalIndex =
            goals.indexOf(goal);


        const goalCard =
            document.createElement("div");


        goalCard.className =
            "goal-item";


        goalCard.innerHTML = `
            <h3>${goal.title}</h3>

            <p>
                <strong>Deadline:</strong>
                ${goal.deadline}
            </p>

            <p>
                <strong>Priority:</strong>
                <span class="priority-badge ${goal.priority.toLowerCase()}">
                    ${goal.priority}
                </span>
            </p>

            <p>
                <strong>Progress:</strong>
                ${goal.progress}%
            </p>

            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width: ${goal.progress}%;">
                </div>
            </div>

            <p>
                <strong>Status:</strong>
                ${
                    goal.completed
                    ? "Completed ✅"
                    : "In Progress ⏳"
                }
            </p>

            <button
                class="edit-btn"
                data-index="${originalIndex}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-index="${originalIndex}">
                Delete
            </button>
        `;


        goalCard
            .querySelector(".edit-btn")
            .addEventListener("click", function() {

                onEdit(originalIndex);

            });


        goalCard
            .querySelector(".delete-btn")
            .addEventListener("click", function() {

                onDelete(originalIndex);

            });


        goalList.appendChild(goalCard);

    });

}