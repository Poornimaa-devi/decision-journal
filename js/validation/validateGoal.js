// ==========================================
// validateGoal.js
// ==========================================

import {
    VALID_PRIORITIES,
    MIN_GOAL_TITLE_LENGTH,
    MAX_GOAL_TITLE_LENGTH,
    MIN_PROGRESS,
    MAX_PROGRESS
} from "../utils/constants.js";


export function validateGoal(
    title,
    priority,
    deadline,
    progress
) {

    // Goal Title
    if (title === "") {

        return {
            valid: false,
            message: "❌ Goal title cannot be empty."
        };
    }


    if (title.length < MIN_GOAL_TITLE_LENGTH) {

        return {
            valid: false,
            message:
                `❌ Goal title must contain at least ${MIN_GOAL_TITLE_LENGTH} characters.`
        };
    }


    if (title.length > MAX_GOAL_TITLE_LENGTH) {

        return {
            valid: false,
            message:
                `❌ Goal title cannot exceed ${MAX_GOAL_TITLE_LENGTH} characters.`
        };
    }


    // Priority
    if (!VALID_PRIORITIES.includes(priority)) {

        return {
            valid: false,
            message: "❌ Please select a valid priority."
        };
    }


    // Deadline
    if (deadline === "") {

        return {
            valid: false,
            message: "❌ Please select a deadline."
        };
    }


    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(deadline);


    if (selectedDate < today) {

        return {
            valid: false,
            message:
                "❌ Deadline cannot be earlier than today."
        };
    }


    // Progress
    if (
        isNaN(progress) ||
        progress < MIN_PROGRESS ||
        progress > MAX_PROGRESS
    ) {

        return {
            valid: false,
            message:
                `❌ Progress must be between ${MIN_PROGRESS} and ${MAX_PROGRESS}.`
        };
    }


    return {
        valid: true,
        message: ""
    };
}