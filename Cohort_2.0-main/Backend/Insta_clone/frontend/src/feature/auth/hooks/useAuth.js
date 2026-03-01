import { useContext } from "react";
import { AuthContext } from "../Auth.context";
import { login, register, getMe, handleLogout } from "../services/Auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { loading, setLoading, user, setUser, error, setError } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.data.user);
      console.log(data);

      if (data.status === 204) {
        setError(data.message);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogout = async () => {
    setLoading(true);
    try {
      await handleLogout();
      setUser(null); 
      setError(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    user,
    handleLogin,
    handleRegister,
    fetchCurrentUser,
    error,
    handleUserLogout
  };
};
