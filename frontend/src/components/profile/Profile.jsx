import { useState, useEffect } from "react";

const TEMP_TOKEN = "paste_your_real_token_here";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${TEMP_TOKEN}` },
      });
      const data = await response.json();
      setUser(data);
      setName(data.name || "");
    }
    fetchProfile();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      setUser(await response.json());
    }
  }

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
    </div>
  );
}

export default Profile;