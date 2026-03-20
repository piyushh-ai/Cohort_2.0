 
import { Link } from "react-router-dom";
import "./FeaturesSection.scss";

// Feature card data
const FEATURES = [
  {
    id: 1,
    name: "Save Anything",
    desc: "Articles, videos, PDFs, tweets, images, documents — if it exists on the web, Collectra can save it in one click.",
    tags: ["article", "video", "pdf", "tweet", "image"],
    iconColor: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.12)",
    iconGlow: "rgba(56, 189, 248, 0.2)",
    cardBorder: "rgba(56, 189, 248, 0.2)",
    highlight: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17,21 17,13 7,13 7,21"/>
        <polyline points="7,3 7,8 15,8"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Smart Collections",
    desc: "Organize everything into color-coded collections. Filter by type, search across everything, and find what you need instantly.",
    tags: ["organize", "filter", "search"],
    iconColor: "#818cf8",
    iconBg: "rgba(129, 140, 248, 0.12)",
    iconGlow: "rgba(129, 140, 248, 0.2)",
    cardBorder: "rgba(129, 140, 248, 0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: "AI Highlights",
    desc: "Let AI read your saved content and extract the most important insights. Save highlights with personal notes attached.",
    tags: ["AI", "highlights", "insights"],
    iconColor: "#34d399",
    iconBg: "rgba(52, 211, 153, 0.12)",
    iconGlow: "rgba(52, 211, 153, 0.2)",
    cardBorder: "rgba(52, 211, 153, 0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: "Rediscover Content",
    desc: "Collectra resurfaces items you've forgotten about. Your vault works for you, bringing back gems from your past saves.",
    tags: ["resurface", "memory", "rediscover"],
    iconColor: "#f59e0b",
    iconBg: "rgba(245, 158, 11, 0.12)",
    iconGlow: "rgba(245, 158, 11, 0.2)",
    cardBorder: "rgba(245, 158, 11, 0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 9.1"/>
        <path d="M12 12V2"/>
      </svg>
    ),
  },
  {
    id: 5,
    name: "Related Items",
    desc: "Automatically see items related to what you're viewing. Navigate your knowledge graph and discover unexpected connections.",
    tags: ["related", "graph", "connections"],
    iconColor: "#f87171",
    iconBg: "rgba(248, 113, 113, 0.12)",
    iconGlow: "rgba(248, 113, 113, 0.2)",
    cardBorder: "rgba(248, 113, 113, 0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
  {
    id: 6,
    name: "File Upload",
    desc: "Not everything is a link. Upload PDFs, Word docs, and images directly. View them instantly with Google Docs viewer.",
    tags: ["PDF", "upload", "viewer"],
    iconColor: "#a78bfa",
    iconBg: "rgba(167, 139, 250, 0.12)",
    iconGlow: "rgba(167, 139, 250, 0.2)",
    cardBorder: "rgba(167, 139, 250, 0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      {/* Section Header */}
      <div className="features-header">
        <div className="features-label">Features</div>
        <h2 className="features-title">Everything your knowledge needs</h2>
        <p className="features-subtitle">
          A complete system to capture, organize, and revisit the content that makes you smarter.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="features-grid">
        {FEATURES.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${feature.highlight ? "feature-card--highlight" : ""}`}
            style={{
              "--card-color-dim": feature.iconBg,
              "--icon-color": feature.iconColor,
              "--icon-glow": feature.iconGlow,
              "--card-border": feature.cardBorder,
            }}
          >
            {/* Icon */}
            <div
              className="feature-icon-wrap"
              style={{ background: feature.iconBg }}
            >
              <span className="feature-icon" style={{ color: feature.iconColor }}>
                {feature.icon}
              </span>
            </div>

            {/* Text */}
            <div>
              <h3 className="feature-name">{feature.name}</h3>
            </div>
            <p className="feature-desc">{feature.desc}</p>

            {/* Tags */}
            <div className="feature-tags">
              {feature.tags.map((tag) => (
                <span key={tag} className="feature-tag">{tag}</span>
              ))}
            </div>

            {/* Arrow — appears on hover */}
            <div className="feature-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="features-cta-banner">
        <div className="features-cta-text">
          <p className="cta-banner-title">Ready to build your vault?</p>
          <p className="cta-banner-sub">Free forever. No credit card required.</p>
        </div>
        <Link to="/register">
          <button className="features-cta-btn">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
            </svg>
            Create free account
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturesSection;