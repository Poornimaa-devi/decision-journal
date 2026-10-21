import { useState } from "react";
import GoalForm from "../components/goals/GoalForm";
import Dashboard from "../components/goals/Dashboard";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { useFetch } from "../hook/useFetch";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../api/goals";
import { getDecisions } from "../api/decisions";

function GoalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [actionError, setActionError] = useState(null);

  const {
    data: goals,
    setData: setGoals,
    error: loadError,
    isLoading,
    reload,
  } = useFetch(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (priorityFilter) params.priority = priorityFilter;
    if (sortBy) params.sort = sortBy;
    return getGoals(params);
  }, [searchTerm, priorityFilter, sortBy]);

  const { data: decisions } = useFetch(getDecisions, []);

  async function handleAddGoal(newGoal) {
    setActionError(null);
    try {
      const saved = await createGoal(newGoal);
      setGoals((prev) => [...(prev ?? []), saved]);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleToggleComplete(goalId) {
    setActionError(null);
    const goal = goals.find((g) => g._id === goalId);
    try {
      const updated = await updateGoal(goalId, { completed: !goal.completed });
      setGoals((prev) => prev.map((g) => (g._id === goalId ? updated : g)));
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleDeleteGoal(goalId) {
    setActionError(null);
    try {
      await deleteGoal(goalId);
      setGoals((prev) => prev.filter((g) => g._id !== goalId));
    } catch (err) {
      setActionError(err.message);
    }
  }

  return (
    <div>
      <h2>Goals</h2>
      <GoalForm onAddGoal={handleAddGoal} decisions={decisions ?? []} />

      <input
        type="text"
        placeholder="Search goals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="progress">By progress</option>
      </select>

      {actionError && <ErrorMessage error={actionError} />}

      {isLoading && !goals ? (
        <Loading label="Loading goals..." />
      ) : loadError && !goals ? (
        <ErrorMessage error={loadError} onRetry={reload} />
      ) : (
        <Dashboard
          goals={goals ?? []}
          onToggleComplete={handleToggleComplete}
          onDeleteGoal={handleDeleteGoal}
        />
      )}
    </div>
  );
}

export default GoalsPage;