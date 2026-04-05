import { useState, useEffect, useRef } from "react";
import useItems from "../hooks/useItems";
import "../styles/InsightsPanel.scss";

// ─── Type color/icon mapping ──────────────────────────────
const TYPE_META = {
  article: { label: "Articles", color: "#f97316", icon: "📄" },
  video: { label: "Videos", color: "#ef4444", icon: "🎬" },
  pdf: { label: "PDFs", color: "#10b981", icon: "📑" },
  image: { label: "Images", color: "#3b82f6", icon: "🖼️" },
  tweet: { label: "Tweets", color: "#06b6d4", icon: "🐦" },
  document: { label: "Documents", color: "#a855f7", icon: "📝" },
};

// ─── Site icon helper ─────────────────────────────────────
const getSiteIcon = (site) => {
  const s = site.toLowerCase();
  if (s.includes("youtube")) return "🎬";
  if (s.includes("github")) return "💻";
  if (s.includes("medium")) return "📝";
  if (s.includes("twitter") || s.includes("x.com")) return "🐦";
  if (s.includes("reddit")) return "🗣️";
  if (s.includes("stackoverflow")) return "💡";
  if (s.includes("linkedin")) return "💼";
  if (s.includes("dev.to")) return "👨‍💻";
  if (s.includes("notion")) return "📓";
  if (s.includes("figma")) return "🎨";
  if (s.includes("dribbble")) return "🏀";
  if (s.includes("wikipedia")) return "📚";
  return "🌐";
};

// ─── Animated counter ─────────────────────────────────────
const AnimatedCounter = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    let start = 0;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      setDisplay(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
};

// ─── Donut Chart (SVG) ────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  const size = 180;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="donut-container">
      <svg viewBox={`0 0 ${size} ${size}`} className="donut-svg">
        {data.map((item, i) => {
          const meta = TYPE_META[item.type] || { color: "#64748b" };
          const percent = item.count / total;
          const dashLength = circumference * percent;
          const currentOffset = offset;
          offset += dashLength;

          return (
            <circle
              key={item.type}
              className="donut-segment"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={meta.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              style={{
                animationDelay: `${i * 0.12}s`,
                filter: `drop-shadow(0 0 6px ${meta.color}55)`,
              }}
            />
          );
        })}
        {/* Center text */}
        <text
          x="50%"
          y="46%"
          textAnchor="middle"
          className="donut-center-value"
        >
          {total}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          className="donut-center-label"
        >
          total
        </text>
      </svg>
    </div>
  );
};

