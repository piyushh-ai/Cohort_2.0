import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password });
    if (result) {
      navigate("/");
    }
  };

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#20b2aa"];

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 font-sans py-10">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#20b2aa]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#20b2aa] to-[#0d9488] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-white text-xl font-semibold tracking-tight">
              Perplexity
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-[#666] mt-1.5">
            Start exploring with AI-powered search
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-7 shadow-2xl">
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs font-medium text-[#888] mb-1.5 block">
                Full name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] hover:border-[#333] focus:border-[#20b2aa]/60 focus:ring-1 focus:ring-[#20b2aa]/20 text-white text-sm placeholder-[#444] rounded-xl px-4 py-2.5 outline-none transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-[#888] mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] hover:border-[#333] focus:border-[#20b2aa]/60 focus:ring-1 focus:ring-[#20b2aa]/20 text-white text-sm placeholder-[#444] rounded-xl px-4 py-2.5 outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-[#888] mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] hover:border-[#333] focus:border-[#20b2aa]/60 focus:ring-1 focus:ring-[#20b2aa]/20 text-white text-sm placeholder-[#444] rounded-xl px-4 py-2.5 pr-11 outline-none transition-all duration-200"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            i <= strength ? strengthColor[strength] : "#222",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColor[strength] }}>
                    {strengthLabel[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border transition-all duration-200 flex items-center justify-center ${
                  agreed
                    ? "bg-[#20b2aa] border-[#20b2aa]"
                    : "border-[#333] bg-[#0d0d0d] group-hover:border-[#444]"
                }`}
              >
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-[#555] leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#20b2aa] hover:text-[#2dd4bf] transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#20b2aa] hover:text-[#2dd4bf] transition-colors">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !agreed}
              className="w-full bg-[#20b2aa] hover:bg-[#1a9e96] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                    <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-[#555] mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-[#20b2aa] hover:text-[#2dd4bf] font-medium transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;