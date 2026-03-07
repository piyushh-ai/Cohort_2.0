import { useContext } from "react";
import { authContext } from "../AuthContext";
import { getMe, login, logOut, register } from "../services/auth.api";
import { useEffect } from "react";

export const authHook = () => {
  const context = useContext(authContext);

  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const response = await register({ username, email, password });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    }
  };

  const handleLogin = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const response = await login({ username, email, password });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
      
    } catch (error) {
      console.log("handleGetMe error ", error);
    } finally{
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logOut();
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.log("handleLogout error ", error);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    loading,
    user,
    error,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
