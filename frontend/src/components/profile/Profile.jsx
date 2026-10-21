import { useState } from "react";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { useFetch } from "../../hook/useFetch";
import { getMe, updateMe } from "../../api/users";

function ProfileForm({ user, onSaved }) {
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const updated = await updateMe({ name });
      onSaved(updated);
      setSaved(true);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={50}
      />
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      {saved && <p role="status">Saved!</p>}
      {saveError && <ErrorMessage error={saveError} />}
    </form>
  );
}

function Profile() {
  const { data: user, setData, error, isLoading, reload } = useFetch(getMe, []);

  if (isLoading && !user) return <Loading label="Loading profile..." />;
  if (error && !user) return <ErrorMessage error={error} onRetry={reload} />;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
      <ProfileForm user={user} onSaved={setData} />
    </div>
  );
}

export default Profile;