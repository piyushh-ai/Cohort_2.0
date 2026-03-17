 
import "./HowItWorks.scss";

const STEPS = [
  {
    number: "01",
    title: "Save in one click",
    desc: "Paste a URL, drag a file, or use the browser extension. Collectra instantly fetches the title, description, thumbnail, and type — no manual work needed.",
    hint: "supports 12+ content types",
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.08)",
    border: "rgba(56, 189, 248, 0.2)",
    glow: "rgba(56, 189, 248, 0.15)",
    visual: "1",
  },
  {
    number: "02",
    title: "Organize into collections",
    desc: "Create color-coded collections for any topic. Drag items in, filter by content type, and search across your entire vault in milliseconds.",
    hint: "unlimited collections",
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.08)",
    border: "rgba(129, 140, 248, 0.2)",
    glow: "rgba(129, 140, 248, 0.15)",
    visual: "2",
  },
  {
    number: "03",
    title: "Generate AI highlights",
    desc: "Open any saved item and let AI extract the key insights. Pick the highlights that matter, add a personal note, and build your own knowledge layer.",
    hint: "powered by Claude AI",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.2)",
    glow: "rgba(52, 211, 153, 0.15)",
    visual: "3",
  },
  {
    number: "04",
    title: "Rediscover what matters",
    desc: "Collectra resurfaces items you saved weeks or months ago. Your old bookmarks stop dying — they become part of a living, breathing knowledge system.",
    hint: "smart resurfacing algorithm",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
    glow: "rgba(245, 158, 11, 0.15)",
    visual: "4",
  },
];

// Inline mini visual components for each step
const StepVisual = ({ id }) => {
  if (id === "1") {
    return (
      <div className="how-visual-1">
        <div className="visual-url-bar">
          <span className="url-text">https://openai.com/research/gpt-4...</span>
          <span className="url-save-btn">Save</span>
        </div>
        <div className="visual-item-preview">
          <div className="preview-img-strip" />
          <div className="preview-text-lines">
            <div className="line line--full" />
            <div className="line line--med" />
            <div className="line line--sm" />
          </div>
        </div>
      </div>
    );
  }

  if (id === "2") {
    const chips = [
      { color: "#38bdf8" },
      { color: "#818cf8" },
      { color: "#34d399" },
      { color: "#f59e0b" },
    ];
    return (
      <div className="how-visual-2">
        {chips.map((chip, i) => (
          <div key={i} className="collection-chip">
            <div className="chip-dot" style={{ background: chip.color }} />
            <div className="chip-label" />
          </div>
        ))}
      </div>
    );
  }

  if (id === "3") {
    return (
      <div className="how-visual-3">
        <div className="ai-pill">
          <div className="ai-dot" />
          <span className="ai-text">AI analyzing...</span>
        </div>
        <div className="ai-highlight-block">
          <div className="highlight-line" />
          <div className="highlight-line" />
          <div className="highlight-line highlight-line--short" />
        </div>
      </div>
    );
  }

  if (id === "4") {
    return (
      <div className="how-visual-4">
        <div className="resurface-label">Rediscover</div>
        <div className="resurface-card">
          <div className="resurface-card-img" />
          <div className="resurface-lines">
            <div className="r-line" />
            <div className="r-line r-line--short" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const HowItWorks = () => {
  return (
    <section className="how-section" id="how-it-works">
      {/* Header */}
      <div className="how-header">
        <div className="how-label">How it works</div>
        <h2 className="how-title">Four steps to a smarter you</h2>
        <p className="how-subtitle">
          No complex setup. No learning curve. Start saving in under 30 seconds.
        </p>
      </div>

      {/* Steps */}
      <div className="how-steps">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="how-step"
            style={{
              "--step-color": step.color,
              "--step-bg": step.bg,
              "--step-border": step.border,
              "--step-glow": step.glow,
            }}
          >
            {/* Number bubble */}
            <div className="how-step-number">
              <span className="step-num-text">{step.number}</span>
            </div>

            {/* Content */}
            <div className="how-step-content">
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
              <span className="how-step-hint">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                {step.hint}
              </span>
            </div>

            {/* Visual Card */}
            <div className="how-step-visual">
              <StepVisual id={step.visual} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;