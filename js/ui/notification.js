
export function showNotification(message, type) {
    const notification =
        document.getElementById("notification");
    notification.textContent =
        message;

    notification.className =
        "notification";
    notification.classList.add(type);

    setTimeout(function() {
        notification.classList.add("hidden");
    }, 3000);

}