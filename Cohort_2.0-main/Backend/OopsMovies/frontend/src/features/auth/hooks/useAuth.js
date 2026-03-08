  import { useContext, useEffect, useState } from "react";
  import { AuthContext } from "../context/AuthContext";
  import { loginApi, registerApi, logoutApi, getMeApi } from "../api/auth.api";

  export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const [errors, setErrors] = useState([]);

    const register = async (data) => {
      try {
        setErrors([]);

        await registerApi(data);
        await getUser();
      } catch (err) {
        const apiErrors = err.response?.data?.errors || [
          { msg: err.response?.data?.message || "Something went wrong" },
        ];

        setErrors(apiErrors);
      }
    };

    const login = async (data) => {
      try {
        setErrors([]);

        await loginApi(data);
        await getUser();
      } catch (err) {
        const apiErrors = err.response?.data?.errors || [
          { msg: err.response?.data?.message || "Login failed" },
        ];

        setErrors(apiErrors);
      }
    };

    const logout = async () => {
      await logoutApi();
      setUser(null);
    };

    const getUser = async () => {
      try {
        const res = await getMeApi();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getUser();
    }, []);

    return {
      user,
      loading,
      errors,
      register,
      login,
      logout,
    };
  };
