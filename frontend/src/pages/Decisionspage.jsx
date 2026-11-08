
import { Link } from "react-router-dom";
import DecisionForm from "../components/decisions/DecisionForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { usePageTitle } from "../hook/usePageTitle";
import { getDecisions, createDecision } from "../api/decisions";

function DecisionsPage() {
  usePageTitle("Decisions");

  const {
    data: decisions,
    setData,
    error,
    isLoading,
    reload,
  } = useFetch(getDecisions, []);

  async function handleAddDecision(newDecision) {
    const saved = await createDecision(newDecision);
    setData((prev) => [...(prev ?? []), saved]);
  }

  const total = decisions?.length ?? 0;
  const pending = (decisions ?? []).filter(
    (d) => d.status === "pending"
  ).length;
  const decided = (decisions ?? []).filter(
    (d) => d.status === "decided"
  ).length;
  const reviewing = (decisions ?? []).filter(
    (d) => d.status === "reviewing"
  ).length;

  return (
    <div className="decisions-page">
      <section className="decision-stats">
        <article className="decision-stat-card">
          <span className="decision-stat-icon purple">◇</span>
          <div>
            <p>TOTAL DECISIONS</p>
            <h3>{total}</h3>
          </div>
        </article>

        <article className="decision-stat-card">
          <span className="decision-stat-icon orange">◷</span>
          <div>
            <p>PENDING</p>
            <h3>{pending}</h3>
          </div>
        </article>

        <article className="decision-stat-card">
          <span className="decision-stat-icon green">✓</span>
          <div>
            <p>DECIDED</p>
            <h3>{decided}</h3>
          </div>
        </article>

        <article className="decision-stat-card">
          <span className="decision-stat-icon blue">↻</span>
          <div>
            <p>REVIEWING</p>
            <h3>{reviewing}</h3>
          </div>
        </article>
      </section>

      <DecisionForm onAddDecision={handleAddDecision} />

      <section className="decisions-section">
        <div className="decisions-section-heading">
          <div>
            <span className="section-eyebrow">YOUR THINKING SPACE</span>
            <h2>Your decisions</h2>
            <p>Every choice has a reason. Keep track of yours.</p>
          </div>

          <span className="goal-count">{total} decisions</span>
        </div>

        {isLoading && !decisions ? (
          <Loading label="Loading decisions..." />
        ) : error && !decisions ? (
          <ErrorMessage error={error} onRetry={reload} />
        ) : total === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◇</div>
            <h3>No decisions recorded yet</h3>
            <p>
              Record your first decision above. Capture not only what you
              chose, but why you chose it.
            </p>
          </div>
        ) : (
          <div className="decision-card-list">
            {decisions.map((decision) => (
              <article className="decision-card" key={decision._id}>
                <div className="decision-card-main">
                  <div className="decision-card-title">
                    <span className="decision-card-symbol">◇</span>
                    <h3>{decision.title}</h3>
                  </div>

                  <span
                    className="badge"
                    data-tone={decision.status}
                  >
                    {decision.status}
                  </span>
                </div>

                <p className="decision-card-reasoning">
                  {decision.reasoning}
                </p>

                <div className="decision-card-footer">
                  <span className="decision-card-hint">
                    Your reasoning matters
                  </span>

                  <Link to={`/decisions/${decision._id}`}>
                    View details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DecisionsPage;
