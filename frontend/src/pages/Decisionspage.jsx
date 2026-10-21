import { useState } from "react";
import { Link } from "react-router-dom";
import DecisionForm from "../components/decisions/DecisionForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { getDecisions, createDecision } from "../api/decisions";

function DecisionsPage() {
  const { data: decisions, setData, error, isLoading, reload } = useFetch(getDecisions, []);
  const [actionError, setActionError] = useState(null);

  async function handleAddDecision(newDecision) {
    setActionError(null);
    try {
      const saved = await createDecision(newDecision);
      setData((prev) => [...(prev ?? []), saved]);
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <div>
      <h2>Decisions</h2>
      <DecisionForm onAddDecision={handleAddDecision} />
      {actionError && <ErrorMessage error={actionError} />}

      {isLoading && !decisions ? (
        <Loading label="Loading decisions..." />
      ) : error && !decisions ? (
        <ErrorMessage error={error} onRetry={reload} />
      ) : decisions.length === 0 ? (
        <p>No decisions recorded yet.</p>
      ) : (
        <ul>
          {decisions.map((d) => (
            <li key={d._id}>
              <Link to={`/decisions/${d._id}`}>{d.title}</Link> ({d.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DecisionsPage;