
import {
    GOALS_STORAGE_KEY
} from "../utils/constants.js";

export function saveGoals(goals) {

    localStorage.setItem(
        GOALS_STORAGE_KEY,
        JSON.stringify(goals)
    );
}

export function loadGoals() {

    const savedGoals =
        localStorage.getItem(GOALS_STORAGE_KEY);

    if (!savedGoals) {
        return [];
    }

    try {

        const parsedGoals =
            JSON.parse(savedGoals);
            
        if (!Array.isArray(parsedGoals)) {

            return [];
        }

        return parsedGoals;

    } catch (error) {

        console.error(
            "Failed to load goals:",
            error
        );

        return [];
    }

}