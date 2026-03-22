import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import AddItemModal from "../components/AddItemModal";
import TopicClusters from "../components/TopicClusters";
import useItems from "../hooks/useItems";
import "../styles/Dashboard.scss";
import "../styles/_variables.scss";
import Sidebar from "../../collections/components/Sidebar";
import useCollections from "../../collections/hooks/useCollections";

const SkeletonGrid = ({ count = 6 }) => (
  <div className="items-grid">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="skeleton-card"
        style={{ animationDelay: `${i * 0.06}s` }}
      >
        <div className="skel-img" />
        <div
          style={{
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div className="skel-line" />
          <div className="skel-line short" />
        </div>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [resurfaceDismissed, setResurfaceDismissed] = useState(false);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSemanticMode, setIsSemanticMode] = useState(false);
  const [semanticLoading, setSemanticLoading] = useState(false);
  const [activeView, setActiveView] = useState("items");
  const [activeTags, setActiveTags] = useState(null);
  const refreshTopicsRef = useRef(null);

  const {
    items,
    loading,
    pagination,
    fetchItems,
    resurfaceItems,
    fetchResurfaceItems,
    semanticSearch,
  } = useItems();
  const { fetchCollections } = useCollections();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extToken = params.get("ext_token");
    if (extToken) {
      localStorage.setItem("collectra_token", extToken);
      window.history.replaceState({}, "", window.location.pathname);
    }
    fetchCollections();
    fetchResurfaceItems();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchItems({ page: 1, limit: 20 });
        if (refreshTopicsRef.current) refreshTopicsRef.current();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPage(1);
  }, [activeFilter, searchQuery, activeTags]);

  useEffect(() => {
    if (isSemanticMode) return;
    const params = { page, limit: 20 };
    if (searchQuery) params.search = searchQuery;
    if (activeTags) params.tags = activeTags;
    if (activeFilter === "favorites") {
      params.isFavorite = true;
    } else if (activeFilter !== "all" && !activeFilter.startsWith("topic:")) {
      const types = ["article", "video", "pdf", "image", "tweet", "document"];
      if (types.includes(activeFilter)) params.type = activeFilter;
      else params.collectionId = activeFilter;
    }
    fetchItems(params);
  }, [activeFilter, searchQuery, page, isSemanticMode, activeTags]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (val) => {
    setIsSemanticMode(false);
    setActiveView("items");
    setActiveTags(null);
    setSearchQuery(val);
    setPage(1);
  };

  const handleSemanticSearch = async (query) => {
    setIsSemanticMode(true);
    setActiveView("items");
    setActiveTags(null);
    setSemanticLoading(true);
    await semanticSearch(query);
    setSemanticLoading(false);
  };

  const handleClearSemantic = () => {
    setIsSemanticMode(false);
    setActiveTags(null);
    fetchItems({ page: 1, limit: 20 });
  };

  const handleFilterChange = (f) => {
    if (f.startsWith("topic:")) {
      const tag = f.replace("topic:", "").toLowerCase();
      setActiveView("items");
      setIsSemanticMode(false);
      setSearchQuery("");
      setActiveFilter(`topic:${tag}`);
      setActiveTags(tag);
      setPage(1);
      setSidebarOpen(false);
      return;
    }
    setActiveView("items");
    setActiveFilter(f);
    setActiveTags(null);
    setPage(1);
    setSidebarOpen(false);
    setIsSemanticMode(false);
  };

  const showResurface =
    activeFilter === "all" &&
    !searchQuery &&
    !isSemanticMode &&
    !activeTags &&
    !resurfaceDismissed &&
    (resurfaceItems || []).length > 0 &&
    activeView === "items";

  return (
    <div className="dashboard">
      {/* ── Ambient background orbs ── */}
      <div className="dash-ambient" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ── Navbar ── */}
      <Navbar
        onAddItem={() => setAddItemOpen(true)}
        onSearch={handleSearch}
        onSemanticSearch={handleSemanticSearch}
        semanticLoading={semanticLoading}
        onMenuToggle={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
      />

      {/* ── View Toggle ── */}
      <div className="view-toggle">
        <button
          className={`view-toggle-btn${activeView === "items" ? " active" : ""}`}
          onClick={() => setActiveView("items")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
          </svg>
          All Items
        </button>
        <button
          className={`view-toggle-btn${activeView === "topics" ? " active" : ""}`}
          onClick={() => setActiveView("topics")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
          </svg>
          Topics
        </button>
      </div>

      {/* ── Body ── */}
      <div className="dashboard-body">
        {/* Mobile backdrop — closes sidebar on tap */}
        <div
          className={`sidebar-backdrop${sidebarOpen ? " visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── SIDEBAR FIX: pass className directly so sidebar--open works ── */}
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onTopicsRefresh={(fn) => {
            refreshTopicsRef.current = fn;
          }}
        />

        {/* ── Main ── */}
        <main className="dashboard-main">
          {activeView === "topics" ? (
            <TopicClusters
              onTopicClick={(tag) => {
                const t = tag.toLowerCase();
                setActiveView("items");
                setIsSemanticMode(false);
                setSearchQuery("");
                setActiveFilter(`topic:${t}`);
                setActiveTags(t);
                setPage(1);
              }}
            />
          ) : (
            <>
              {activeTags && (
                <div className="semantic-results-header">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492z" />
                  </svg>
                  <span>#{activeTags}</span>
                  <span className="semantic-count">
                    {(items || []).length} items
                  </span>
                  <button
                    className="semantic-clear"
                    onClick={() => setActiveTags(null)}
                  >
                    Clear
                  </button>
                </div>
              )}

              {isSemanticMode && (items || []).length > 0 && (
                <div className="semantic-results-header">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
                  </svg>
                  <span>AI Search Results</span>
                  <span className="semantic-count">
                    {(items || []).length} matches
                  </span>
                  <button
                    className="semantic-clear"
                    onClick={handleClearSemantic}
                  >
                    Clear
                  </button>
                </div>
              )}

              {showResurface && (
                <div className="resurface-section">
                  <div className="resurface-header">
                    <div className="resurface-title-group">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="resurface-icon"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                      <span className="resurface-title">Rediscover</span>
                      <span className="resurface-subtitle">
                        Items you haven&apos;t seen in a while
                      </span>
                    </div>
                    <button
                      className="resurface-dismiss"
                      onClick={() => setResurfaceDismissed(true)}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </div>
                  <div className="resurface-grid">
                    {resurfaceItems.map((item, i) => (
                      <ItemCard key={item._id} item={item} index={i} />
                    ))}
                  </div>
                  <div className="resurface-divider">
                    <span>All Items</span>
                  </div>
                </div>
              )}

              {loading ? (
                <SkeletonGrid />
              ) : (items || []).length === 0 ? (
                <div className="empty-state">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  <p>
                    {isSemanticMode
                      ? "No matches found"
                      : activeTags
                        ? `No items for #${activeTags}`
                        : "Nothing here yet"}
                  </p>
                  <span>
                    {isSemanticMode
                      ? "Try a different query"
                      : activeTags
                        ? "Try a different topic"
                        : 'Hit "Add Item" to start'}
                  </span>
                </div>
              ) : (
                <>
                  {/* ── KEY FIX: pass index prop to every ItemCard for staggered animation ── */}
                  <div className="items-grid">
                    {(items || []).map((item, i) => (
                      <ItemCard key={item._id} item={item} index={i} />
                    ))}
                  </div>

                  {!isSemanticMode && pagination.totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="page-btn"
                        onClick={() => setPage((p) => p - 1)}
                        disabled={!pagination.hasPrevPage}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                        Prev
                      </button>
                      <div className="page-numbers">
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1,
                        )
                          .filter(
                            (p) =>
                              p === 1 ||
                              p === pagination.totalPages ||
                              Math.abs(p - page) <= 1,
                          )
                          .reduce((acc, p, idx, arr) => {
                            if (idx > 0 && p - arr[idx - 1] > 1)
                              acc.push("...");
                            acc.push(p);
                            return acc;
                          }, [])
                          .map((p, idx) =>
                            p === "..." ? (
                              <span key={`e-${idx}`} className="page-ellipsis">
                                …
                              </span>
                            ) : (
                              <button
                                key={p}
                                className={`page-num${page === p ? " active" : ""}`}
                                onClick={() => setPage(p)}
                              >
                                {p}
                              </button>
                            ),
                          )}
                      </div>
                      <button
                        className="page-btn"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={!pagination.hasNextPage}
                      >
                        Next
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="mobile-bottom-nav">
        <div className="mob-nav-inner">
          <button
            className={`mob-nav-item${activeView === "items" && activeFilter === "all" ? " mob-active" : ""}`}
            onClick={() => {
              setActiveView("items");
              setActiveFilter("all");
              setActiveTags(null);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
            </svg>
            <span>Home</span>
          </button>
          <button
            className={`mob-nav-item${activeView === "topics" ? " mob-active" : ""}`}
            onClick={() => setActiveView("topics")}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
            </svg>
            <span>Topics</span>
          </button>
          <button className="mob-add-btn" onClick={() => setAddItemOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z" />
            </svg>
          </button>
          <button
            className={`mob-nav-item${activeFilter === "favorites" ? " mob-active" : ""}`}
            onClick={() => {
              setActiveView("items");
              handleFilterChange("favorites");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span>Saved</span>
          </button>
          <button className="mob-nav-item" onClick={() => setSidebarOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
            </svg>
            <span>Browse</span>
          </button>
        </div>
      </nav>

      <AddItemModal
        isOpen={addItemOpen}
        onClose={() => setAddItemOpen(false)}
        onSuccess={() => {
          if (refreshTopicsRef.current) refreshTopicsRef.current();
        }}
      />
    </div>
  );
};

export default Dashboard;
