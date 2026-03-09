import { lazy, Suspense, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.scss";
import { useMovies } from "../../home/hooks/useMovies";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "../../../shared/svg/Svg";
import { addRipple } from "../../../shared/buttonStyles/Styles";

const Postcard = lazy(() => import("../components/Postcard"));

const IMG = "https://image.tmdb.org/t/p/w185";

// Only show poster mosaic on desktop (>900px) — avoids fetching 20 images on mobile
const isDesktop = typeof window !== "undefined" && window.innerWidth > 900;

// ── Password strength ──────────────────────────────────────────
function getStrength(pw) {
  if (!pw) return null;
  const checks = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)];
  const n = checks.filter(Boolean).length;
  return [null,{cls:"w",label:"Weak"},{cls:"f",label:"Fair"},{cls:"g",label:"Good"},{cls:"s",label:"Strong"}][n];
}

export default function Register() {
  const navigate = useNavigate();
  const { register, errors, user } = useAuth();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Only fetch popular on desktop — mobile doesn't show the poster mosaic
  const { popular } = useMovies();
  const posters = isDesktop
    ? [...popular].filter((m) => m.poster_path).slice(0, 12) // reduced from 20 → 12
    : [];

  const strength   = getStrength(password);
  const nameValid  = name.trim().length >= 2;
  const emailValid = email.includes("@") && email.includes(".");
  const passValid  = ["g", "s"].includes(strength?.cls);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register({ name, email, password });
    setLoading(false);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="auth-page">

      {/* Left panel — hidden on mobile via CSS */}
      <div className="auth-left">
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
              Your watchlist<br />
              is about to get<br />
              <em>a lot better.</em>
            </blockquote>
            <p className="q-sub">
              Join OopsMovies and unlock millions of films, personalised
              recommendations, and a community of movie lovers just like you.
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <Link to="/" className="auth-mobile-logo">
          <div className="lm">🎬</div>
          <div className="lt"><em>Oops</em>Movies</div>
        </Link>

        <div className="auth-head">
          <h1>Create your <span>account.</span></h1>
          <p>Free forever. No credit card required.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="af">
            <label className="af__label">Full Name</label>
            <div className="af__wrap">
              <UserIcon />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={nameValid ? "is-valid" : ""}
                required
              />
              {nameValid && <span className="af-check">✓</span>}
            </div>
          </div>

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
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={passValid ? "is-valid" : ""}
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

            {password && strength && (
              <div className="pw-strength" style={{ marginTop: 8 }}>
                <div className="pw-strength-bar">
                  <div className={`psb-fill ${strength.cls}`} />
                </div>
                <span className="psb-label">Password strength: {strength.label}</span>
              </div>
            )}
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
              <><span className="spin-icon">⏳</span> Creating account...</>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <div className="auth-divider" style={{ marginTop: 28 }}>
          <span>Already have an account?</span>
        </div>

        <div className="auth-footer" style={{ marginTop: 20 }}>
          <Link to="/login">Sign in to OopsMovies →</Link>
        </div>
      </div>
    </div>
  );
}