import "../components/Loader.scss"
import "../../features/items/styles/itemDetail.scss"
// ─── Main Page Loader ─────────────────────────────────────
export const PageLoader = () => (
  <div className="skeleton-card">
    <div className="skel-img" />
    <div className="skel-line" />
    <div className="skel-line short" />
    <div className="skel-line xshort" />
  </div>
);

// ─── Dots Loader (buttons ke liye) ───────────────────────
export const DotsLoader = () => (
  <div className="dots-loader">
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
  </div>
);

// ─── Bar Loader ───────────────────────────────────────────
export const BarLoader = () => (
  <div className="bar-loader">
    <div className="bar-fill" />
  </div>
);

// ─── Skeleton Card (items load hone tak) ─────────────────
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skel-img" />
    <div className="skel-line" />
    <div className="skel-line short" />
    <div className="skel-line xshort" />
  </div>
);

export const circleLoading = (
    <div className="detail-loading">
      <div className="brain-loader">
        <div className="brain-ring ring-1" />
        <div className="brain-ring ring-2" />
        <div className="brain-ring ring-3" />
        <div className="ring-center" />
      </div>
    </div>
  );
