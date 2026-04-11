import { useDispatch } from "react-redux";
import { setUser } from "../auth.slice";
import { register } from "../api/auth.api";

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

  return {
    handleRegister,
  };
};
