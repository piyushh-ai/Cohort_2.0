import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { LogoIcon } from "../../shared/icons";
import useFahhSound from "../../shared/useFahhSound ";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const playFahh = useFahhSound();

  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const { handleLogin, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result) {
      playFahh();
      navigate("/");
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-[#252525] hover:border-[#303030] focus:border-[#20b2aa]/50 focus:ring-1 focus:ring-[#20b2aa]/15 text-white text-sm placeholder-[#3a3a3a] rounded-xl px-4 py-2.5 outline-none transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      {/* Ambient glow */}
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
            Welcome back
          </h1>
          <p className="text-sm text-[#555] mt-1">Sign in to continue</p>
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
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
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
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#666] transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-150 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-[#444] mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
