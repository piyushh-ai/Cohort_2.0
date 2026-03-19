import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { LogoIcon } from "../../shared/icons";

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const Spinner = () => (
  <svg
    className="animate-spin"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
    <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
  </svg>
);

const strengthMeta = [
  { label: "", color: "#222" }, // ← null tha, ab safe object
  { label: "Weak", color: "#ef4444" },
  { label: "Fair", color: "#f97316" },
  { label: "Good", color: "#eab308" },
  { label: "Strong", color: "#20b2aa" },
];

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const { handleRegister, error } = useAuth();

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password });
    // ✅ Fixed: show success state, not navigate (email verification needed)
    if (result) setRegistered(true);
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-[#252525] hover:border-[#303030] focus:border-[#20b2aa]/50 focus:ring-1 focus:ring-[#20b2aa]/15 text-white text-sm placeholder-[#3a3a3a] rounded-xl px-4 py-2.5 outline-none transition-all duration-200";

  // ─── Success screen ───────────────────────────────────────────────────────
  if (registered) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20b2aa]/8 blur-[140px]" />
        </div>
        <div className="relative w-full max-w-[360px] text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#20b2aa]/15 border border-[#20b2aa]/25 flex items-center justify-center mx-auto mb-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#20b2aa"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Check your email
          </h2>
          <p className="text-sm text-[#555] mb-6 leading-relaxed">
            We sent a verification link to{" "}
            <span className="text-[#888]">{email}</span>. Click it to activate
            your account.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  // ─── Register form ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20b2aa]/8 blur-[140px]" />
      </div>

      <div className="relative w-full max-w-[360px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#20b2aa] flex items-center justify-center">
              <LogoIcon />
            </div>
            <span className="text-white text-lg font-semibold tracking-tight">
              Perplexity
            </span>
          </div>
          <h1 className="text-[22px] font-semibold text-white tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-[#555] mt-1">
            Start exploring with AI-powered search
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 shadow-2xl">
          {/* Error banner */}
          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-xs text-red-400">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs font-medium text-[#555] mb-1.5 block tracking-wide">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-[#555] mb-1.5 block tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-[#555] mb-1.5 block tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#666] transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Strength meter */}
              {password && (
                <div className="mt-2.5">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            i <= strength
                              ? strengthMeta[strength].color
                              : "#222",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-[11px]"
                    style={{ color: strengthMeta[strength].color }}
                  >
                    {strengthMeta[strength].label}
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border transition-all duration-200 flex items-center justify-center ${
                  agreed
                    ? "bg-[#20b2aa] border-[#20b2aa]"
                    : "border-[#2e2e2e] bg-[#0a0a0a] group-hover:border-[#3a3a3a]"
                }`}
              >
                {agreed && (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <span className="text-xs text-[#444] leading-relaxed">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-[#20b2aa] hover:text-[#2dd4bf] transition-colors"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#20b2aa] hover:text-[#2dd4bf] transition-colors"
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !agreed || !username || !email || !password}
              className="w-full bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-150 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner /> Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-[#444] mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
