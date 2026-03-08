import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles//Login.scss";
import { useMovies } from "../../home/hooks/useMovies";

// TMDB image base
const IMG = "https://image.tmdb.org/t/p/w342";

// ── SVG Icons ─────────────────────────────────────────────────
const MailIcon = () => (
  <svg
    className="af-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg
    className="af-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);


// ── Eye Icons (password show/hide) ───────────────────────────
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function addRipple(e) {
  const btn = e.currentTarget;
  const c = document.createElement("span");
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const r = btn.getBoundingClientRect();
  c.className = "rpl";
  c.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px;`;
  btn.querySelector(".rpl")?.remove();
  btn.appendChild(c);
}

// ════════════════════════════════════════════════
export default function Login() {
  const navigate = useNavigate();
  const { login, errors, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // ── Poster mosaic ─────────────────────────────
  const { trending, popular } = useMovies();
  const posters = [...trending, ...popular]
    .filter((m) => m.poster_path)
    .slice(0, 20);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const emailValid = email.includes("@") && email.includes(".");

  return (
    <div className="auth-page">
      {/* ── Left decorative panel ── */}
      <div className="auth-left">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Poster mosaic — real TMDB images */}
        <div className="poster-mosaic">
          {Array.from({ length: 20 }).map((_, i) => {
            const movie = posters[i];
            return (
              <div key={i} className={`pm-card${movie ? "" : " pm-loading"}`}>
                {movie && (
                  <img
                    src={`${IMG}${movie.poster_path}`}
                    alt=""
                    style={{ transitionDelay: `${i * 60}ms` }}
                    onLoad={(e) => e.currentTarget.classList.add("pm-visible")}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Film strip */}
        <div className="film-strip">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="fs-hole" />
          ))}
        </div>

        <div className="auth-left__content">
          <Link to="/" className="logo">
            <div className="lm">🎬</div>
            <div className="lt">
              <em>Oops</em>Movies
            </div>
          </Link>

          <div className="auth-left__quote">
            <blockquote>
              Every great film
              <br />
              begins with a<br />
              <em>single click.</em>
            </blockquote>
            <p className="q-sub">
              Sign in and step back into your personal cinema universe. Your
              watchlist, ratings, and discoveries — all waiting.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-right">
        {/* Mobile logo */}
        <Link to="/" className="auth-mobile-logo">
          <div className="lm">🎬</div>
          <div className="lt">
            <em>Oops</em>Movies
          </div>
        </Link>

        {/* Heading */}
        <div className="auth-head">
          <h1>
            Welcome <span>back.</span>
          </h1>
          <p>Sign in to continue your cinematic journey.</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="af">
            <label className="af__label">Email Address</label>
            <div className="af__wrap">
              <MailIcon />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailValid ? "is-valid" : ""}
                required
              />
              {emailValid && <span className="af-check">✓</span>}
            </div>
          </div>

          {/* Password */}
          <div className="af">
            <label className="af__label">Password</label>
            <div className="af__wrap">
              <LockIcon />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* ✅ Eye toggle button */}
              <button
                type="button"
                className="af-eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Errors */}
          {errors?.length > 0 && (
            <div className="auth-errors">
              {errors.map((err, i) => (
                <p key={i} className="ae">
                  {err.msg}
                </p>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            onClick={addRipple}
          >
            {loading ? (
              <>
                <span className="spin-icon">⏳</span>Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div className="auth-divider" style={{ marginTop: 28 }}>
          <span>Don't have an account?</span>
        </div>

        <div className="auth-footer" style={{ marginTop: 20 }}>
          <Link to="/register">Create a free account →</Link>
        </div>
      </div>
    </div>
  );
}
