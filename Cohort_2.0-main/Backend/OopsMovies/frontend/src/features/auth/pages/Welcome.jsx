import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/Welcome.scss";
import { useMovies } from "../../home/hooks/useMovies";

// ── Constants ─────────────────────────────────────────────────
const IMG_W = "https://image.tmdb.org/t/p/w500";

const TICKER_ITEMS = [
  "Trending Now", "New Releases", "Top Rated", "Critically Acclaimed",
  "Hidden Gems", "Award Winners", "Fan Favourites", "Coming Soon",
  "Trending Now", "New Releases", "Top Rated", "Critically Acclaimed",
  "Hidden Gems", "Award Winners", "Fan Favourites", "Coming Soon",
];

const FEATURES = [
  { icon: "🎬", title: "Millions of Titles",  desc: "Powered by TMDB — access an ever-growing library of movies, series, and documentaries from every corner of the world." },
  { icon: "🔖", title: "Smart Watchlist",      desc: "Bookmark anything in seconds. Your watchlist syncs across all devices so you never lose track of what to watch next." },
  { icon: "⭐", title: "Rate & Review",        desc: "Share your takes, read the crowd, and discover films through ratings that actually match your taste." },
];

// ── Ripple ────────────────────────────────────────────────────
function addRipple(e) {
  const btn = e.currentTarget;
  const c = document.createElement("span");
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const r = btn.getBoundingClientRect();
  c.className = "rpl";
  c.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px;`;
  btn.querySelector(".rpl")?.remove();
  btn.appendChild(c);
}

// ── Single poster card ────────────────────────────────────────
function PosterCard({ movie, posClass }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`pc ${posClass}`}>
      {movie?.poster_path ? (
        <img
          className={`pc__img${loaded ? " pc__img--on" : ""}`}
          src={`${IMG_W}${movie.poster_path}`}
          alt={movie.title ?? ""}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="pc__skel" />
      )}
      <div className="pc__grad" />
      {movie && (
        <div className="pc__info">
          <div className="pc__year">{movie.release_date?.slice(0, 4)}</div>
          <div className="pc__title">{movie.title}</div>
          <div className="pc__meta">
            <span className="star">★</span>
            {movie.vote_average?.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
export default function Welcome() {
  const { user, logout } = useAuth();
  const { trending, popular } = useMovies();

  const movies = [...trending, ...popular].filter((m) => m.poster_path);
  const [m0, m1, m2, m3, m4] = movies;

  // ── Logged-in view ────────────────────────────────────────
  if (user) {
    return (
      <div className="welcome-page">
        <nav className="wn">
          <Link to="/" className="wn__logo">
            <div className="lm">🎬</div>
            <div className="lt"><em>Oops</em>Movies</div>
          </Link>
          <div className="wn__btns">
            <button className="btn-outline" onClick={logout}>Log Out</button>
          </div>
        </nav>

        <div className="welcome-user">
          <div className="wu-avatar">
            {user.name?.[0]?.toUpperCase() ?? "🎬"}
            <span className="wu-ring" />
          </div>
          <h1 className="wu-title">
            Welcome back,<br />
            <span className="wu-name">{user.name ?? "Cinephile"}</span>
          </h1>
          <p className="wu-sub">Ready to find tonight's film? Your watchlist is waiting.</p>
          <div className="wu-btns">
            <Link to="/movies"    className="btn-hero"     onClick={addRipple}>Browse Movies</Link>
            <Link to="/watchlist" className="btn-ghost-lg"><span className="pc-play">▶</span> Watchlist</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Landing view ──────────────────────────────────────────
  return (
    <div className="welcome-page">

      {/* Navbar */}
      <nav className="wn">
        <Link to="/" className="wn__logo">
          <div className="lm">🎬</div>
          <div className="lt"><em>Oops</em>Movies</div>
        </Link>
        <div className="wn__links">
          <a href="#features">Features</a>
          <Link to={"/about"}>About</Link>
          <Link to={"/tmdb"}>TMDB</Link>
        </div>
        <div className="wn__btns">
          <Link to="/login"    className="btn-outline">Sign In</Link>
          <Link to="/register" className="btn-red" onClick={addRipple}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero__mesh" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="scan-line" />

        {/* Left text */}
        <div className="hero__left">
          <div className="hero__badge">
            <span className="live" />
            <span>Powered by TMDB</span>
          </div>

          <h1 className="hero__title">
            <span className="t1">Movies</span>
            <span className="t2">Without</span>
            <span className="t3">Limits.</span>
          </h1>

          <p className="hero__desc">
            Discover, track, and obsess over millions of films. OopsMovies is your cinematic
            companion — built for people who take their watchlist seriously.
          </p>

          <div className="hero__cta">
            <Link to="/register" className="btn-hero" onClick={addRipple}>
              Start Watching Free
            </Link>
            
          </div>

          <div className="hero__social">
            <div className="avs">
              {["👤","🎭","🍿","🎞"].map((e, i) => (
                <div key={i} className="av">{e}</div>
              ))}
            </div>
            <p className="st"><strong>50,000+</strong> cinephiles already joined</p>
          </div>
        </div>

        {/* Right — real TMDB poster stack */}
        <div className="hero__right">
          <div className="posters">
            <PosterCard movie={m0} posClass="pc--c"  />
            <PosterCard movie={m1} posClass="pc--l"  />
            <PosterCard movie={m2} posClass="pc--r"  />
            <PosterCard movie={m3} posClass="pc--tl" />
            <PosterCard movie={m4} posClass="pc--tr" />

            {/* Floating badge — trending */}
            <div className="fb fb--trend">
              <span className="fb-emoji">🔥</span>
              <div>
                <div className="fb-lbl">Trending</div>
                <div className="fb-val">#1 Today</div>
              </div>
            </div>

            {/* Floating badge — rating (live from first movie) */}
            <div className="fb fb--score">
              <div className="fb-score">
                {m0 ? m0.vote_average?.toFixed(1) : "9.2"}
              </div>
              <div className="fb-stars">★★★★★</div>
              <div className="fb-count">
                {m0 ? `${(m0.vote_count / 1000).toFixed(0)}K ratings` : "2.4M ratings"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {TICKER_ITEMS.map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="td" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {[
          { num: "1M+",   lbl: "Movies & Shows" },
          { num: "500K+", lbl: "Active Users"   },
          { num: "50+",   lbl: "Genres"         },
        ].map((s) => (
          <div key={s.lbl} className="stat">
            <div className="stat__num">{s.num}</div>
            <div className="stat__label">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="feats" id="features">
        <div className="feats__head">
          <span>Why OopsMovies</span>
          <h2>Everything a <em>cinephile</em> needs</h2>
        </div>
        <div className="feats__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feats__card">
              <div className="fi">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="cta-band__inner">
          <h2>Your next favourite film <em>is one click away</em></h2>
          <p>Join thousands of movie lovers. Free forever, no credit card needed.</p>
          <div className="cta-btns">
            <Link to="/register" className="btn-hero" onClick={addRipple}>Create Free Account</Link>
            <Link to="/login"    className="btn-outline">Sign In</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="wfooter">
        <Link to="/" className="fl"><em>Oops</em>Movies</Link>
        <span className="fc">© 2026 OopsMovies · Powered by TMDB</span>
        <div className="flinks">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="/tmdb">TMDB</a>
        </div>
      </footer>
    </div>
  );
}