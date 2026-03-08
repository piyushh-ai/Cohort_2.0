import { Link } from "react-router-dom";
import "../styles/Tmdb.scss";

// ── Data ──────────────────────────────────────────────────────
const STATS = [
  { num: "900K+", label: "Movies",          icon: "🎬" },
  { num: "150K+", label: "TV Shows",        icon: "📺" },
  { num: "38M+",  label: "Images",          icon: "🖼️" },
  { num: "100+",  label: "Languages",       icon: "🌍" },
];

const WHAT_WE_USE = [
  {
    icon: "🔍",
    title: "Movie Discovery",
    desc: "Trending, popular, top-rated, and upcoming movies — all powered by TMDB's real-time data engine.",
    endpoint: "/movie/trending",
  },
  {
    icon: "📄",
    title: "Movie Details",
    desc: "Full metadata — cast, crew, runtime, genres, budgets, release dates, production companies and more.",
    endpoint: "/movie/{id}",
  },
  {
    icon: "🎞️",
    title: "Trailers & Videos",
    desc: "Official trailers, teasers, and behind-the-scenes clips pulled directly from YouTube via TMDB.",
    endpoint: "/movie/{id}/videos",
  },
  {
    icon: "🔎",
    title: "Search",
    desc: "Full-text search across the entire TMDB library — millions of titles returned in milliseconds.",
    endpoint: "/search/movie",
  },
  {
    icon: "🖼️",
    title: "Images & Posters",
    desc: "High-resolution poster and backdrop images served from TMDB's global CDN at multiple sizes.",
    endpoint: "image.tmdb.org/t/p/",
  },
  {
    icon: "🎭",
    title: "Similar Movies",
    desc: "Smart recommendations based on a movie's genres, cast, and metadata to keep you discovering.",
    endpoint: "/movie/{id}/similar",
  },
];

const SIZES = [
  { code: "w92",    use: "Thumbnails" },
  { code: "w185",   use: "Small cards" },
  { code: "w342",   use: "Card grids" },
  { code: "w500",   use: "Hero stack" },
  { code: "w780",   use: "Detail pages" },
  { code: "original", use: "Full quality" },
];

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
export default function Tmdb() {
  return (
    <div className="tmdb-page">

      {/* ── Navbar ── */}
      <nav className="wn">
        <Link to="/" className="wn__logo">
          <div className="lm">🎬</div>
          <div className="lt"><em>Oops</em>Movies</div>
        </Link>
        <div className="wn__links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/tmdb" className="active">TMDB</Link>
        </div>
        <div className="wn__btns">
          <Link to="/login"    className="btn-outline">Sign In</Link>
          <Link to="/register" className="btn-red" onClick={addRipple}>Get Started</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="tb-hero">
        <div className="tb-hero__mesh" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="tb-hero__content">
          {/* TMDB logo badge */}
          <div className="tb-logo-badge">
            <div className="tb-logo-badge__icon">
              <span>🎥</span>
            </div>
            <div>
              <div className="tb-logo-badge__name">TMDB</div>
              <div className="tb-logo-badge__tag">The Movie Database</div>
            </div>
          </div>

          <h1 className="tb-hero__title">
            The data behind<br />
            <em>every movie</em> you see.
          </h1>
          <p className="tb-hero__sub">
            OopsMovies is powered by TMDB — the world's most popular and comprehensive
            movie database. Here's how we use it to bring you millions of titles,
            real-time ratings, and rich media.
          </p>

          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero tb-hero__link"
            onClick={addRipple}
          >
            Visit TMDB.org ↗
          </a>
        </div>

        {/* decorative api url */}
        <div className="tb-hero__api">
          <div className="api-pill">
            <span className="api-pill__method">GET</span>
            <span className="api-pill__url">api.themoviedb.org/3/movie/trending</span>
          </div>
          <div className="api-pill" style={{ animationDelay: ".15s" }}>
            <span className="api-pill__method">GET</span>
            <span className="api-pill__url">api.themoviedb.org/3/search/movie?query=...</span>
          </div>
          <div className="api-pill" style={{ animationDelay: ".3s" }}>
            <span className="api-pill__method">GET</span>
            <span className="api-pill__url">image.tmdb.org/t/p/w500/poster.jpg</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="tb-stats">
        {STATS.map((s, i) => (
          <div key={i} className="tb-stats__item" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="tb-stats__icon">{s.icon}</div>
            <div className="tb-stats__num">{s.num}</div>
            <div className="tb-stats__lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── What we use ── */}
      <section className="tb-uses">
        <div className="tb-uses__label">How we use TMDB</div>
        <h2 className="tb-uses__title">6 APIs powering <em>OopsMovies</em></h2>
        <div className="tb-uses__grid">
          {WHAT_WE_USE.map((u, i) => (
            <div key={i} className="tb-use-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="tb-use-card__icon">{u.icon}</div>
              <h3>{u.title}</h3>
              <p>{u.desc}</p>
              <div className="tb-use-card__endpoint">
                <span className="ep-dot" />
                <code>{u.endpoint}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Image sizes ── */}
      <section className="tb-images">
        <div className="tb-images__label">Image CDN</div>
        <h2 className="tb-images__title">Poster sizes we <em>use</em></h2>
        <p className="tb-images__sub">
          TMDB serves images via <code>image.tmdb.org/t/p/</code> at multiple
          sizes. We pick the right one per context for optimal performance.
        </p>
        <div className="tb-images__grid">
          {SIZES.map((s, i) => (
            <div key={i} className="sz-card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="sz-card__code">{s.code}</div>
              <div className="sz-card__use">{s.use}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Attribution ── */}
      <section className="tb-attr">
        <div className="tb-attr__inner">
          <div className="tb-attr__badge">
            <span style={{ fontSize: 32 }}>🎗️</span>
          </div>
          <h2>Official Attribution</h2>
          <p>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
            All movie data, images, and metadata are property of their respective owners.
            We are grateful to the TMDB community for maintaining such an incredible resource.
          </p>
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero"
            onClick={addRipple}
          >
            TMDB API Docs ↗
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tb-cta">
        <div className="tb-cta__inner">
          <h2>Start exploring <em>millions of movies</em></h2>
          <p>Powered by TMDB. Free forever. No credit card needed.</p>
          <div className="tb-cta__btns">
            <Link to="/register" className="btn-hero" onClick={addRipple}>Create Free Account</Link>
            <Link to="/about"    className="btn-outline">About Us →</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="wfooter">
        <Link to="/" className="fl"><em>Oops</em>Movies</Link>
        <span className="fc">© 2024 OopsMovies · Powered by TMDB</span>
        <div className="flinks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <Link to="/about">About</Link>
        </div>
      </footer>
    </div>
  );
}