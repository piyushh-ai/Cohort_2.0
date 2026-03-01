import React, { useState } from "react";
import "../styles/Feed.scss";
import Posts from "../component/Posts";
import { UsePost } from "../hooks/UsePost";
import Nav from "../../shared/components/Nav";
import Sidebar from "../component/Sidebar";
import CommentSection from "../component/CommentSection";
import Loader from "../../shared/components/Loader";

const Feed = () => {
  const {
    feed,
    loading,
    handleUnLike,
    handleLike,
    handleGetAllComments,
    allComments,
    handlePostComments,
    commentLoading,
    handelDeleteComment,
    handleDeletePost,
  } = UsePost();

  // Mobile bottom sheet state — tracks which post's comments are open
  const [mobileSheetPostId, setMobileSheetPostId] = useState(null);
  const [mobileCommentText, setMobileCommentText] = useState("");

  const openMobileSheet = (postId) => {
    setMobileSheetPostId(postId);
    handleGetAllComments(postId);
  };

  const closeMobileSheet = () => {
    setMobileSheetPostId(null);
    setMobileCommentText("");
  };

  const handleMobileCommentSubmit = () => {
    if (!mobileCommentText.trim() || !mobileSheetPostId) return;
    handlePostComments(mobileSheetPostId, mobileCommentText);
    setMobileCommentText("");
  };

  if (loading || !feed) {
    return (
      <main className="loaderDiv">
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <Nav />

      <div className="feed">
        {/* ── LEFT: sticky sidebar ──────────────────────── */}
        <aside className="feed-left">
          <Sidebar />
        </aside>

        {/* ── RIGHT: vertical stack of post rows ───────── */}
        <div className="post-div">
          {feed.map((posts) => (
            <div className="feed-row" key={posts._id}>

              {/* Post card */}
              <div className="feed-center">
                <Posts
                  Postuser={posts.user}
                  post={posts}
                  loading={loading}
                  handleUnLike={handleUnLike}
                  handleLike={handleLike}
                  allComments={allComments}
                  handleGetAllComments={handleGetAllComments}
                  handlePostComments={handlePostComments}
                  handleDeletePost={handleDeletePost}
                  onMobileCommentOpen={() => openMobileSheet(posts._id)}
                />
              </div>

              {/* Desktop comment panel */}
              <div className="feed-right">
                <CommentSection
                  loading={commentLoading}
                  comments={allComments[posts._id] || []}
                  handleGetAllComments={handleGetAllComments}
                  handleDeleteComment={handelDeleteComment}
                  postId={posts._id}
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Bottom Sheet ───────────────────────────── */}
      <div
        className={`mobile-comment-overlay ${mobileSheetPostId ? "open" : ""}`}
        onClick={closeMobileSheet}
      >
        <div
          className="mobile-comment-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sheet Header */}
          <div className="mobile-sheet-header">
            <h4>Comments</h4>
            <button onClick={closeMobileSheet} aria-label="Close comments">
              ✕
            </button>
          </div>

          {/* Comments list */}
          <div className="mobile-sheet-body">
            {mobileSheetPostId && (
              <CommentSection
                loading={commentLoading}
                comments={allComments[mobileSheetPostId] || []}
                handleGetAllComments={handleGetAllComments}
                handleDeleteComment={handelDeleteComment}
                postId={mobileSheetPostId}
              />
            )}
          </div>

          {/* Comment input pinned at bottom */}
          <div className="mobile-sheet-input">
            <input
              type="text"
              placeholder="Add a comment…"
              value={mobileCommentText}
              onChange={(e) => setMobileCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMobileCommentSubmit()}
            />
            <button
              className="comment-submit-btn"
              onClick={handleMobileCommentSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;  