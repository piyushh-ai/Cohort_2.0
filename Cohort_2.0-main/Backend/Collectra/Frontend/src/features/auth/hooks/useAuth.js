import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  loginAPI,
  registerAPI,
  logoutAPI,
  googleLoginAPI,
  getMeAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
} from "../api/auth.api";

const TOKEN_KEY = "collectra_token";

// Helper: token save/clear
function persistToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

const useAuth = () => {
  const { error, setError, user, setUser, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // ─── Clear Error ──────────────────────────────────────
  const clearError = () => setError(null);

  // ─── Verify User on App Load ──────────────────────────
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getMeAPI();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  // ── Login ─────────────────────────────────────────────
  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAPI(formData);
      setUser(response.user);
      persistToken(response.token); // <-- ADD THIS
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ── Register ──────────────────────────────────────────
  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAPI(formData);
      setUser(response.user);
      persistToken(response.token); // <-- ADD THIS
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Google Login ─────────────────────────────────────
  const googleLogin = () => {
    googleLoginAPI();
    // Google OAuth ke baad URL mein token aata hai
    const params = new URLSearchParams(window.location.search);
    const extToken = params.get("ext_token");
    if (extToken) {
      persistToken(extToken);
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  // ── Logout ────────────────────────────────────────────
  const logout = async () => {
    try {
      await logoutAPI();
    } finally {
      setUser(null);
      persistToken(null); // <-- ADD THIS (clears localStorage)
    }
  };

  // ─── Forgot Password ──────────────────────────────────
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await forgotPasswordAPI({ email });
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ─── Reset Password ───────────────────────────────────
  const resetPassword = async (id, token, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resetPasswordAPI(id, token, { password });
      navigate("/login");
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  function syncTokenToExtension(token) {
    try {
      const extensionId = import.meta.env.VITE_EXTENSION_ID;
      if (
        extensionId &&
        typeof chrome !== "undefined" &&
        chrome.runtime?.sendMessage
      ) {
        chrome.runtime.sendMessage(extensionId, { type: "SAVE_TOKEN", token });
      }
    } catch {
      // Extension nahi hai — koi baat nahi
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extToken = params.get("ext_token");
    if (extToken) {
      syncTokenToExtension(extToken);
      // URL se token param hatao
      params.delete("ext_token");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return {
    user,
    setUser, // ✅ Profile update ke liye expose karo
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
  };
};

export default useAuth;