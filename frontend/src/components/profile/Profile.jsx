import { useState, useEffect } from "react";
import { getMe, updateMe } from "../../api/users";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
        setName(data.name || "");
      })
      .catch((err) => setError(err.message));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    try {
      setUser(await updateMe({ name }));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error && !user) return <p>Could not load profile: {error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Profile;