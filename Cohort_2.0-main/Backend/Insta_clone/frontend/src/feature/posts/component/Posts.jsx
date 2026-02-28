import React, { useState } from "react";
import { UsePost } from "../hooks/UsePost";
import { timeAgo } from "../../shared/functions/FormatData";
import { useEffect } from "react";

const Posts = ({ user, post, handleLike, handleUnLike }) => {
  const [saved, setSaved] = useState(false);

  

  const handleSave = () => setSaved((prev) => !prev);
  return (
    <div className="post">
      {/* Header */}
      <div className="post__header">
        <div className="user">
          <div className="user__avatar-ring">
            <img src={user.profileImage} alt="user" className="user__avatar" />
          </div>
          <div className="user__info">
            <p className="user__name">{user.username}</p>
            <p className="user__location">New York, USA</p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="post__image-wrap">
        <img src={post.imgUrl} alt="post" className="post__image" />
        <div className="post__image-overlay" />
      </div>

      {/* Actions */}
      <div className="post__actions">
        <div className="post__actions-left">
          {/* Like */}
          <button
            className={`icon-btn like-btn ${post.isLiked ? "liked" : ""}`}
            onClick={() =>
              post.isLiked ? handleUnLike(post._id) : handleLike(post._id)
            }
            aria-label="Like"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill={post.isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s-6.716-4.534-9.192-7.01A5.5 5.5 0 1112 6.5a5.5 5.5 0 119.192 7.49C18.716 16.466 12 21 12 21z" />
            </svg>
          </button>

          {/* Comment */}
          <button className="icon-btn" aria-label="Comment">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4z" />
            </svg>
          </button>

          {/* Share */}
          <button className="icon-btn" aria-label="Share">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* Save */}
        <button
          className={`icon-btn save-btn ${saved ? "saved" : ""}`}
          onClick={handleSave}
          aria-label="Save"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2h12a1 1 0 011 1v19l-7-5-7 5V3a1 1 0 011-1z" />
          </svg>
        </button>
      </div>

      {/* Bottom */}
      <div className="post__bottom">
        <p className="post__caption">{post.caption}</p>
        <p className="post__comments">View all 42 comments</p>
        <p className="post__time">{timeAgo(post.createdAt)}</p>
      </div>
    </div>
  );
};

export default Posts;
