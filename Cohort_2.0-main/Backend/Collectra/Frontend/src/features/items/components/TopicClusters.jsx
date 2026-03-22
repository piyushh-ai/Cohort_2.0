import { useEffect, useRef, useState } from "react";
import { getTopicClustersAPI } from "../api/items.api";
import "../styles/TopicClusters.scss";

const TYPE_COLORS = {
  article:  { color: "#38bdf8", glow: "rgba(56,189,248,0.12)"  },
  video:    { color: "#fb7185", glow: "rgba(251,113,133,0.12)" },
  pdf:      { color: "#fbbf24", glow: "rgba(251,191,36,0.12)"  },
  image:    { color: "#34d399", glow: "rgba(52,211,153,0.12)"  },
  tweet:    { color: "#1d9bf0", glow: "rgba(29,155,240,0.12)"  },
  document: { color: "#a78bfa", glow: "rgba(167,139,250,0.12)" },
};

// Pick dominant color from first item in cluster
const getClusterAccent = (items) => {
  const type = items?.[0]?.type;
  return TYPE_COLORS[type] || { color: "#0ea5e9", glow: "rgba(14,165,233,0.12)" };
};

const TopicClusters = ({ onTopicClick }) => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading]   = useState(true);
  const hasFetched               = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchClusters = async () => {
      try {
        const res = await getTopicClustersAPI();
        setClusters(res.data || []);
      } catch {
        setClusters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClusters();
  }, []);

  if (loading) {
    return (
      <div className="topics-loading">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="topic-skeleton" style={{ animationDelay: `${i * 0.06}s` }} />
        ))}
      </div>
    );
  }

  if (clusters.length === 0) {
    return (
      <div className="topics-empty">
        <svg width="36" height="36" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
        </svg>
        <p>No topics yet</p>
        <span>Save more items with AI tags to see auto-generated topics</span>
      </div>
    );
  }

  return (
    <div className="topics-grid">
      {clusters.map((cluster) => {
        const accent = getClusterAccent(cluster.items);
        return (
          <div
            key={cluster.topic}
            className="topic-card"
            onClick={() => onTopicClick?.(cluster.topic)}
            style={{
              "--topic-color": accent.color,
              "--topic-glow":  accent.glow,
            }}
          >
            {/* 2×2 image mosaic */}
            <div className="topic-images">
              {cluster.items.slice(0, 4).map((item, i) => {
                const tc = TYPE_COLORS[item.type] || TYPE_COLORS.article;
                return (
                  <div key={i} className="topic-image-cell">
                    {item.image ? (
                      <img src={item.image} alt={item.title} loading="lazy" />
                    ) : (
                      <div
                        className="topic-image-placeholder"
                        style={{ background: tc.glow }}
                      >
                        <span style={{
                          color: tc.color,
                          fontSize: "9px",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.07em",
                        }}>
                          {item.type?.toUpperCase().slice(0, 3)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              {Array.from({ length: Math.max(0, 4 - cluster.items.length) }).map((_, i) => (
                <div key={`e-${i}`} className="topic-image-cell topic-image-cell--empty" />
              ))}
            </div>

            {/* Info row */}
            <div className="topic-info">
              <p className="topic-name">#{cluster.topic}</p>
              <span className="topic-count-pill">{cluster.count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopicClusters;