import { useAuth } from "../../../auth/hooks/useAuth";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/Navbar.scss";
import { searchMoviesApi } from "../../api/movie.api";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownResults, setDropdownResults] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const desktopSearchRef  = useRef(null);
  const mobileInputRef    = useRef(null);
  const desktopInputRef   = useRef(null);
  const debounceRef       = useRef(null);
  const mobileSearchBtnRef = useRef(null);
  const mobileSearchBarRef = useRef(null);

  // ── FIX: logout karne ke baad /welcome pe navigate karo ──
  const handleLogout = async () => {
    await logout();
    navigate("/welcome", { replace: true });
  };

  const handleQueryChange = useCallback((val) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!val.trim()) {
      setDropdownResults([]);
      setDropdownOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setDropdownLoading(true);
      try {
        const res = await searchMoviesApi(val.trim());
        const movies = res.data?.movies ?? [];
        setDropdownResults(movies.slice(0, 6));
        setDropdownOpen(true);
      } catch (err) {
        console.log("Navbar search error", err);
      } finally {
        setDropdownLoading(false);
      }
    }, 400);
  }, []);

  const closeSearch = useCallback(() => {
    setDropdownOpen(false);
    setDropdownResults([]);
    setQuery("");
    setSearchOpen(false);
  }, []);

  const handleMovieClick = (movie) => {
    closeSearch();
    navigate(`/movie/${movie.id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
    }
  };

  const toggleSearch = (e) => {
    e?.stopPropagation(); // touchend/mousedown ko document tak mat jane do
    if (searchOpen) {
      closeSearch();
    } else {
      setSearchOpen(true);
      setMenuOpen(false);
      setTimeout(() => {
        desktopInputRef.current?.focus();
        mobileInputRef.current?.focus();
      }, 80);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return; // sirf tab listen karo jab search open ho

    const handler = (e) => {
      const target = e.target;
      // In elements ke andar click → search band mat karo
      if (desktopSearchRef.current?.contains(target)) return;
      if (mobileSearchBtnRef.current?.contains(target)) return;
      if (mobileSearchBarRef.current?.contains(target)) return;
      // Bahar click → band karo
      setSearchOpen(false);
      setDropdownOpen(false);
    };

    // touchend bhi handle karo (mobile ke liye)
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchend", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchend", handler);
    };
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && searchOpen) closeSearch();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    setMenuOpen(false);
    closeSearch();
  }, [location]);

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const navLinks = [
    { to: "/",          label: "Home"      },
    { to: "/discover",  label: "Discover"  },
    { to: "/favorites", label: "Favorites" },
    { to: "/history",   label: "History"   },
  ];

  const DropdownList = () => (
    <>
      {dropdownResults.map((movie) => {
        const year   = movie.release_date?.slice(0, 4);
        const rating = movie.vote_average?.toFixed(1);
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
          : null;
        return (
          <div
            key={movie.id}
            className="hn__dropdown-item"
            onMouseDown={() => handleMovieClick(movie)}
          >
            <div className="hn__dropdown-poster">
              {poster ? <img src={poster} alt="" loading="lazy" /> : <span>🎬</span>}
            </div>
            <div className="hn__dropdown-info">
              <span className="hn__dropdown-title">{movie.title}</span>
              <div className="hn__dropdown-meta">
                {year   && <span className="hn__dropdown-year">{year}</span>}
                {rating && (
                  <span className="hn__dropdown-rating">
                    <span className="hn__dropdown-star">★</span>{rating}
                  </span>
                )}
              </div>
            </div>
            <div className="hn__dropdown-arrow">→</div>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <nav className={`hn${scrolled ? " hn--scrolled" : ""}`}>

        {/* Logo */}
        <Link to="/" className="hn__logo">
          <div className="hn__logo-icon">🎬</div>
          <div className="hn__logo-text"><em>Oops</em>Movies</div>
        </Link>

        {/* Center links */}
        <div className="hn__links">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`hn__link${location.pathname === l.to ? " hn__link--active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hn__right">

          {/* Desktop search */}
          <div
            className={`hn__search${searchOpen ? " hn__search--open" : ""}`}
            ref={desktopSearchRef}
          >
            {searchOpen && (
              <form className="hn__search-form" onSubmit={handleSearch}>
                <input
                  ref={desktopInputRef}
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search movies…"
                  autoComplete="off"
                />
                {dropdownLoading && <div className="hn__search-spinner" />}
                {query && !dropdownLoading && (
                  <button type="submit" className="hn__search-go">→</button>
                )}
              </form>
            )}

            <button
              className="hn__search-btn"
              onClick={toggleSearch}
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </button>

            {searchOpen && dropdownOpen && dropdownResults.length > 0 && (
              <div className="hn__dropdown">
                <DropdownList />
              </div>
            )}
          </div>

          {/* User */}
          {user && (
            <div className="hn__user">
              <div className="hn__avatar">{user.name?.[0]?.toUpperCase() ?? "U"}</div>
              <span className="hn__username">{user.name}</span>
            </div>
          )}

          {/* Logout — uses handleLogout instead of logout directly */}
          <button className="hn__logout" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>

          {/* Hamburger */}
          <button
            className={`hn__burger${menuOpen ? " hn__burger--open" : ""}`}
            onClick={() => { setMenuOpen((v) => !v); closeSearch(); }}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          {/* Mobile search icon */}
          <button
            ref={mobileSearchBtnRef}
            className="hn__search-mobile-btn"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="hn__mobile-search-bar" ref={mobileSearchBarRef}>
          <form className="hn__mobile-search-form" onSubmit={handleSearch}>
            <div className="hn__mobile-search-inner">
              <svg className="hn__mobile-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={mobileInputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search movies…"
                autoComplete="off"
              />
              {dropdownLoading && <div className="hn__search-spinner hn__search-spinner--mobile" />}
              {query && !dropdownLoading && (
                <button type="submit" className="hn__mobile-search-go">→</button>
              )}
            </div>
          </form>

          {dropdownOpen && dropdownResults.length > 0 && (
            <div className="hn__mobile-dropdown">
              <DropdownList />
            </div>
          )}
        </div>
      )}

      {/* Mobile hamburger menu */}
      {menuOpen && (
        <div className="hn__mobile-menu">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="hn__mobile-link">{l.label}</Link>
          ))}
          <div className="hn__mobile-footer">
            {user && <span className="hn__mobile-user">👤 {user.name}</span>}
            {/* Mobile logout bhi fix kiya */}
            <button className="hn__mobile-logout" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;