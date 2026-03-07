import React from "react";
import { authHook } from "../hooks/AuthHook";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = authHook();

  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return children;
};

export default Protected;
