import { useEffect, useRef } from "react";
import "../styles/Welcome.scss";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate   = useNavigate();
  const titleRef   = useRef(null);

  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll(".letter");
    letters?.forEach((el, i) => {
      el.style.animationDelay = `${0.6 + i * 0.09}s`;
    });
  }, []);

  const titleLetters = "MOODIFY".split("").map((char, i) => (
    <span key={i} className="letter">{char}</span>
  ));

  return (
    <div className="welcome-root">
      {/* Ambient orbs */}
      <div className="welcome-orb welcome-orb--gold" />
      <div className="welcome-orb welcome-orb--purple" />
      <div className="welcome-orb welcome-orb--teal" />

      {/* Dot grid */}
      <div className="welcome-grid" />

      <div className="welcome-content">
        {/* Inner content border frame */}
        <div className="content-frame" />

        <p className="eyebrow">Welcome to</p>

        <h1 className="title" ref={titleRef}>
          {titleLetters}
        </h1>

        <div className="divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div className="divider-line" />
        </div>

        <p className="tagline">
          Discover music that matches your mood. Relax, focus, or vibe
          Moodify finds the perfect soundtrack for every moment.
        </p>

        <div className="welcome-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            <span className="btn-icon">▶</span>
            Start Listening
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>

        <div className="soundwave">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bar" />
          ))}
        </div>

        <p className="footer-text">
          Already have an account?&nbsp;
          <span onClick={() => navigate("/login")}>
            Log in and continue your vibe.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Welcome;