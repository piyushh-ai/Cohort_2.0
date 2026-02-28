import React from "react";
import "./commentSection.scss";

const CommentSection = () => {
  return (
    <div className="comment-section">
      {/* {comments.map((comment, index) => ( */}
        <div className="comment-item" >
          <div className="comment-left">
            <div className="avatar">dsfdsf</div>
          </div>

          <div className="comment-right">
            <h4 className="username">piyush</h4>
            <p className="comment-text">nice</p>
            <div className="divider"></div>
          </div>
        </div>
    {/* //   ))} */}
    </div>
  );
};

export default CommentSection;