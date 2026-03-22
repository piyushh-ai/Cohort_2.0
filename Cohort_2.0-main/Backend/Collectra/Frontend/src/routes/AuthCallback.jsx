import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extToken = params.get("ext_token");
    if (extToken) {
      localStorage.setItem("collectra_token", extToken);
      window.history.replaceState({}, "", "/");
    }
    navigate("/", { replace: true });
  }, []);

  return null;
};

export default AuthCallback;
