import { useDispatch, useSelector } from "react-redux";
import { register, login, getMe, logoutApi } from "../service/auth.api";
import {
  setUser,
  setError,
  setLoading,
  clearError,
  logout,
  setInitialized,
} from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(clearError());
      dispatch(setLoading(true));
      const data = await register({ email, username, password });
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Registration failed"));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(clearError());
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    try {
      await logoutApi();
    } catch (_) {
    } finally {
      dispatch(logout());
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user)); // sets initialized: true
    } catch (_) {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
      dispatch(setInitialized());
    }
  }

  return { handleRegister, handleLogin, handleLogout, handleGetMe, error };
}
