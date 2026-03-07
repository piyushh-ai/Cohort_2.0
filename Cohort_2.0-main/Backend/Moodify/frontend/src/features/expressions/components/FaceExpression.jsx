import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef      = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef     = useRef(null);

  const [expression, setExpression] = useState("Loading model…");
  const [detecting,  setDetecting]  = useState(false);
  const [ready,      setReady]      = useState(false);
  const [camError,   setCamError]   = useState(null);

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef })
      .then(() => {
        setReady(true);
        setExpression("Ready — click detect");
      })
      .catch((err) => {
        console.error("Camera / model init failed:", err);
        if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") {
          setCamError("Camera access denied. Please allow camera permission and refresh.");
        } else if (err?.name === "NotFoundError") {
          setCamError("No camera found on this device.");
        } else {
          setCamError(`Camera error: ${err?.message ?? err}`);
        }
        setExpression("Error");
      });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleClick = async () => {
    if (!ready || detecting) return;
    setDetecting(true);
    setExpression("Detecting…");
    const result = detect({ landmarkerRef, videoRef, setExpression });
    if (result) onClick(result);
    setTimeout(() => setDetecting(false), 600);
  };

  const MOOD_ICON = {
    happy:                  "😄",
    sad:                    "😢",
    surprised:              "😲",
    neutral:                "😐",
    "Detecting…":           "🔍",
    "Loading model…":       "⏳",
    "Ready — click detect": "📷",
    "No face found":        "🙈",
    "Not ready yet…":       "⏳",
    Error:                  "❌",
  };

  return (
    <div className="face-expr">
      {/* Camera error banner */}
      {camError && (
        <div className="face-error-banner">{camError}</div>
      )}

      {/* Video feed */}
      <div className="face-video-wrap">
        <video
          ref={videoRef}
          className="face-video"
          playsInline
          muted
        />
        {detecting && <div className="scan-line" />}
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      {/* Expression display */}
      <div className="face-result">
        <span className="face-emoji">{MOOD_ICON[expression] ?? "🎵"}</span>
        <span className="face-label">{expression}</span>
      </div>

      {/* Detect button */}
      <button
        className={`face-btn ${detecting ? "face-btn--detecting" : ""}`}
        onClick={handleClick}
        disabled={!ready || detecting || !!camError}
      >
        {detecting ? (
          <>
            <span className="face-btn-dot" />
            <span className="face-btn-dot" />
            <span className="face-btn-dot" />
          </>
        ) : (
          "Detect Expression"
        )}
      </button>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400;500;600&display=swap");

        .face-expr {
          text-align: center;
          font-family: 'Inter', sans-serif;
        }

        /* ── Error banner ── */
        .face-error-banner {
          background: rgba(255, 60, 60, 0.08);
          border: 1px solid rgba(255, 80, 80, 0.25);
          border-radius: 8px;
          color: #ff8080;
          font-size: 12px;
          letter-spacing: 0.02em;
          line-height: 1.6;
          padding: 12px 16px;
          margin-bottom: 16px;
          text-align: left;
        }

        /* ── Video wrap ── */
        .face-video-wrap {
          position: relative;
          display: inline-block;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.55);
          background: #0c0b10;
        }

        .face-video {
          width: 100%;
          max-width: 380px;
          min-height: 200px;     /* placeholder height before stream loads */
          display: block;
          border-radius: 12px;
        }

        /* ── Scan line ── */
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8f564, transparent);
          animation: fe-scan 1.2s linear infinite;
          pointer-events: none;
          z-index: 2;
          box-shadow: 0 0 10px rgba(200,245,100,0.65);
        }
        @keyframes fe-scan {
          0%   { top: 0%;   }
          100% { top: 100%; }
        }

        /* ── Corner brackets ── */
        .corner {
          position: absolute;
          width: 16px; height: 16px;
          pointer-events: none;
          z-index: 3;
        }
        .corner--tl { top: 8px;    left: 8px;  border-top:    2px solid rgba(201,169,110,0.55); border-left:   2px solid rgba(201,169,110,0.55); }
        .corner--tr { top: 8px;    right: 8px; border-top:    2px solid rgba(201,169,110,0.55); border-right:  2px solid rgba(201,169,110,0.55); }
        .corner--bl { bottom: 8px; left: 8px;  border-bottom: 2px solid rgba(201,169,110,0.55); border-left:   2px solid rgba(201,169,110,0.55); }
        .corner--br { bottom: 8px; right: 8px; border-bottom: 2px solid rgba(201,169,110,0.55); border-right:  2px solid rgba(201,169,110,0.55); }

        /* ── Result row ── */
        .face-result {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 16px 0 14px;
        }
        .face-emoji { font-size: 26px; line-height: 1; }
        .face-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: #f2ede4;
          letter-spacing: 0.06em;
          text-transform: capitalize;
        }

        /* ── Button ── */
        .face-btn {
          background: linear-gradient(135deg, #c9a96e 0%, #e8c98a 100%);
          color: #08060d;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          padding: 14px 36px;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s, box-shadow 0.3s, opacity 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 180px;
          justify-content: center;
        }
        .face-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(201,169,110,0.36);
        }
        .face-btn:active:not(:disabled) { transform: translateY(0); }
        .face-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .face-btn--detecting {
          background: linear-gradient(135deg, #1c1a26, #14121e);
          color: #c8f564;
        }

        /* ── Loading dots inside button ── */
        .face-btn-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
          animation: fe-dot 1.2s ease-in-out infinite;
        }
        .face-btn-dot:nth-child(2) { animation-delay: 0.2s; }
        .face-btn-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes fe-dot {
          0%,100% { opacity: 0.3; transform: scale(1);   }
          50%      { opacity: 1;   transform: scale(1.45); }
        }
      `}</style>
    </div>
  );
}