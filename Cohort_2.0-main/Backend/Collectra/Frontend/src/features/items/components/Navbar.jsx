import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import "../styles/Navbar.scss";

const Navbar = ({
  onAddItem,
  onSearch,
  onMenuToggle,
  sidebarOpen,
  onSemanticSearch,
  semanticLoading,
  onChatOpen,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSemanticMode, setIsSemanticMode] = useState(false);
  const [extensionInstalled, setExtensionInstalled] = useState(true);
  const dropdownRef = useRef(null);
  const searchDebounceRef = useRef(null);

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
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      if (isSemanticMode && value.trim()) onSemanticSearch?.(value.trim());
      else onSearch?.(value);
    }, 500);
  };

  const toggleSemanticMode = () => {
    const next = !isSemanticMode;
    setIsSemanticMode(next);
    if (searchValue.trim()) {
      if (next) onSemanticSearch?.(searchValue.trim());
      else onSearch?.(searchValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      clearTimeout(searchDebounceRef.current);
      if (isSemanticMode) onSemanticSearch?.(searchValue.trim());
      else onSearch?.(searchValue);
    }
    if (e.key === "Escape") {
      setSearchValue("");
      onSearch?.("");
    }
  };

  // Extension detect — content.js injects #collectra-ext-installed div
  useEffect(() => {
    const check = () => {
      setExtensionInstalled(
        !!document.getElementById("collectra-ext-installed"),
      );
    };
    check();
    const t = setTimeout(check, 800);
    return () => clearTimeout(t);
  }, []);

  const getInitials = (username) => {
    if (!username) return "U";
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="navbar">
      {/* ── Hamburger — mobile only, desktop pe CSS se hidden ── */}
      <button
        className={`hamburger-btn${sidebarOpen ? " is-open" : ""}`}
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* ── Logo — desktop only ── */}
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">CL</div>
        <span className="navbar-logo-text">Collectra</span>
      </Link>

      {/* ── Search ── */}
      <div
        className={`navbar-search${isSemanticMode ? " navbar-search--semantic" : ""}`}
      >
        {semanticLoading ? (
          <span className="search-spinner" />
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.856a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
          </svg>
        )}
        <input
          type="text"
          placeholder={
            isSemanticMode ? "Search by meaning... (AI)" : "Search items..."
          }
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`semantic-toggle${isSemanticMode ? " semantic-toggle--active" : ""}`}
          onClick={toggleSemanticMode}
          title={
            isSemanticMode
              ? "Switch to keyword search"
              : "Switch to AI semantic search"
          }
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
          </svg>
          <span className="semantic-toggle-label">AI</span>
        </button>
      </div>

      {/* ── Actions ── */}
      <div className="navbar-actions">
        {/* Extension download — sirf tab dikhao jab installed nahi ho */}
        {!extensionInstalled && (
          <a
            className="ext-download-btn"
            href="/collectra-extension.zip"
            download="collectra-extension.zip"
            title="Download Collectra Extension"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            <span className="ext-btn-label">Get Extension</span>
          </a>
        )}

        {/* Knowledge Graph — desktop only (CSS se hide on mobile) */}
        <button
          className="graph-btn"
          onClick={() => navigate("/graph")}
          title="Knowledge Graph"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
            <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
          </svg>
          <span className="graph-btn-label">Graph</span>
        </button>

        {/* AI Chat — Desktop only */}
        {onChatOpen && (
          <button className="chat-btn" onClick={onChatOpen} title="Ask AI about your collection">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
            </svg>
            <span className="chat-btn-label">Ask AI</span>
          </button>
        )}

        {/* Add Item — desktop only, mobile mein bottom nav ka gold button hai */}
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
                src={user.profilePicture || user.googleProfilePicture}
                alt={user.username}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="avatar-initials">
                {getInitials(user?.username)}
              </span>
            )}
          </button>

          {dropdownOpen && (
            <div className="avatar-dropdown">
              <div className="avatar-user-info">
                <div className="avatar-user-info-top">
                  <div className="avatar-preview">
                    {user?.googleProfilePicture ? (
                      <img
                        src={user.profilePicture || user.googleProfilePicture}
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

              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Profile
              </button>

              <button
                className="dropdown-item danger"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
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
