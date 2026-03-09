import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.scss";
import { useMovies } from "../../home/hooks/useMovies";
import { addRipple } from "../../../shared/buttonStyles/Styles";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "../../../shared/svg/Svg";

const Postcard = lazy(() => import("../components/Postcard"));

const IMG = "https://image.tmdb.org/t/p/w185";

// Only show poster mosaic on desktop (>900px) — avoids fetching 20 images on mobile
const isDesktop = typeof window !== "undefined" && window.innerWidth > 900;

export default function Login() {
  const navigate = useNavigate();
  const { login, errors, user } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Only fetch trending on desktop — mobile doesn't show the poster mosaic
  const { trending } = useMovies();
  const posters = useMemo(() => {
    if (!isDesktop) return [];
    return trending.filter((m) => m.poster_path).slice(0, 12); // reduced from 20 → 12
  }, [trending]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const emailValid = email.includes("@") && email.includes(".");

  return (
    <div className="auth-page">

      {/* Left decorative panel — hidden on mobile via CSS */}
      <div className="auth-left">
        {/* Static orbs — no animation, just color blobs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Poster mosaic — only rendered on desktop */}
        {isDesktop && (
          <div className="poster-mosaic">
            <Suspense fallback={null}>
              {Array.from({ length: 12 }).map((_, i) => (
                <Postcard key={i} movie={posters[i]} IMG={IMG} delay={i * 80} />
              ))}
            </Suspense>
          </div>
        )}

        {/* Film strip */}
        <div className="film-strip">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="fs-hole" />
          ))}
        </div>

        <div className="auth-left__content">
          <Link to="/" className="logo">
            <div className="lm">🎬</div>
            <div className="lt"><em>Oops</em>Movies</div>
          </Link>

          <div className="auth-left__quote">
            <blockquote>
              Every great film<br />
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

      {/* Right form panel */}
      <div className="auth-right">
        {/* Mobile logo */}
        <Link to="/" className="auth-mobile-logo">
          <div className="lm">🎬</div>
          <div className="lt"><em>Oops</em>Movies</div>
        </Link>

        <div className="auth-head">
          <h1>Welcome <span>back.</span></h1>
          <p>Sign in to continue your cinematic journey.</p>
        </div>

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
                <p key={i} className="ae">{err.msg}</p>
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
              <><span className="spin-icon">⏳</span>Signing in...</>
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