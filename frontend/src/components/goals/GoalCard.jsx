
import { useState } from "react";

function GoalCard({
  id,
  title,
  priority,
  progress,
  completed,
  decision,
  onToggleComplete,
  onDeleteGoal,
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleConfirmDelete() {
    onDeleteGoal(id);
    setConfirmingDelete(false);
  }

  return (
    <article className="goal-card" data-completed={completed}>
      <div className="goal-card-header">
        <div className="goal-card-title">
          <span className="goal-card-indicator"></span>
          <h3 className="goal-title">{title}</h3>
        </div>

        <span className="badge" data-tone={priority}>
          {priority}
        </span>
      </div>

      {decision && (
        <div className="goal-decision">
          <span className="decision-icon">◇</span>
          <div>
            <span className="decision-label">LINKED DECISION</span>
            <p>{decision.title}</p>
          </div>
        </div>
      )}

      <div className="goal-card-progress">
        <div className="goal-progress-heading">
          <span>Progress</span>
          <strong>{progress}%</strong>
        </div>

        <progress
          value={progress}
          max="100"
          aria-label={`Progress for ${title}`}
        />
      </div>

      <div className="goal-card-status">
        <span
          className="badge"
          data-tone={completed ? "done" : "in-progress"}
        >
          <span className="status-dot"></span>
          {completed ? "Completed" : "In progress"}
        </span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="goal-action-primary"
          onClick={() => onToggleComplete(id)}
        >
          {completed ? "Reopen goal" : "Mark complete"}
        </button>

        {confirmingDelete ? (
          <>
            <button
              type="button"
              className="btn-danger-solid"
              onClick={handleConfirmDelete}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn-danger"
            onClick={() => setConfirmingDelete(true)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default GoalCard;
