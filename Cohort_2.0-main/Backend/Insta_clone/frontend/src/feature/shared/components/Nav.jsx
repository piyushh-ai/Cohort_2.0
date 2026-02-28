import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/nav.scss";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <h1>Insta</h1>
      <button onClick={() => navigate("/create-post")}>
        Create Post
      </button>
    </div>
  );
};

export default Nav;