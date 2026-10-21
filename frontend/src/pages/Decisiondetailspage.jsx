import { Link, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { getDecisionById } from "../api/decisions";

function DecisionDetailPage() {
  const { id } = useParams();
  const { data: decision, error, isLoading, reload } = useFetch(
    () => getDecisionById(id),
    [id]
  );

  if (isLoading && !decision) return <Loading label="Loading decision..." />;

  if (error && !decision) {
    return (
      <div>
        <ErrorMessage error={error} onRetry={reload} />
        <Link to="/decisions">← Back to decisions</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/decisions">← Back to decisions</Link>
      <h2>{decision.title}</h2>
      <p><strong>Status:</strong> {decision.status}</p>
      <p><strong>Reasoning:</strong></p>
      <p>{decision.reasoning}</p>
    </div>
  );
}

export default DecisionDetailPage;