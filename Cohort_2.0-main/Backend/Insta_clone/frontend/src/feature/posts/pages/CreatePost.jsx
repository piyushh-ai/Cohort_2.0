import React, { useState, useRef } from "react";
import "../styles/createPost.scss";
import { UsePost } from "../hooks/UsePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const fileRef = useRef();

  const { loading, handleCreatePost } = UsePost();

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!file) return alert("Please select an image");

    handleCreatePost(file, caption);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div className="createPost">
      <div className="form-container">
        <h1>
          Create <span>Post</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Upload Area */}
          <div className="upload-area">
            <input
              ref={fileRef}
              type="file"
              name="postImage"
              id="postImage"
              accept="image/*"
              onChange={handleFile}
            />
            {!preview ? (
              <>
                <span className="upload-icon">🖼️</span>
                <p className="upload-text">
                  <strong>Click to upload</strong> or drag & drop
                </p>
                <p
                  className="upload-text"
                  style={{ fontSize: "0.78rem", marginTop: "-0.4rem" }}
                >
                  PNG, JPG, WEBP up to 10MB
                </p>
              </>
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="image-preview visible"
              />
            )}
          </div>

          {/* Caption Input */}
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Write a caption…"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Submit */}
          <button className="primery button" type="submit">
            Share Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
