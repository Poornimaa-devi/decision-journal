import { useState, useEffect } from "react";
import GoalForm from "../components/goals/GoalForm";
import Dashboard from "../components/goals/Dashboard";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../api/goals";
import { getDecisions } from "../api/decisions";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function loadGoals() {
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (priorityFilter) params.priority = priorityFilter;
        if (sortBy) params.sort = sortBy;

        setGoals(await getGoals(params));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadGoals();
  }, [searchTerm, priorityFilter, sortBy]);

  useEffect(() => {
    getDecisions()
      .then(setDecisions)
      .catch((err) => console.error("Could not load decisions:", err.message));
  }, []);

  async function handleAddGoal(newGoal) {
    try {
      const saved = await createGoal(newGoal);
      setGoals([...goals, saved]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleComplete(goalId) {
    const goal = goals.find((g) => g._id === goalId);
    try {
      const updated = await updateGoal(goalId, { completed: !goal.completed });
      setGoals(goals.map((g) => (g._id === goalId ? updated : g)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteGoal(goalId) {
    try {
      await deleteGoal(goalId);
      setGoals(goals.filter((g) => g._id !== goalId));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Goals</h2>
      <GoalForm onAddGoal={handleAddGoal} decisions={decisions} />

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

      {isLoading ? (
        <p>Loading goals...</p>
      ) : error ? (
        <p>Something went wrong: {error}</p>
      ) : (
        <Dashboard
          goals={goals}
          onToggleComplete={handleToggleComplete}
          onDeleteGoal={handleDeleteGoal}
        />
      )}
    </div>
  );
}

export default GoalsPage;