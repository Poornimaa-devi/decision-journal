function loadGoals() {

    try {

        const savedGoals = localStorage.getItem("decisionJournalGoals");

        if (savedGoals) {

            goals = JSON.parse(savedGoals);

            if (!Array.isArray(goals)) {
                throw new Error("Invalid Local Storage data.");
            }

        } else {

            goals = [];

        }

    } catch (error) {

        goals = [];

        localStorage.removeItem("decisionJournalGoals");

        showNotification(
            "⚠ Invalid saved data found. Starting with an empty goal list.",
            "warning"
        );

    }

}

function saveGoals() {

    localStorage.setItem(
        "decisionJournalGoals",
        JSON.stringify(goals)
    );

}





