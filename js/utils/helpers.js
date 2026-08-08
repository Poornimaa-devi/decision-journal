export function generateId() {
    return Date.now();
}


// Calculate percentage
export function calculatePercentage(completed, total) {

    if (total === 0) {
        return 0;
    }

    return Math.round((completed / total) * 100);
}


// Find a goal by ID
export function findGoalById(goals, id) {

    return goals.find(function (goal) {
        return goal.id === id;
    });

}