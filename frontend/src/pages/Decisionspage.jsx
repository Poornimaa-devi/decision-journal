import { Link } from "react-router-dom";
import DecisionForm from "../components/decisions/DecisionForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { usePageTitle } from "../hook/usePageTitle";
import { getDecisions, createDecision } from "../api/decisions";

function DecisionsPage() {
  usePageTitle("Decisions");

  const { data: decisions, setData, error, isLoading, reload } = useFetch(getDecisions, []);

  // A failure here throws up to DecisionForm, which shows it next to the form.
  async function handleAddDecision(newDecision) {
    const saved = await createDecision(newDecision);
    setData((prev) => [...(prev ?? []), saved]);
  }

  return (
    <div>
      <h2>Decisions</h2>
      <DecisionForm onAddDecision={handleAddDecision} />

      {isLoading && !decisions ? (
        <Loading label="Loading decisions..." />
      ) : error && !decisions ? (
        <ErrorMessage error={error} onRetry={reload} />
      ) : (decisions ?? []).length === 0 ? (
        <div className="empty-state">
          <h3>No decisions recorded yet</h3>
          <p>Write down a decision and why you made it. You can link goals to it later.</p>
        </div>
      ) : (
        <ul className="decision-list">
          {decisions.map((d) => (
            <li key={d._id}>
              <Link to={`/decisions/${d._id}`}>{d.title}</Link>
              <span className="badge" data-tone={d.status}>
                {d.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DecisionsPage;
