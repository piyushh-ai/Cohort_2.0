import React, { useState, useEffect } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { authHook } from "../hooks/AuthHook";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error, user } = authHook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="login-root">
      {/* Ambient orbs */}
      <div className="login-orb login-orb--gold" />
      <div className="login-orb login-orb--purple" />

      {/* Dot grid */}
      <div className="login-grid" />

      {/* Deco frame lines */}
      <div className="deco-line top" />
      <div className="deco-line bottom" />
      <div className="deco-dot tl" />
      <div className="deco-dot tr" />
      <div className="deco-dot bl" />
      <div className="deco-dot br" />

      <div className="login-card">
        {/* Top shimmer + inner border via CSS ::before / ::after */}

        {/* Brand */}
        <div className="login-brand">
          <p className="brand-eyebrow">Welcome back</p>
          <h1 className="brand-title">MOODIFY</h1>
          <div className="soundwave">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bar" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider">
          <div className="div-line" />
          <div className="div-diamond" />
          <div className="div-line" />
        </div>

        <p className="form-heading">Sign in to continue</p>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </span>
            ) : (
              "Start Listening"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          New to Moodify?&nbsp;
          <span onClick={() => navigate("/register")}>Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;