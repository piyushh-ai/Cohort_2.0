import React, { useEffect, useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../shared/components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, user, handleLogin, error } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
      };

  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign up</button>
        </form>
        <p className="extra">
          Don't have an account?{" "}
          <Link to="/register">
            <span style={{ color: "#0095f6", cursor: "pointer" }}>
              Register
            </span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
