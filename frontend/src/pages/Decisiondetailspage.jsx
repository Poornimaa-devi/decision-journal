
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { usePageTitle } from "../hook/usePageTitle";
import {
  getDecisionById,
  updateDecision,
} from "../api/decisions";

function DecisionDetailPage() {
  const { id } = useParams();

  const {
    data: decision,
    error,
    isLoading,
    reload,
  } = useFetch(() => getDecisionById(id), [id]);

  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [updateError, setUpdateError] = useState("");

  usePageTitle(decision?.title ?? "Decision");

  useEffect(() => {
    if (decision) {
      setStatus(decision.status);
    }
  }, [decision]);

  async function handleStatusChange(event) {
    const newStatus = event.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setIsSaving(true);
    setUpdateError("");

    try {
      const updatedDecision = await updateDecision(id, {
        status: newStatus,
      });

      setStatus(updatedDecision.status);
    } catch (err) {
      setStatus(previousStatus);
      setUpdateError(err.message || "Failed to update decision status.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading && !decision) {
    return <Loading label="Loading decision..." />;
  }

  if (error && !decision) {
    return (
      <div className="decision-detail-error">
        <ErrorMessage error={error} onRetry={reload} />
        <Link to="/decisions" className="back-link">
          ← Back to decisions
        </Link>
      </div>
    );
  }

  if (!decision) return null;

  return (
    <div className="decision-detail-page">
      <Link to="/decisions" className="back-link">
        ← Back to decisions
      </Link>

      <section className="decision-detail-hero">
        <div className="decision-detail-hero-top">
          <span className="section-eyebrow">YOUR THINKING SPACE</span>

          <span className="decision-detail-symbol">◇</span>
        </div>

        <h2>{decision.title}</h2>

        <p>
          A closer look at your choice, the reasoning behind it, and its
          current status.
        </p>

        <div className="decision-detail-current-status">
          <span>Current status</span>
          <span className="badge" data-tone={status}>
            {status}
          </span>
        </div>
      </section>

      <div className="decision-detail-grid">
        <section className="decision-reasoning-card">
          <div className="detail-section-heading">
            <span className="detail-icon">✎</span>
            <div>
              <span className="section-eyebrow">THE WHY</span>
              <h3>Your reasoning</h3>
            </div>
          </div>

          <div className="reasoning-content">
            {decision.reasoning}
          </div>
        </section>

        <section className="decision-status-card">
          <div className="detail-section-heading">
            <span className="detail-icon">↻</span>
            <div>
              <span className="section-eyebrow">TRACK YOUR CHOICE</span>
              <h3>Update status</h3>
            </div>
          </div>

          <p className="status-description">
            Keep your decision status up to date as your thinking evolves.
          </p>

          <label htmlFor="decision-status">
            Decision status
          </label>

          <select
            id="decision-status"
            value={status}
            onChange={handleStatusChange}
            disabled={isSaving}
          >
            <option value="pending">Pending</option>
            <option value="decided">Decided</option>
            <option value="reviewing">Reviewing</option>
          </select>

          {isSaving && (
            <p className="status-saving">Saving your changes...</p>
          )}

          {!isSaving && !updateError && (
            <p className="status-help">
              Your status is saved automatically when you change it.
            </p>
          )}

          {updateError && (
            <p className="status-error" role="alert">
              {updateError}
            </p>
          )}

          <div className="status-meaning">
            <strong>What do these statuses mean?</strong>
            <ul>
              <li><b>Pending:</b> You haven't finalized your choice.</li>
              <li><b>Decided:</b> You've made your choice.</li>
              <li><b>Reviewing:</b> You're reconsidering your choice.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="decision-detail-bottom">
        <Link to="/decisions">← Return to all decisions</Link>
      </div>
    </div>
  );
}

export default DecisionDetailPage;
