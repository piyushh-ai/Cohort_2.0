/* ─── Markdown component map ────────────────────────────────────────────────────
   Every element gets an explicit className so CSS can target them directly
   without relying on descendant selectors that break in React style injection.
────────────────────────────────────────────────────────────────────────────── */
export const components = {
  p: ({ children }) => <p className="px-p">{children}</p>,
  strong: ({ children }) => <strong className="px-strong">{children}</strong>,
  em: ({ children }) => <em className="px-em">{children}</em>,
  del: ({ children }) => <del className="px-del">{children}</del>,

  h1: ({ children }) => <h1 className="px-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="px-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="px-h3">{children}</h3>,
  h4: ({ children }) => <h4 className="px-h4">{children}</h4>,

  ul: ({ children }) => <ul className="px-ul">{children}</ul>,
  ol: ({ children }) => <ol className="px-ol">{children}</ol>,
  /* Wrap children in a span — so flex only has 2 items: bullet/number + content */
  li: ({ children }) => (
    <li className="px-li">
      <span className="px-li-content">{children}</span>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="px-bq">{children}</blockquote>
  ),
  hr: () => <hr className="px-hr" />,

  a: ({ href, children }) => (
    <a className="px-a" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),

  /* Inline code vs fenced code block */
  code: ({ inline, className, children }) => {
    if (inline) {
      return <code className="px-code-inline">{children}</code>;
    }
    // Extract language from className="language-xxx"
    const lang = /language-(\w+)/.exec(className || "")?.[1] || "";
    return (
      <div className="px-pre-wrap">
        <div className="px-pre-bar">
          <span className="px-pre-lang">{lang || "code"}</span>
        </div>
        <pre className="px-pre">
          <code className="px-code-block">{children}</code>
        </pre>
      </div>
    );
  },

  /* Tables — td/th get explicit display:table-cell so list styles never bleed in */
  table: ({ children }) => (
    <div className="px-table-wrap">
      <table className="px-table">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="px-tr">{children}</tr>,
  th: ({ children }) => <th className="px-th">{children}</th>,
  td: ({ children }) => <td className="px-td">{children}</td>,
};
