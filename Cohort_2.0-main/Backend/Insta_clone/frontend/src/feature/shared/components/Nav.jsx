import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/nav.scss";
import { useAuth } from "../../auth/hooks/useAuth";

const Nav = () => {
  const navigate = useNavigate();
  const { handleUserLogout, user, fetchCurrentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // fetchCurrentUser PEHLE — return ke baad nahi chalti thi isliye refresh pe hi dikhta tha
    fetchCurrentUser();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogoutClick = async () => {
    setMenuOpen(false);
    await handleUserLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="nav">
      <h1 onClick={() => navigate("/")}>Insta</h1>

      {/* Desktop buttons */}
      <div className="nav-links">
        <button onClick={() => navigate("/create-post")}>Create Post</button>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>

      {/* Mobile hamburger */}
      <div className="nav-hamburger" ref={menuRef}>
        <button
          className={`hamburger-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
          {user && (
            <div className="hamburger-user">
              <div className="hamburger-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} />
                ) : (
                  <span>{user.username?.[0]?.toUpperCase() ?? "U"}</span>
                )}
              </div>
              <p className="hamburger-username">{user.username}</p>
            </div>
          )}

          <div className="hamburger-divider" />

          <button className="hamburger-item" onClick={() => handleNav("/profile")}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            Profile
          </button>

          <button className="hamburger-item" onClick={() => handleNav("/create-post")}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Create Post
          </button>

          <div className="hamburger-divider" />

          <button className="hamburger-item logout" onClick={handleLogoutClick}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;