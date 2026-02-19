import React, { useState } from "react";
import axios from "axios";
import "../styles/form.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/auth/register/",
        {
          username,
          password,
          email,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log("Registration successful:", response.data);
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

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
