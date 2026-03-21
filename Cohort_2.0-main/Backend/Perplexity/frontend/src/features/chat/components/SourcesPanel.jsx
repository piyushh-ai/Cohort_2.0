import { Ic } from "../../shared/icons.jsx";
/* ─── SOURCES ────────────────────────────────────────────────────────────────── */
export const SourcesPanel = ({ sources }) => {
  if (!sources) return null;
  let blocks = [];
  if (typeof sources === "string")
    blocks = sources.split("\n\n").filter(Boolean);
  else if (Array.isArray(sources))
    blocks = sources.map(
      (s, i) => `[${i + 1}] ${s.title}\n${s.content}\nSource: ${s.url}`,
    );
  else return null;
  const parsed = blocks
    .map((b, i) => {
      const u = b.match(/Source:\s*(https?:\/\/[^\s]+)/);
      const t = b.match(/^\[(\d+)\]\s(.+)/);
      return {
        url: u?.[1],
        title: t?.[2]?.split("\n")[0] || `Source ${i + 1}`,
        index: i + 1,
      };
    })
    .filter((s) => s.url);
  if (!parsed.length) return null;
  return (
    <div className="sources">
      <div className="sources-label">
        <Ic.Globe /> Sources
      </div>
      <div className="source-chips">
        {parsed.map((s) => (
          <a
            key={s.index}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-chip"
          >
            <span style={{ color: "var(--c-text4)" }}>[{s.index}]</span>
            {s.title.slice(0, 28)}
            {s.title.length > 28 ? "…" : ""}
          </a>
        ))}
      </div>
    </div>
  );
};
