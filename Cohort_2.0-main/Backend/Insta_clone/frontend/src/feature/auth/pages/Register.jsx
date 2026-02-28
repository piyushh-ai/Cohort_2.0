import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { handleRegister, loading, user, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
  };

  useEffect(() => {
    if (user) {
      console.log("register in user:", user);
      navigate("/");
    }
  }, [user]);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign up</button>
        </form>

        <p className="extra">
          Have an account?{" "}
          <Link to="/login">
            <span style={{ color: "#0095f6", cursor: "pointer" }}>Log in</span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
