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

  // FIX: setUser(null) always runs — even if logoutApi() fails
  // Previously: await logoutApi() fail hone par setUser(null) kabhi nahi chalta tha
  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Logout API error (ignored):", err);
    } finally {
      // Server cookie clear kar raha hai ya nahi — client se bhi force delete karo
      // Sabse common cookie names try karo
      const cookieNames = ["token", "jwt", "accessToken", "access_token", "session", "connect.sid"];
      const domains = [window.location.hostname, "." + window.location.hostname, ""];
      const paths = ["/", "/api", ""];

      cookieNames.forEach((name) => {
        domains.forEach((domain) => {
          paths.forEach((path) => {
            // Expired date set karne se cookie delete ho jaati hai
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; SameSite=Lax;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; SameSite=None; Secure;`;
          });
        });
      });

      setUser(null);
    }
  };

  const getUser = async () => {
    try {
      const res = await getMeApi();
      setUser(res.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
      }
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