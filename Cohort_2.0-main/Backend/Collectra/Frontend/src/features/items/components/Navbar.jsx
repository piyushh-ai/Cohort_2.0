import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import "../styles/Navbar.scss";

const Navbar = ({ onAddItem, onSearch, onMenuToggle, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const getInitials = (username) => {
    if (!username) return "U";
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="navbar">
      {/* Hamburger — mobile only */}
      <button
        className={`hamburger-btn${sidebarOpen ? " is-open" : ""}`}
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">CL</div>
        <span className="navbar-logo-text">Collectra</span>
      </Link>

      {/* Search — center column */}
      <div className="navbar-search">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.856a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
        </svg>
        <input
          type="text"
          placeholder="Search items..."
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      {/* Actions — right column */}
      <div className="navbar-actions">
        <button className="add-btn" onClick={onAddItem}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z" />
          </svg>
          <span className="add-btn-label">Add Item</span>
        </button>

        {/* Avatar + Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            className="avatar-btn"
            onClick={() => setDropdownOpen((p) => !p)}
            title={user?.username}
          >
            {user?.googleProfilePicture ? (
              <img
                src={user.googleProfilePicture}
                alt={user.username}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="avatar-initials">{getInitials(user?.username)}</span>
            )}
          </button>

          {dropdownOpen && (
            <div className="avatar-dropdown">
              {/* User info */}
              <div className="avatar-user-info">
                <div className="avatar-user-info-top">
                  <div className="avatar-preview">
                    {user?.googleProfilePicture ? (
                      <img
                        src={user.googleProfilePicture}
                        alt={user.username}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{getInitials(user?.username)}</span>
                    )}
                  </div>
                  <div>
                    <p className="avatar-username">{user?.username}</p>
                    <p className="avatar-email">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Profile */}
              <button className="dropdown-item">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Profile
              </button>

              {/* Sign Out */}
              <button
                className="dropdown-item danger"
                onClick={() => { setDropdownOpen(false); logout(); }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;