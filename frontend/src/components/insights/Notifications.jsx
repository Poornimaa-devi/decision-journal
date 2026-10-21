import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { useFetch } from "../../hook/useFetch";
import { getNotifications } from "../../api/notifications";

function Notifications({ days }) {
  const { data, error, isLoading, reload } = useFetch(() => getNotifications(days), [days]);

  if (isLoading && !data) return <Loading label="Loading notifications..." />;
  if (error && !data) return <ErrorMessage error={error} onRetry={reload} />;

  const notifications = data.notifications;

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