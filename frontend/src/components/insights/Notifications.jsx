import { useState, useEffect } from "react";
import { getNotifications } from "../../api/notifications";   // in insights/, use "../../api/notifications"

function Notifications({ days }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications(days);
        setNotifications(data.notifications);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadNotifications();
  }, [days]);

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Could not load notifications: {error}</p>;

  return (
    <div className="notifications">
      <h2>Notifications ({notifications.length})</h2>
      {notifications.length === 0 ? (
        <p>You're all caught up!</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={`${n.type}-${n.itemId}`}>{n.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;