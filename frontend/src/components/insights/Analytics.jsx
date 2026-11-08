
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { useFetch } from "../../hook/useFetch";
import { getGoalAnalytics } from "../../api/goals";
import { getDecisionAnalytics } from "../../api/decisions";

function Analytics() {
  const goals = useFetch(getGoalAnalytics, []);
  const decisions = useFetch(getDecisionAnalytics, []);

  if (goals.isLoading && !goals.data) {
    return <Loading label="Loading analytics..." />;
  }

  if (goals.error && !goals.data) {
    return <ErrorMessage error={goals.error} onRetry={goals.reload} />;
  }

  if (!goals.data) return null;

  const { overall, byPriority } = goals.data;

  const totalGoals = overall.totalGoals;
  const completedGoals = overall.completedGoals;
  const activeGoals = totalGoals - completedGoals;

  const completionRate =
    totalGoals > 0
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

  const decisionData = decisions.data;
  const totalDecisions =
    decisionData?.overall?.totalDecisions ?? 0;

  const decisionStatuses = [
    { key: "pending", label: "Pending", color: "orange" },
    { key: "decided", label: "Decided", color: "green" },
    { key: "reviewing", label: "Reviewing", color: "blue" },
  ];

  function getStatusCount(status) {
    return (
      decisionData?.byStatus?.find((item) => item._id === status)?.count ?? 0
    );
  }

  return (
    <div className="analytics-dashboard">

      {/* Summary Cards */}
      <section className="analytics-summary">
        <article className="analytics-stat-card">
          <div className="analytics-stat-icon purple">◎</div>
          <div>
            <p>TOTAL GOALS</p>
            <h3>{totalGoals}</h3>
            <span>Goals created</span>
          </div>
        </article>

        <article className="analytics-stat-card">
          <div className="analytics-stat-icon green">✓</div>
          <div>
            <p>COMPLETED GOALS</p>
            <h3>{completedGoals}</h3>
            <span>Goals completed</span>
          </div>
        </article>

        <article className="analytics-stat-card">
          <div className="analytics-stat-icon orange">◷</div>
          <div>
            <p>ACTIVE GOALS</p>
            <h3>{activeGoals}</h3>
            <span>Goals in progress</span>
          </div>
        </article>

        <article className="analytics-stat-card">
          <div className="analytics-stat-icon blue">◇</div>
          <div>
            <p>TOTAL DECISIONS</p>
            {decisions.isLoading && !decisionData ? (
              <h3>...</h3>
            ) : decisions.error && !decisionData ? (
              <h3>—</h3>
            ) : (
              <h3>{totalDecisions}</h3>
            )}
            <span>Decisions recorded</span>
          </div>
        </article>
      </section>

      {decisions.error && !decisionData && (
        <ErrorMessage
          error={decisions.error}
          onRetry={decisions.reload}
        />
      )}

      {/* Goal Progress */}
      <section className="analytics-panel goal-progress-panel">
        <div className="analytics-panel-heading">
          <div>
            <span className="section-eyebrow">YOUR JOURNEY</span>
            <h2>Goal completion</h2>
            <p>See how far you've progressed toward your goals.</p>
          </div>

          <div className="completion-percentage">
            {completionRate}%
          </div>
        </div>

        <div className="analytics-progress-track">
          <div
            className="analytics-progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <div className="analytics-progress-footer">
          <span>{completedGoals} completed</span>
          <span>{activeGoals} remaining</span>
        </div>
      </section>

      {/* Detailed Analytics */}
      <div className="analytics-details-grid">

        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <span className="section-eyebrow">GOAL ANALYSIS</span>
              <h2>Goals by priority</h2>
              <p>Understand how your goals are distributed.</p>
            </div>
            <span className="analytics-heading-icon">▥</span>
          </div>

          {byPriority.length === 0 ? (
            <div className="analytics-empty">
              No goal priority data available yet.
            </div>
          ) : (
            <div className="priority-list">
              {byPriority.map((item) => (
                <div className="priority-item" key={item._id}>
                  <div className="priority-item-top">
                    <span className={`priority-dot ${item._id}`} />
                    <span className="priority-name">
                      {item._id}
                    </span>
                    <strong>{item.count} goals</strong>
                  </div>

                  <div className="priority-progress-track">
                    <div
                      className={`priority-progress-fill ${item._id}`}
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, item.count / totalGoals * 100)
                        )}%`,
                      }}
                    />
                  </div>

                  <p>
                    Average progress:{" "}
                    <strong>
                      {Math.round(item.avgProgress)}%
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <span className="section-eyebrow">DECISION ANALYSIS</span>
              <h2>Decisions by status</h2>
              <p>Track the current state of your decisions.</p>
            </div>
            <span className="analytics-heading-icon">◇</span>
          </div>

          {decisions.isLoading && !decisionData ? (
            <Loading label="Loading decision statistics..." />
          ) : decisions.error && !decisionData ? (
            <p className="analytics-empty">
              Decision statistics are unavailable.
            </p>
          ) : totalDecisions === 0 ? (
            <div className="analytics-empty">
              No decisions recorded yet.
            </div>
          ) : (
            <div className="decision-status-list">
              {decisionStatuses.map((item) => {
                const count = getStatusCount(item.key);
                const percentage = Math.round(
                  (count / totalDecisions) * 100
                );

                return (
                  <div className="decision-status-item" key={item.key}>
                    <div className="decision-status-top">
                      <span className={`status-indicator ${item.color}`} />
                      <span>{item.label}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="status-progress-track">
                      <div
                        className={`status-progress-fill ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="status-percentage">
                      {percentage}% of your decisions
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Analytics;
