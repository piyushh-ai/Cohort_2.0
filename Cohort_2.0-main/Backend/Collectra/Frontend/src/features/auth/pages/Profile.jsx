import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  updateProfileAPI,
  updateProfilePictureAPI,
  removeProfilePictureAPI,
  changePasswordAPI,
} from "../api/auth.api";
import "../styles/Profile.scss";

// ─── Avatar helper ────────────────────────────────────
const getAvatar = (user) => {
  if (user?.profilePicture) return user.profilePicture;
  if (user?.googleProfilePicture) return user.googleProfilePicture;
  return null;
};

const getInitials = (user) => {
  const name = user?.displayName || user?.username || "U";
  return name.slice(0, 2).toUpperCase();
};

// ─── Toast ────────────────────────────────────────────
const Toast = ({ msg, type }) => (
  <div className={`profile-toast profile-toast--${type}`}>
    {type === "success" ? "✓" : "✕"} {msg}
  </div>
);

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Avatar state
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Avatar upload ─────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Input reset karo taaki same file dobara select ho sake
    e.target.value = "";

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be under 5MB", "error");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Only image files allowed", "error");
      return;
    }

    // Local preview set karo
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);

    setAvatarLoading(true);
    try {
      const res = await updateProfilePictureAPI(file);
      if (res.success && res.user) {
        setUser(res.user); // ✅ Context update
        setAvatarPreview(null); // ✅ Preview clear — real URL se show hoga
        showToast("Profile picture updated!");
      } else {
        throw new Error(res.message || "Upload failed");
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      setAvatarPreview(null);
      showToast(
        err.response?.data?.message || err.message || "Upload failed",
        "error",
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarLoading(true);
    try {
      const res = await removeProfilePictureAPI();
      setUser(res.user);
      showToast("Profile picture removed");
    } catch {
      showToast("Failed to remove picture", "error");
    } finally {
      setAvatarLoading(false);
    }
  };

  // ─── Profile update ────────────────────────────────
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await updateProfileAPI(profileForm);
      setUser(res.user);
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setProfileLoading(false);
    }
  };

  // ─── Password change ───────────────────────────────
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    setPasswordLoading(true);
    try {
      await changePasswordAPI({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      showToast("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to change password",
        "error",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const avatar = avatarPreview || getAvatar(user);
  const isGoogleUser = user?.provider === "google";

  return (
    <div className="profile-page">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* ─── Header ─────────────────────────────────── */}
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate("/")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Back to vault
        </button>
        <div className="profile-header-brand">
          <span className="profile-logo-mark">CL</span>
          <span className="profile-logo-name">Collectra</span>
        </div>
      </div>

      <div className="profile-body">
        {/* ─── Left — Avatar card ─────────────────────── */}
        <aside className="profile-aside">
          <div className="profile-avatar-card">
            {/* Avatar */}
            <div className="profile-avatar-wrap">
              <div
                className={`profile-avatar ${avatarLoading ? "profile-avatar--loading" : ""}`}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="profile-avatar-initials">
                    {getInitials(user)}
                  </span>
                )}
                {avatarLoading && (
                  <div className="profile-avatar-overlay">
                    <span className="spinner" />
                  </div>
                )}
              </div>
              <button
                className="profile-avatar-edit-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarLoading}
                title="Change photo"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>

            {/* User info */}
            <div className="profile-aside-info">
              <h2 className="profile-aside-name">
                {user?.displayName || user?.username}
              </h2>
              <p className="profile-aside-email">{user?.email}</p>
              {user?.bio && <p className="profile-aside-bio">{user.bio}</p>}
            </div>

            {/* Provider badge */}
            <div className="profile-provider-badge">
              {isGoogleUser ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
                    <path
                      fill="#FFC107"
                      d="M43.6 20.1H42V20H24v8h11.3C33.7 33.1 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.4 0 10.3-2 14-5.3l-6.5-5.5C29.5 35 26.9 36 24 36c-5.2 0-9.6-3.5-11.2-8.2L6.1 33.6C9.5 39.7 16.2 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.5 5.5C37 36.8 44 31 44 24c0-1.3-.1-2.7-.4-3.9z"
                    />
                  </svg>
                  Google account
                </>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
                  </svg>
                  Local account
                </>
              )}
            </div>

            {/* Remove photo */}
            {user?.profilePicture && (
              <button
                className="profile-remove-photo-btn"
                onClick={handleRemoveAvatar}
                disabled={avatarLoading}
              >
                Remove photo
              </button>
            )}
          </div>

          {/* Stats card */}
          <div className="profile-stats-card">
            <div className="profile-stat">
              <span className="profile-stat-label">Member since</span>
              <span className="profile-stat-value">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>
        </aside>

        {/* ─── Right — Tabs ───────────────────────────── */}
        <main className="profile-main">
          {/* Tabs */}
          <div className="profile-tabs">
            {[
              { id: "profile", label: "Profile" },
              ...(isGoogleUser ? [] : [{ id: "password", label: "Password" }]),
              { id: "danger", label: "Account" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`profile-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─── Profile Tab ─────────────────────────── */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h3>Profile Information</h3>
                <p>Update your name, username and bio</p>
              </div>

              <form className="profile-form" onSubmit={handleProfileSave}>
                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={profileForm.displayName}
                      onChange={(e) =>
                        setProfileForm((p) => ({
                          ...p,
                          displayName: e.target.value,
                        }))
                      }
                      placeholder="Your full name"
                      maxLength={50}
                    />
                    <span className="profile-form-hint">
                      Shown on your profile
                    </span>
                  </div>

                  <div className="profile-form-group">
                    <label>Username</label>
                    <div className="profile-input-prefix">
                      <span className="prefix">@</span>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            username: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9_]/g, ""),
                          }))
                        }
                        placeholder="username"
                        maxLength={30}
                      />
                    </div>
                    <span className="profile-form-hint">
                      Letters, numbers, underscores only
                    </span>
                  </div>
                </div>

                <div className="profile-form-group">
                  <label>Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, bio: e.target.value }))
                    }
                    placeholder="Tell something about yourself..."
                    maxLength={160}
                    rows={3}
                  />
                  <span className="profile-form-hint profile-form-hint--right">
                    {profileForm.bio.length}/160
                  </span>
                </div>

                <div className="profile-form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ""} disabled />
                  <span className="profile-form-hint">
                    Email cannot be changed
                  </span>
                </div>

                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <>
                      <span className="spinner" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ─── Password Tab ─────────────────────────── */}
          {activeTab === "password" && !isGoogleUser && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h3>Change Password</h3>
                <p>Choose a strong password to keep your account secure</p>
              </div>

              <form className="profile-form" onSubmit={handlePasswordChange}>
                {["currentPassword", "newPassword", "confirmPassword"].map(
                  (field) => {
                    const labels = {
                      currentPassword: "Current Password",
                      newPassword: "New Password",
                      confirmPassword: "Confirm New Password",
                    };
                    const keys = {
                      currentPassword: "current",
                      newPassword: "new",
                      confirmPassword: "confirm",
                    };
                    return (
                      <div key={field} className="profile-form-group">
                        <label>{labels[field]}</label>
                        <div className="profile-input-eye">
                          <input
                            type={
                              showPasswords[keys[field]] ? "text" : "password"
                            }
                            value={passwordForm[field]}
                            onChange={(e) =>
                              setPasswordForm((p) => ({
                                ...p,
                                [field]: e.target.value,
                              }))
                            }
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                              setShowPasswords((p) => ({
                                ...p,
                                [keys[field]]: !p[keys[field]],
                              }))
                            }
                          >
                            {showPasswords[keys[field]] ? (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            ) : (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  },
                )}

                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <>
                      <span className="spinner" /> Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ─── Account / Danger Tab ─────────────────── */}
          {activeTab === "danger" && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h3>Account</h3>
                <p>Manage your account settings</p>
              </div>

              <div className="profile-danger-card">
                <div className="profile-danger-item">
                  <div>
                    <h4>Sign out</h4>
                    <p>Sign out of your Collectra account on this device</p>
                  </div>
                  <button
                    className="profile-danger-btn profile-danger-btn--outline"
                    onClick={() => logout()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
