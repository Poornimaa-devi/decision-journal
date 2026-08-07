
import {
    HIGH_PRIORITY
} from "../utils/constants.js";

export function updateDashboard(goals) {

    const totalGoalsElement =
        document.getElementById("totalGoals");

    const completedGoalsElement =
        document.getElementById("completedGoals");

    const pendingGoalsElement =
        document.getElementById("pendingGoals");

    const highPriorityGoalsElement =
        document.getElementById("highPriorityGoals");


    const totalGoals =
        goals.length;

    const completedGoals =
        goals.filter(function(goal) {
            return goal.completed;
        }).length;

    const pendingGoals =
        goals.filter(function(goal) {
            return !goal.completed;
        }).length;


    const highPriorityGoals =
        goals.filter(function(goal) {
            return goal.priority === HIGH_PRIORITY;
        }).length;


    totalGoalsElement.textContent =
        totalGoals;

    completedGoalsElement.textContent =
        completedGoals;

    pendingGoalsElement.textContent =
        pendingGoals;

    highPriorityGoalsElement.textContent =
        highPriorityGoals;
}