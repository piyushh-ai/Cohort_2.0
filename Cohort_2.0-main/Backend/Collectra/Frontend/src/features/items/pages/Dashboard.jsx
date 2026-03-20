import { useState, useEffect } from "react";
import Navbar       from "../components/Navbar";
import ItemCard     from "../components/ItemCard";
import AddItemModal from "../components/AddItemModal";
import useItems     from "../hooks/useItems";
import "../styles/Dashboard.scss";
import "../styles/_variables.scss";
import Sidebar           from "../../collections/components/Sidebar";
import useCollections    from "../../collections/hooks/useCollections";

// ─── Skeleton Loading Grid ────────────────────────────────
const SkeletonGrid = ({ count = 6 }) => (
  <div className="items-grid">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="skeleton-card">
        <div className="skel-img" />
        <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="skel-line" />
          <div className="skel-line short" />
        </div>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [activeFilter,       setActiveFilter]       = useState("all");
  const [searchQuery,        setSearchQuery]        = useState("");
  const [addItemOpen,        setAddItemOpen]        = useState(false);
  const [resurfaceDismissed, setResurfaceDismissed] = useState(false);
  const [page,               setPage]               = useState(1);
  const [sidebarOpen,        setSidebarOpen]        = useState(false);

  const { items, loading, pagination, fetchItems, resurfaceItems, fetchResurfaceItems } = useItems();
  const { fetchCollections } = useCollections();

  // Close sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  useEffect(() => {
    fetchCollections();
    fetchResurfaceItems();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    const params = { page, limit: 20 };
    if (searchQuery) params.search = searchQuery;

    if (activeFilter === "favorites") {
      params.isFavorite = true;
    } else if (activeFilter !== "all") {
      const types = ["article", "video", "pdf", "image", "tweet", "document"];
      if (types.includes(activeFilter)) {
        params.type = activeFilter;
      } else {
        params.collectionId = activeFilter;
      }
    }

    fetchItems(params);
  }, [activeFilter, searchQuery, page]);

  const showResurface =
    activeFilter === "all" &&
    !searchQuery &&
    !resurfaceDismissed &&
    resurfaceItems.length > 0;

  const handleFilterChange = (f) => {
    setActiveFilter(f);
    setPage(1);
    setSidebarOpen(false); // always close sidebar on filter select (mobile)
  };

  return (
    <div className="dashboard">
      {/* ── Navbar ── */}
      <Navbar
        onAddItem={() => setAddItemOpen(true)}
        onSearch={(val) => { setSearchQuery(val); setPage(1); }}
        onMenuToggle={() => setSidebarOpen(p => !p)}
        sidebarOpen={sidebarOpen}
      />

      <div className="dashboard-body">
        {/* ── Backdrop overlay (mobile) ── */}
        <div
          className={`sidebar-backdrop${sidebarOpen ? " visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── Sidebar ── */}
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          isOpen={sidebarOpen}
        />

        {/* ── Main Feed ── */}
        <main className="dashboard-main">

          {/* Resurface / Rediscover */}
          {showResurface && (
            <div className="resurface-section">
              <div className="resurface-header">
                <div className="resurface-title-group">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="resurface-icon">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>
                  <span className="resurface-title">Rediscover</span>
                  <span className="resurface-subtitle">Items you haven't seen in a while</span>
                </div>
                <button
                  className="resurface-dismiss"
                  onClick={() => setResurfaceDismissed(true)}
                  title="Dismiss"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
              <div className="resurface-grid">
                {resurfaceItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
              <div className="resurface-divider">
                <span>All Items</span>
              </div>
            </div>
          )}

          {/* Items Grid */}
          {loading ? (
            <SkeletonGrid />
          ) : items.length === 0 ? (
            <div className="empty-state">
              <svg width="44" height="44" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
              </svg>
              <p>Nothing here yet</p>
              <span>Hit "Add Item" to start building your vault</span>
            </div>
          ) : (
            <>
              <div className="items-grid">
                {items.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={!pagination.hasPrevPage}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    Prev
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter((p) =>
                        p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1
                      )
                      .reduce((acc, p, idx, arr) => {
                        if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === "..." ? (
                          <span key={`e-${idx}`} className="page-ellipsis">…</span>
                        ) : (
                          <button
                            key={p}
                            className={`page-num ${page === p ? "active" : ""}`}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </button>
                        )
                      )}
                  </div>

                  <button
                    className="page-btn"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={addItemOpen}
        onClose={() => setAddItemOpen(false)}
      />
    </div>
  );
};

export default Dashboard;