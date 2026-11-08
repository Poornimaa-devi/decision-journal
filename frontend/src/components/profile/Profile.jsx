
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
      const updated = await updateMe({ name: name.trim() });
      onSaved(updated);
      setName(updated.name || "");
      setSaved(true);
    } catch (err) {
      setSaveError(err.message || "Unable to update your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="profile-card">
      <div className="profile-section-heading">
        <div>
          <span className="section-eyebrow">PERSONAL INFORMATION</span>
          <h3>Edit your profile</h3>
          <p>Keep your account information up to date.</p>
        </div>

        <div className="profile-section-icon">✎</div>
      </div>

      <form className="profile-form" onSubmit={handleSave}>
        <div className="profile-field">
          <label htmlFor="profile-name">Your name</label>
          <input
            id="profile-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            maxLength={50}
          />
          <span className="profile-field-hint">
            This name will be displayed on your profile.
          </span>
        </div>

        <div className="profile-field">
          <label htmlFor="profile-email">Email address</label>
          <input
            id="profile-email"
            type="email"
            value={user.email}
            readOnly
          />
          <span className="profile-field-hint">
            Your registered email address.
          </span>
        </div>

        {saveError && <ErrorMessage error={saveError} />}

        <div className="profile-form-footer">
          {saved ? (
            <span className="profile-success" role="status">
              ✓ Profile updated successfully!
            </span>
          ) : (
            <span>Your changes are saved to your account.</span>
          )}

          <button type="submit" disabled={isSaving || !name.trim()}>
            {isSaving ? "Saving changes..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Profile() {
  const {
    data: user,
    setData,
    error,
    isLoading,
    reload,
  } = useFetch(getMe, []);

  if (isLoading && !user) {
    return <Loading label="Loading profile..." />;
  }

  if (error && !user) {
    return <ErrorMessage error={error} onRetry={reload} />;
  }

  if (!user) return null;

  const displayName = user.name?.trim() || "Decision Journal User";
  const initial = displayName.charAt(0).toUpperCase();

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">{initial}</div>

        <div className="profile-hero-content">
          <span className="section-eyebrow">YOUR ACCOUNT</span>
          <h2>{displayName}</h2>
          <p>{user.email}</p>

          <span className="profile-member-badge">
            <span className="profile-member-dot"></span>
            Decision Journal Member
          </span>
        </div>

        <div className="profile-hero-decoration">✦</div>
      </section>

      <section className="profile-overview">
        <article className="profile-overview-card">
          <div className="profile-overview-icon purple">◎</div>
          <div>
            <span>ACCOUNT NAME</span>
            <strong>{displayName}</strong>
          </div>
        </article>

        <article className="profile-overview-card">
          <div className="profile-overview-icon green">✉</div>
          <div>
            <span>EMAIL ADDRESS</span>
            <strong>{user.email}</strong>
          </div>
        </article>

        <article className="profile-overview-card">
          <div className="profile-overview-icon blue">▣</div>
          <div>
            <span>MEMBER SINCE</span>
            <strong>{memberSince}</strong>
          </div>
        </article>
      </section>

      <ProfileForm user={user} onSaved={setData} />

      <section className="profile-security-card">
        <div className="profile-security-icon">♧</div>
        <div>
          <h3>Your personal growth space</h3>
          <p>
            Use Decision Journal to record your decisions, understand
            your reasoning, and keep track of your goals.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Profile;
