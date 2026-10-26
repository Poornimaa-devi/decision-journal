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
        <h3 className="goal-title">{title}</h3>
        <span className="badge" data-tone={priority}>
          {priority}
        </span>
      </div>

      {decision && <p className="goal-decision">From decision: {decision.title}</p>}

      <div className="goal-progress">
        <progress value={progress} max="100" aria-label={`Progress for ${title}`} />
        <span>{progress}%</span>
      </div>

      <p>
        <span className="badge" data-tone={completed ? "done" : "in-progress"}>
          {completed ? "Completed" : "In progress"}
        </span>
      </p>

      <div className="card-actions">
        <button onClick={() => onToggleComplete(id)}>
          {completed ? "Reopen" : "Mark complete"}
        </button>

        {confirmingDelete ? (
          <>
            <button className="btn-danger-solid" onClick={handleConfirmDelete}>
              Confirm delete
            </button>
            <button onClick={() => setConfirmingDelete(false)}>Cancel</button>
          </>
        ) : (
          <button className="btn-danger" onClick={() => setConfirmingDelete(true)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default GoalCard;