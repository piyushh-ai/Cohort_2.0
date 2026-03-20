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

const useAuth = () => {
  const { error, setError, user, setUser, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  

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

  // ─── Login ────────────────────────────────────────────
  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAPI(formData);
      setUser(response.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ─── Register ─────────────────────────────────────────
  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAPI(formData);
      setUser(response.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.err ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Google Login ─────────────────────────────────────
  const googleLogin = () => {
    googleLoginAPI();
  };

  // ─── Logout ───────────────────────────────────────────
  const logout = async () => {
    try {
      await logoutAPI();
    } finally {
      setUser(null);
      navigate("/login");
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

  return {
    user,
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