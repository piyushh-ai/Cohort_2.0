import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../auth.slice";
import { getMe, login, register } from "../services/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
    try {
      const response = await register({ email, contact, password, fullname, isSeller });
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password });
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMe();
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
};
