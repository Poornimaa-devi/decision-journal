function updateDashboard() {

    const totalGoals = goals.length;

    const completedGoals = goals.filter(function(goal) {
        return goal.completed;
    }).length;

    const pendingGoals = goals.filter(function(goal) {
        return !goal.completed;
    }).length;

    const highPriorityGoals = goals.filter(function(goal) {
        return goal.priority === "High";
    }).length;

    totalGoalsElement.textContent = totalGoals;
    completedGoalsElement.textContent = completedGoals;
    pendingGoalsElement.textContent = pendingGoals;
    highPriorityGoalsElement.textContent = highPriorityGoals;

}