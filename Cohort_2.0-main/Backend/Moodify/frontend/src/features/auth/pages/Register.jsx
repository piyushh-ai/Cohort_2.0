import React, { useState, useEffect } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import { authHook } from "../hooks/AuthHook";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading, error, user } = authHook();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="register-root">
      {/* Ambient orbs */}
      <div className="register-orb register-orb--gold" />
      <div className="register-orb register-orb--blue" />

      {/* Dot grid */}
      <div className="register-grid" />

      {/* Deco frame */}
      <div className="deco-line top" />
      <div className="deco-line bottom" />
      <div className="deco-dot tl" />
      <div className="deco-dot tr" />
      <div className="deco-dot bl" />
      <div className="deco-dot br" />

      <div className="register-card">
        {/* Brand */}
        <div className="register-brand">
          <p className="brand-eyebrow">Join the vibe</p>
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

        <p className="form-heading">Create your account</p>

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="register-footer">
          Already have an account?&nbsp;
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;