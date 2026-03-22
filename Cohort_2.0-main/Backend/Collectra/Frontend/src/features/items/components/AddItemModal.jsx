import { useState, useRef } from "react";
import useItems from "../hooks/useItems";
import "../styles/AddItemModal.scss";
import "../styles/_variables.scss";
import useCollections from "../../collections/hooks/useCollections";

const AddItemModal = ({ isOpen, onClose, onSuccess }) => {
  const { createItem, loading } = useItems();
  const { collections }         = useCollections();

  const [mode, setMode]               = useState("url");
  const [url, setUrl]                 = useState("");
  const [file, setFile]               = useState(null);
  const [collectionId, setCollectionId] = useState("");
  const [error, setError]             = useState(null);
  const [dragOver, setDragOver]       = useState(false);
  const fileInputRef                  = useRef(null);

  const ACCEPTED_TYPES = [
    "image/jpeg","image/png","image/webp","image/gif",
    "application/pdf","application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const FILE_ICONS = {
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError("File type not supported. Use PDF, Word, or images.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.");
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();

    if (mode === "url") {
      if (!url.trim()) { setError("Please enter a URL."); return; }
      formData.append("url", url.trim());
    } else {
      if (!file) { setError("Please select a file."); return; }
      formData.append("file", file);
    }

    if (collectionId) formData.append("collectionId", collectionId);

    const result = await createItem(formData);
    if (result) {
      handleClose();
      // ✅ AI background mein ~3-5 sec mein tags banata hai
      // Isliye 3 baar refresh karo — turant, 4 sec baad, 8 sec baad
      if (onSuccess) {
        onSuccess(result);                          // turant
        setTimeout(() => onSuccess(result), 4000); // 4 sec baad
        setTimeout(() => onSuccess(result), 8000); // 8 sec baad (fallback)
      }
    }
  };

  const handleClose = () => {
    setUrl(""); setFile(null); setCollectionId("");
    setError(null); setDragOver(false); setMode("url");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Save something new</h2>
          <button className="modal-close" onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab ${mode === "url" ? "active" : ""}`}
            onClick={() => { setMode("url"); setError(null); setFile(null); }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
            </svg>
            URL
          </button>
          <button
            className={`modal-tab ${mode === "file" ? "active" : ""}`}
            onClick={() => { setMode("file"); setError(null); setUrl(""); }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            File Upload
          </button>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>

          {error && (
            <div className="modal-error">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* URL input */}
          {mode === "url" && (
            <div className="form-group">
              <label>Paste a URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => { setError(null); setUrl(e.target.value); }}
                placeholder="https://example.com/article"
                autoFocus
              />
            </div>
          )}

          {/* File dropzone */}
          {mode === "file" && (
            <div
              className={`file-dropzone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                style={{ display: "none" }}
              />

              {file ? (
                <div className="file-selected">
                  <div className="file-icon-box">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                      />
                    ) : (
                      <span>{FILE_ICONS[file.type] || "FILE"}</span>
                    )}
                  </div>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    className="file-remove"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="dropzone-placeholder">
                  <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  <p>Drag & drop or <span>browse files</span></p>
                  <p className="dropzone-hint">PDF · Word · Images · up to 10MB</p>
                </div>
              )}
            </div>
          )}

          {/* Collection selector */}
          <div className="form-group">
            <label>
              Collection <span className="optional">(optional)</span>
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option value="">No Collection</option>
              {collections.map((col) => (
                <option key={col._id} value={col._id}>{col.name}</option>
              ))}
            </select>
          </div>

          {/* Footer buttons */}
          <div className="modal-footer">
            <button type="button" className="modal-cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Save to vault →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;