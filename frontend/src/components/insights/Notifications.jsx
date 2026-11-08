
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { useFetch } from "../../hook/useFetch";
import { getNotifications } from "../../api/notifications";

function Notifications({ days }) {
  const {
    data,
    error,
    isLoading,
    reload,
  } = useFetch(() => getNotifications(days), [days]);

  if (isLoading && !data) {
    return <Loading label="Loading notifications..." />;
  }

  if (error && !data) {
    return <ErrorMessage error={error} onRetry={reload} />;
  }

  if (!data) return null;

  const notifications = data.notifications ?? [];

  return (
    <section className="notifications-panel">
      <div className="notifications-heading">
        <div className="notifications-heading-icon">♧</div>

        <div>
          <span className="section-eyebrow">STAY ON TRACK</span>
          <h2>Your notifications</h2>
          <p>Reminders to help you stay connected with your goals.</p>
        </div>

        <span className="notification-count">
          {notifications.length}
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="notifications-empty">
          <div className="notifications-empty-icon">✓</div>
          <h3>You're all caught up!</h3>
          <p>No notifications to show right now. Keep making progress.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <article
              className="notification-item"
              key={`${notification.type}-${notification.itemId}`}
            >
              <div className="notification-item-icon">•</div>
              <p>{notification.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Notifications;
