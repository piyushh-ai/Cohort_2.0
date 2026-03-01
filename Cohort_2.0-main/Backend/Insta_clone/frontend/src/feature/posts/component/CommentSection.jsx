import React, { useEffect } from "react";
import "../styles/commentSection.scss";
import Loader from "../../shared/components/Loader";
import { useAuth } from "../../auth/hooks/useAuth";

const CommentSection = ({
  loading,
  comments = [],
  handleGetAllComments,
  postId,
  handleDeleteComment,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    if (postId) {
      handleGetAllComments(postId);
    }
  }, [postId]);

  const userId = user?.id;

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "24px" }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet</p>
      ) : (
        comments.map((comment, i) => (
          <div className="comment-item" key={comment._id}>
            <div className="comment-left">
              <div className="avatar">
                <img src={comment.user?.avatar} alt="" />
              </div>
            </div>

            <div className="comment-right">
              <h4 className="username">{comment.user?.username || "user"}</h4>
              <p className="comment-text">{comment.comment}</p>
              {i < comments.length - 1 && <div className="divider" />}
            </div>

            {comment.user?._id?.toString() === userId?.toString() && (
              <button
                className="comment-delete-btn"
                onClick={() => handleDeleteComment(postId, comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
