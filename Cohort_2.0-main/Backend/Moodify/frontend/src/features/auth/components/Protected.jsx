import React from "react";
import { authHook } from "../hooks/AuthHook";
import { Navigate } from "react-router-dom";
import Loader from "../../../shared/components/Loader";

const Protected = ({ children }) => {
  const { loading, user } = authHook();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return children;
};

export default Protected;