// ─── Main InsightsPanel ───────────────────────────────────
const InsightsPanel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchInsights } = useItems();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const result = await fetchInsights();
      if (!cancelled && result) setData(result);
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <InsightsSkeleton />;
  if (!data) {
    return (
      <div className="insights-empty">
        <span className="insights-empty-icon">📊</span>
        <p>Unable to load insights</p>
        <span>Try refreshing the page</span>
      </div>
    );
  }

  const maxSiteCount = data.siteBreakdown.length > 0
    ? Math.max(...data.siteBreakdown.map((s) => s.count))
    : 1;

  const maxTagCount = data.topTags.length > 0
    ? Math.max(...data.topTags.map((t) => t.count))
    : 1;

  // Build the last 30 days array for heatmap
  const activityMap = {};
  (data.recentActivity || []).forEach((d) => {
    activityMap[d.date] = d.count;
  });
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    last30Days.push({ date: key, count: activityMap[key] || 0 });
  }
  const maxActivity = Math.max(...last30Days.map((d) => d.count), 1);

  return (
    <div className="insights-panel">
      {/* Header */}
      <div className="insights-header">
        <div className="insights-header-left">
          <span className="insights-header-icon">📊</span>
          <div>
            <h2 className="insights-title">Collection Insights</h2>
            <p className="insights-subtitle">
              Your knowledge base at a glance
            </p>
          </div>
        </div>
        <button
          className="insights-refresh-btn"
          onClick={async () => {
            setLoading(true);
            const result = await fetchInsights();
            if (result) setData(result);
            setLoading(false);
          }}
          title="Refresh"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
          </svg>
        </button>
      </div>

      {/* Hero Stats */}
      <div className="stats-grid">
        <div className="stat-card stat-card--orange">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <span className="stat-value">
              <AnimatedCounter value={data.totalItems} />
            </span>
            <span className="stat-label">Total Items</span>
          </div>
          <div className="stat-glow" />
        </div>
        <div className="stat-card stat-card--rose">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <span className="stat-value">
              <AnimatedCounter value={data.totalFavorites} />
            </span>
            <span className="stat-label">Favorites</span>
          </div>
          <div className="stat-glow" />
        </div>
        <div className="stat-card stat-card--emerald">
          <div className="stat-icon">✨</div>
          <div className="stat-info">
            <span className="stat-value">
              <AnimatedCounter value={data.totalHighlights} />
            </span>
            <span className="stat-label">Highlights</span>
          </div>
          <div className="stat-glow" />
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-icon">📁</div>
          <div className="stat-info">
            <span className="stat-value">
              <AnimatedCounter value={data.totalCollections} />
            </span>
            <span className="stat-label">Collections</span>
          </div>
          <div className="stat-glow" />
        </div>
      </div>

      {/* Streak section */}
      <div className="streak-section">
        <div className="streak-card streak-card--current">
          <span className="streak-flame">🔥</span>
          <span className="streak-num">{data.streak.current}</span>
          <span className="streak-label">Day Streak</span>
        </div>
        <div className="streak-card streak-card--longest">
          <span className="streak-flame">🏆</span>
          <span className="streak-num">{data.streak.longest}</span>
          <span className="streak-label">Longest Streak</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="insights-two-col">
        {/* Content Type Donut */}
        <div className="insights-card insights-card--donut">
          <h3 className="card-title">
            <span className="card-title-icon">🎯</span>
            Content Types
          </h3>
          <div className="donut-layout">
            <DonutChart data={data.typeBreakdown} />
            <div className="donut-legend">
              {data.typeBreakdown.map((item) => {
                const meta = TYPE_META[item.type] || {
                  label: item.type,
                  color: "#64748b",
                  icon: "📄",
                };
                return (
                  <div key={item.type} className="legend-item">
                    <span
                      className="legend-dot"
                      style={{ background: meta.color }}
                    />
                    <span className="legend-label">
                      {meta.icon} {meta.label}
                    </span>
                    <span className="legend-count">{item.count}</span>
                    <span
                      className="legend-pct"
                      style={{ color: meta.color }}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sites Breakdown */}
        <div className="insights-card insights-card--sites">
          <h3 className="card-title">
            <span className="card-title-icon">🌐</span>
            Top Sources
          </h3>
          {data.siteBreakdown.length === 0 ? (
            <p className="card-empty">No site data yet</p>
          ) : (
            <div className="site-bars">
              {data.siteBreakdown.map((site, i) => {
                const barColors = [
                  "#f97316", "#ef4444", "#10b981", "#3b82f6",
                  "#a855f7", "#06b6d4", "#ec4899", "#eab308",
                  "#14b8a6", "#8b5cf6",
                ];
                const color = barColors[i % barColors.length];
                const width = (site.count / maxSiteCount) * 100;
                return (
                  <div key={site.site} className="site-bar-row">
                    <div className="site-bar-info">
                      <span className="site-bar-icon">
                        {getSiteIcon(site.site)}
                      </span>
                      <span className="site-bar-name">{site.site}</span>
                      <span className="site-bar-count">{site.count}</span>
                    </div>
                    <div className="site-bar-track">
                      <div
                        className="site-bar-fill"
                        style={{
                          width: `${width}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}88)`,
                          boxShadow: `0 0 12px ${color}44`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="insights-card insights-card--activity">
        <h3 className="card-title">
          <span className="card-title-icon">📈</span>
          30-Day Activity
        </h3>
        <div className="activity-grid">
          {last30Days.map((day, i) => {
            const intensity = day.count / maxActivity;
            const isToday = day.date === new Date().toISOString().split("T")[0];
            return (
              <div
                key={day.date}
                className={`activity-cell${isToday ? " today" : ""}`}
                style={{
                  animationDelay: `${i * 0.02}s`,
                }}
                title={`${day.date}: ${day.count} item${day.count !== 1 ? "s" : ""}`}
              >
                <div
                  className="activity-cell-fill"
                  style={{
                    opacity: day.count === 0 ? 0.08 : 0.2 + intensity * 0.8,
                    background:
                      day.count === 0
                        ? "rgba(255,255,255,0.06)"
                        : intensity > 0.7
                        ? "#f97316"
                        : intensity > 0.4
                        ? "#10b981"
                        : "#3b82f6",
                  }}
                />
                {day.count > 0 && (
                  <span className="activity-cell-num">{day.count}</span>
                )}
                <span className="activity-cell-date">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Tags */}
      <div className="insights-card insights-card--tags">
        <h3 className="card-title">
          <span className="card-title-icon">🏷️</span>
          Top Tags
        </h3>
        {data.topTags.length === 0 ? (
          <p className="card-empty">No tags yet</p>
        ) : (
          <div className="tag-cloud">
            {data.topTags.map((tag, i) => {
              const tagColors = [
                "#f97316", "#ef4444", "#10b981", "#3b82f6",
                "#a855f7", "#06b6d4", "#ec4899", "#eab308",
                "#14b8a6", "#8b5cf6", "#f43f5e", "#22c55e",
              ];
              const color = tagColors[i % tagColors.length];
              const scale = 0.75 + (tag.count / maxTagCount) * 0.5;
              return (
                <span
                  key={tag.tag}
                  className="tag-chip"
                  style={{
                    borderColor: `${color}44`,
                    background: `${color}15`,
                    color: color,
                    fontSize: `${Math.max(11, Math.min(15, 11 + scale * 4))}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  #{tag.tag}
                  <span className="tag-chip-count">{tag.count}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Most Viewed */}
      {data.mostViewed && data.mostViewed.length > 0 && (
        <div className="insights-card insights-card--viewed">
          <h3 className="card-title">
            <span className="card-title-icon">👁️</span>
            Most Viewed
          </h3>
          <div className="most-viewed-list">
            {data.mostViewed.map((item, i) => {
              const rankColors = ["#f97316", "#ef4444", "#10b981", "#3b82f6", "#a855f7"];
              return (
                <div key={item._id} className="viewed-item">
                  <span
                    className="viewed-rank"
                    style={{ background: `${rankColors[i]}22`, color: rankColors[i] }}
                  >
                    #{i + 1}
                  </span>
                  <div className="viewed-info">
                    <span className="viewed-title">
                      {item.title?.length > 50
                        ? item.title.slice(0, 50) + "…"
                        : item.title || "Untitled"}
                    </span>
                    <span className="viewed-meta">
                      {TYPE_META[item.type]?.icon || "📄"} {item.siteName || item.type}
                    </span>
                  </div>
                  <span className="viewed-count">
                    {item.viewCount}
                    <small>views</small>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────
const InsightsSkeleton = () => (
  <div className="insights-panel insights-skeleton">
    <div className="insights-header">
      <div className="skel-block" style={{ width: 200, height: 20 }} />
    </div>
    <div className="stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="stat-card stat-card--skeleton">
          <div className="skel-block" style={{ width: 40, height: 40, borderRadius: 12 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="skel-block" style={{ width: 60, height: 24 }} />
            <div className="skel-block" style={{ width: 80, height: 12 }} />
          </div>
        </div>
      ))}
    </div>
    <div className="insights-two-col">
      <div className="insights-card" style={{ minHeight: 240 }}>
        <div className="skel-block" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="insights-card" style={{ minHeight: 240 }}>
        <div className="skel-block" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  </div>
);

export default InsightsPanel;
