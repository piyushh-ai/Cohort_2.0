import { Link } from "react-router-dom";
import "../styles/About.scss";

// ── Data ──────────────────────────────────────────────────────
const TEAM = [
  { emoji: "👨‍💻", name: "Piyush Sirolia", role: "Founder & Developer", color: "#6366f1", linkedin: "https://www.linkedin.com/in/piyush-sirolia-070174369" },
];

const TIMELINE = [
  { year: "2023", title: "The Idea",      desc: "Started as a weekend project — a simple movie tracker for personal use." },
  { year: "2024", title: "TMDB Connect",  desc: "Integrated the TMDB API, unlocking millions of movies and real-time data." },
  { year: "2024", title: "Public Launch", desc: "OopsMovies went live. Thousands of cinephiles joined in the first month." },
  { year: "2025", title: "Growing Fast",  desc: "New features every week — watchlists, ratings, recommendations, and more." },
];

const VALUES = [
  { icon: "🎯", title: "Built for fans",   desc: "We're movie lovers first, developers second. Everything we build serves the cinephile." },
  { icon: "🔓", title: "Free forever",     desc: "Core features will always be free. No paywalls on discovery." },
  { icon: "🚀", title: "Always improving", desc: "We ship fast, listen to users, and iterate continuously." },
  { icon: "🤝", title: "Community first",  desc: "Your ratings, lists, and reviews make OopsMovies smarter for everyone." },
];

// LinkedIn SVG icon
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function addRipple(e) {
  const btn = e.currentTarget;
  const c = document.createElement("span");
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const r = btn.getBoundingClientRect();
  c.className = "rpl";
  c.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px;`;
  btn.querySelector(".rpl")?.remove();
  btn.appendChild(c);
}

// ════════════════════════════════════════════════════════════
export default function About() {
  return (
    <div className="about-page">

      {/* ── Navbar ── */}
      <nav className="wn">
        <Link to="/" className="wn__logo">
          <div className="lm">🎬</div>
          <div className="lt"><em>Oops</em>Movies</div>
        </Link>
        <div className="wn__links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active">About</Link>
          <Link to="/tmdb">TMDB</Link>
        </div>
        <div className="wn__btns">
          <Link to="/login"    className="btn-outline">Sign In</Link>
          <Link to="/register" className="btn-red" onClick={addRipple}>Get Started</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="ab-hero">
        <div className="ab-hero__mesh" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="ab-hero__content">
          <div className="ab-hero__pill">
            <span className="pill-dot" />
            <span>Our Story</span>
          </div>
          <h1 className="ab-hero__title">
            Made by movie lovers,<br />
            <em>for movie lovers.</em>
          </h1>
          <p className="ab-hero__sub">
            OopsMovies started as a passion project — a better way to track, discover,
            and obsess over films. Today it's a growing platform used by thousands of
            cinephiles around the world.
          </p>
        </div>
        <div className="ab-hero__deco">FILM</div>
      </section>

      {/* ── Values ── */}
      <section className="ab-values">
        <div className="ab-values__label">What we believe</div>
        <h2 className="ab-values__title">Our <em>core values</em></h2>
        <div className="ab-values__grid">
          {VALUES.map((v, i) => (
            <div key={i} className="ab-values__card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="vc-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="ab-timeline">
        <div className="ab-timeline__label">How we got here</div>
        <h2 className="ab-timeline__title">Our <em>journey</em></h2>
        <div className="ab-timeline__track">
          {TIMELINE.map((t, i) => (
            <div key={i} className={`tl-item ${i % 2 === 0 ? "tl-item--left" : "tl-item--right"}`}>
              <div className="tl-item__card">
                <div className="tl-year">{t.year}</div>
                <h3 className="tl-title">{t.title}</h3>
                <p className="tl-desc">{t.desc}</p>
              </div>
              <div className="tl-item__dot" />
            </div>
          ))}
          <div className="tl-spine" />
        </div>
      </section>

      {/* ── Team ── */}
      <section className="ab-team">
        <div className="ab-team__label">The people</div>
        <h2 className="ab-team__title">Behind <em>OopsMovies</em></h2>

        {/* ✅ Single member — centered layout */}
        <div className="ab-team__solo">
          {TEAM.map((m, i) => (
            <a
              key={i}
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tm-card tm-card--solo"
              style={{ animationDelay: `${i * 0.12}s` }}
              title="View LinkedIn Profile"
            >
              <div
                className="tm-card__avatar"
                style={{ background: `${m.color}22`, borderColor: `${m.color}44` }}
              >
                <span>{m.emoji}</span>
                <div className="tm-card__ring" style={{ borderColor: `${m.color}55` }} />
              </div>

              <div className="tm-card__name">{m.name}</div>
              <div className="tm-card__role">{m.role}</div>

              {/* LinkedIn badge */}
              <div className="tm-card__linkedin">
                <LinkedInIcon />
                <span>View Profile</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ab-cta">
        <div className="ab-cta__inner">
          <h2>Ready to start watching?</h2>
          <p>Join thousands of movie lovers. Free forever.</p>
          <div className="ab-cta__btns">
            <Link to="/register" className="btn-hero" onClick={addRipple}>Create Free Account</Link>
            <Link to="/tmdb"     className="btn-outline">Learn about TMDB →</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="wfooter">
        <Link to="/" className="fl"><em>Oops</em>Movies</Link>
        <span className="fc">© 2026 OopsMovies · Powered by TMDB</span>
        <div className="flinks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <Link to="/tmdb">TMDB</Link>
        </div>
      </footer>
    </div>
  );
}