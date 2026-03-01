import React, { useEffect, useReducer, useCallback, useRef } from "react";
import "../styles/sidebar.scss";
import useUserHook from "../../userDetails/hooks/user.hook";

// ── State Management ─────────────────────────────────────────────
const initialState = {
  following: [],
  followers: [],
  suggested: [],
  loadingMap: {},   // { userId: true } during API call
  initialized: { following: false, followers: false, suggested: false },
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT_SECTION":
      return { ...state, [action.section]: action.users,
        initialized: { ...state.initialized, [action.section]: true } };

    case "FOLLOW_START":
      return { ...state, loadingMap: { ...state.loadingMap, [action.id]: true } };

    case "FOLLOW_SUCCESS": {
      const update = (list) =>
        list.map((u) => u.id === action.id ? { ...u, following: action.following } : u);
      return {
        ...state,
        following: update(state.following),
        followers: update(state.followers),
        suggested: update(state.suggested),
        loadingMap: { ...state.loadingMap, [action.id]: false },
      };
    }

    case "FOLLOW_FAILURE":
      // Rollback optimistic update
      return {
        ...state,
        following: state.following.map((u) =>
          u.id === action.id ? { ...u, following: action.originalFollowing } : u),
        followers: state.followers.map((u) =>
          u.id === action.id ? { ...u, following: action.originalFollowing } : u),
        suggested: state.suggested.map((u) =>
          u.id === action.id ? { ...u, following: action.originalFollowing } : u),
        loadingMap: { ...state.loadingMap, [action.id]: false },
      };

    default:
      return state;
  }
}

// ── Skeleton ─────────────────────────────────────────────────────
const SkeletonRows = ({ count = 3 }) => (
  <div className="sidebar-skeleton">
    {Array.from({ length: count }).map((_, i) => (
      <div className="sidebar-skeleton-row" key={i}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="skel-avatar" />
          <div className="skel-name" />
        </div>
        <div className="skel-btn" />
      </div>
    ))}
  </div>
);

// ── Empty State ───────────────────────────────────────────────────
const EmptyState = ({ icon, message }) => (
  <div className="sidebar-empty">
    <span className="sidebar-empty-icon">{icon}</span>
    <span className="sidebar-empty-text">{message}</span>
  </div>
);

// ── Avatar ───────────────────────────────────────────────────────
const Avatar = ({ src, username }) => (
  <div className="sidebar-avatar">
    {src
      ? <img src={src} alt={username} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      : (username?.[0] ?? "?").toUpperCase()
    }
  </div>
);

// ── Main Component ───────────────────────────────────────────────
const Sidebar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mountedRef = useRef(true);

  const {
    following: followingData,
    handleGetFollowing,
    follower: followerData,
    handleGetFollower,
    suggest: suggestData,
    handleGetSuggest,
    handleFollowUser,
    handleUnFollowUser,
  } = useUserHook();

  // Fetch on mount
  useEffect(() => {
    mountedRef.current = true;
    handleGetFollowing();
    handleGetFollower();
    handleGetSuggest();
    return () => { mountedRef.current = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync following data
  useEffect(() => {
    if (!followingData?.following) return;
    dispatch({
      type: "INIT_SECTION",
      section: "following",
      users: followingData.following.map((item) => ({
        id: item.following?._id,
        username: item.following?.username ?? "Unknown",
        avatar: item.following?.avatar ?? null,
        following: true,
        _id: item._id,
      })).filter((u) => u.id),
    });
  }, [followingData]);

  // Sync followers data
  useEffect(() => {
    if (!followerData || !Array.isArray(followerData)) return;
    dispatch({
      type: "INIT_SECTION",
      section: "followers",
      users: followerData.map((item) => ({
        id: item.follower?._id,
        username: item.follower?.username ?? "Unknown",
        avatar: item.follower?.avatar ?? null,
        following: false,
        _id: item._id,
      })).filter((u) => u.id),
    });
  }, [followerData]);

  // Sync suggested data
  useEffect(() => {
    if (!suggestData?.suggestions) return;
    dispatch({
      type: "INIT_SECTION",
      section: "suggested",
      users: suggestData.suggestions.map((user) => ({
        id: user._id,
        username: user.username ?? "Unknown",
        avatar: user.avatar ?? null,
        following: false,
        _id: user._id,
      })).filter((u) => u.id),
    });
  }, [suggestData]);

  // ── Follow / Unfollow Handler ──────────────────────────────────
  const handleToggleFollow = useCallback(async (user) => {
    if (state.loadingMap[user.id]) return; // prevent double click

    const wasFollowing = user.following;
    dispatch({ type: "FOLLOW_START", id: user.id });

    // Optimistic UI
    dispatch({ type: "FOLLOW_SUCCESS", id: user.id, following: !wasFollowing });

    try {
      if (wasFollowing) {
        await handleUnFollowUser(user.id);
      } else {
        await handleFollowUser(user.id);
      }
    } catch {
      if (mountedRef.current) {
        dispatch({ type: "FOLLOW_FAILURE", id: user.id, originalFollowing: wasFollowing });
      }
    }
  }, [state.loadingMap, handleFollowUser, handleUnFollowUser]);

  // ── User Row ───────────────────────────────────────────────────
  const UserRow = useCallback(({ user }) => {
    const isLoading = !!state.loadingMap[user.id];
    return (
      <div className="sidebar-user-row">
        <div className="sidebar-user-left">
          <Avatar src={user.avatar} username={user.username} />
          <span className="sidebar-username" title={user.username}>
            {user.username}
          </span>
        </div>
        <button
          className={`sidebar-follow-btn ${user.following ? "unfollow" : "follow"} ${isLoading ? "loading" : ""}`}
          onClick={() => handleToggleFollow(user)}
          disabled={isLoading}
          aria-label={`${user.following ? "Unfollow" : "Follow"} ${user.username}`}
        >
          {user.following ? "Unfollow" : "Follow"}
        </button>
      </div>
    );
  }, [state.loadingMap, handleToggleFollow]);

  // ── Section Renderer ───────────────────────────────────────────
  const Section = ({ title, users, initialized, emptyIcon, emptyMsg, countColor }) => (
    <div className="sidebar-section">
      <div className="sidebar-section-header">
        <h3 className="sidebar-section-title">{title}</h3>
        {initialized && users.length > 0 && (
          <span className="sidebar-section-count">{users.length}</span>
        )}
      </div>

      {!initialized ? (
        <SkeletonRows count={3} />
      ) : users.length === 0 ? (
        <EmptyState icon={emptyIcon} message={emptyMsg} />
      ) : (
        users.map((user) => <UserRow key={user._id ?? user.id} user={user} />)
      )}
    </div>
  );

  return (
    <aside className="sidebar" role="complementary" aria-label="Social sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-mark">Insta</div>
      </div>

      <Section
        title="Following"
        users={state.following}
        initialized={state.initialized.following}
        emptyMsg="You're not following anyone yet"
      />

      <Section
        title="Followers"
        users={state.followers}
        initialized={state.initialized.followers}
        emptyMsg="No followers yet"
      />

      <Section
        title="Suggested"
        users={state.suggested}
        initialized={state.initialized.suggested}
        emptyMsg="No suggestions right now"
      />
    </aside>
  );
};

export default Sidebar;