import { useState, useEffect } from "react";
import Header from "../components/Header";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

const API_BASE_URL = "http://localhost:3000";
const DEMO_EMAIL = "demo@decisionjournal.com";
const DEMO_PASSWORD = "demo123456";
const TOKEN_STORAGE_KEY = "decision-journal-token";

async function ensureValidToken() {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (savedToken) {
    return savedToken;
  }

  const signupResponse = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    }),
  });

  if (!signupResponse.ok && signupResponse.status !== 409) {
    const errorData = await signupResponse.json().catch(() => ({}));
    throw new Error(errorData.message || "Unable to create demo account");
  }

  const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    }),
  });

  const loginData = await loginResponse.json().catch(() => ({}));

  if (!loginResponse.ok) {
    throw new Error(loginData.message || "Login failed");
  }

  localStorage.setItem(TOKEN_STORAGE_KEY, loginData.token);
  return loginData.token;
}

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const token = await ensureValidToken();

        const response = await fetch(`${API_BASE_URL}/api/goals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGoals();
  }, []);

  function handleAddGoal(newGoal) {
    setGoals([...goals, { ...newGoal, progress: 0 }]);
  }

  return (
    <div>
      <Header />
      <GoalForm onAddGoal={handleAddGoal} />

      {isLoading ? (
        <p>Loading goals...</p>
      ) : error ? (
        <p>Something went wrong: {error}</p>
      ) : goals.length === 0 ? (
        <p>No goals yet. Add your first one above!</p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal._id}
            title={goal.title}
            priority={goal.priority}
            progress={goal.progress}
          />
        ))
      )}
    </div>
  );
}

export default App;