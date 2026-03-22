import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getGraphDataAPI } from "../api/items.api";
import { useNavigate } from "react-router-dom";
import "../styles/KnowledgeGraph.scss";

const TYPE_COLORS = {
  article: {
    fill: "#1e3a5f",
    stroke: "#38bdf8",
    text: "#38bdf8",
    label: "#7dd3fc",
  },
  video: {
    fill: "#4a1020",
    stroke: "#fb7185",
    text: "#fb7185",
    label: "#fda4af",
  },
  pdf: {
    fill: "#3d2800",
    stroke: "#fbbf24",
    text: "#fbbf24",
    label: "#fcd34d",
  },
  image: {
    fill: "#0d3320",
    stroke: "#34d399",
    text: "#34d399",
    label: "#6ee7b7",
  },
  tweet: {
    fill: "#0a2540",
    stroke: "#1d9bf0",
    text: "#1d9bf0",
    label: "#60c5ff",
  },
  document: {
    fill: "#2d1b5e",
    stroke: "#a78bfa",
    text: "#a78bfa",
    label: "#c4b5fd",
  },
};

const TYPE_ICONS = {
  article: "ART",
  video: "VID",
  pdf: "PDF",
  image: "IMG",
  tweet: "TWX",
  document: "DOC",
};

const KnowledgeGraph = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [stats, setStats] = useState({ nodes: 0, edges: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getGraphDataAPI();
        const { nodes, edges } = res.data;
        setStats({ nodes: nodes.length, edges: edges.length });
        setGraphData({ nodes, edges });
      } catch (err) {
        setError("Failed to load graph data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || !graphData || graphData.nodes.length === 0) return;
    if (!containerRef.current || !svgRef.current) return;

    drawGraph(graphData.nodes, graphData.edges);

    const observer = new ResizeObserver(() => {
      if (simRef.current) simRef.current.stop();
      drawGraph(graphData.nodes, graphData.edges);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [loading, graphData]);

  const drawGraph = (rawNodes, rawEdges) => {
    if (!containerRef.current || !svgRef.current) return;

    // Deep clone to avoid d3 mutation issues on redraw
    const nodes = rawNodes.map((n) => ({ ...n }));
    const edges = rawEdges.map((e) => ({ ...e }));

    d3.select(svgRef.current).selectAll("*").remove();

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const mobile = width < 600;
    const nodeR = mobile ? 20 : 26;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // ── Defs ──
    const defs = svg.append("defs");

    // Subtle dot grid
    defs
      .append("pattern")
      .attr("id", "dots")
      .attr("width", 24)
      .attr("height", 24)
      .attr("patternUnits", "userSpaceOnUse")
      .append("circle")
      .attr("cx", 1)
      .attr("cy", 1)
      .attr("r", 0.8)
      .attr("fill", "#21262d");

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#dots)");

    // Glow
    const fl = defs
      .append("filter")
      .attr("id", "glow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");
    fl.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "blur");
    const fm = fl.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");

    // ── Zoom + Pan (touch fixed) ──
    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 4])
      .filter((event) => !event.ctrlKey && !event.button)
      .on("zoom", (event) => g.attr("transform", event.transform));

    svg.call(zoom);
    svg.on("touchstart.zoom touchmove.zoom", null); // remove default to re-add properly

    // Manual touch handling for pan + pinch
    let lastTouches = null;
    let currentTransform = d3.zoomIdentity;

    svg.on("touchstart", (event) => {
      lastTouches = Array.from(event.touches).map((t) => ({
        x: t.clientX,
        y: t.clientY,
      }));
    });

    svg.on(
      "touchmove",
      (event) => {
        event.preventDefault();
        const touches = Array.from(event.touches).map((t) => ({
          x: t.clientX,
          y: t.clientY,
        }));

        if (touches.length === 1 && lastTouches?.length === 1) {
          // Pan
          const dx = touches[0].x - lastTouches[0].x;
          const dy = touches[0].y - lastTouches[0].y;
          currentTransform = currentTransform.translate(
            dx / currentTransform.k,
            dy / currentTransform.k,
          );
          g.attr("transform", currentTransform);
          svg.call(zoom.transform, currentTransform);
        } else if (touches.length === 2 && lastTouches?.length === 2) {
          // Pinch zoom
          const dist1 = Math.hypot(
            lastTouches[0].x - lastTouches[1].x,
            lastTouches[0].y - lastTouches[1].y,
          );
          const dist2 = Math.hypot(
            touches[0].x - touches[1].x,
            touches[0].y - touches[1].y,
          );
          const scale = dist2 / dist1;
          const midX = (touches[0].x + touches[1].x) / 2;
          const midY = (touches[0].y + touches[1].y) / 2;
          const rect = container.getBoundingClientRect();
          const cx = midX - rect.left;
          const cy = midY - rect.top;
          currentTransform = currentTransform
            .translate(cx, cy)
            .scale(scale)
            .translate(-cx, -cy);
          currentTransform = d3.zoomIdentity
            .translate(currentTransform.x, currentTransform.y)
            .scale(Math.max(0.2, Math.min(4, currentTransform.k)));
          g.attr("transform", currentTransform);
          svg.call(zoom.transform, currentTransform);
        }
        lastTouches = touches;
      },
      { passive: false },
    );

    svg.on("touchend", () => {
      lastTouches = null;
    });

    // ── Simulation — tighter spacing ──
    const sim = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(edges)
          .id((d) => d.id)
          .distance(mobile ? 80 : 110) // ← tighter distance
          .strength(0.4), // ← stronger pull
      )
      .force("charge", d3.forceManyBody().strength(mobile ? -200 : -280)) // ← less repulsion
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.3))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius(nodeR + 14)
          .strength(0.8),
      );

    simRef.current = sim;

    // ── Edges ──
    const link = g
      .append("g")
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("class", "graph-edge")
      .attr("stroke-width", (d) => 1 + Math.min(d.strength, 3))
      .attr("stroke-opacity", 0.35);

    // ── Nodes ──
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "graph-node")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
        const conn = new Set();
        edges.forEach((e) => {
          if (e.source.id === d.id) conn.add(e.target.id);
          if (e.target.id === d.id) conn.add(e.source.id);
        });
        node.classed(
          "graph-node--dimmed",
          (n) => n.id !== d.id && !conn.has(n.id),
        );
        node.classed("graph-node--selected", (n) => n.id === d.id);
        link.classed(
          "graph-edge--dimmed",
          (e) => e.source.id !== d.id && e.target.id !== d.id,
        );
        link.classed(
          "graph-edge--active",
          (e) => e.source.id === d.id || e.target.id === d.id,
        );
      })
      .on("dblclick", (event, d) => navigate(`/item/${d.id}`));

    // Outer pulse ring
    node
      .append("circle")
      .attr("r", nodeR + 7)
      .attr("fill", "none")
      .attr(
        "stroke",
        (d) => (TYPE_COLORS[d.type] || TYPE_COLORS.article).stroke,
      )
      .attr("stroke-width", 0.8)
      .attr("stroke-opacity", 0.18)
      .attr("class", "graph-node-glow");

    // Main filled circle
    node
      .append("circle")
      .attr("r", nodeR)
      .attr("fill", (d) => (TYPE_COLORS[d.type] || TYPE_COLORS.article).fill)
      .attr(
        "stroke",
        (d) => (TYPE_COLORS[d.type] || TYPE_COLORS.article).stroke,
      )
      .attr("stroke-width", 1.5)
      .attr("class", "graph-node-circle");

    // Type label inside
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", (d) => (TYPE_COLORS[d.type] || TYPE_COLORS.article).text)
      .attr("font-size", mobile ? "8px" : "9px")
      .attr("font-weight", "700")
      .attr("font-family", "monospace")
      .attr("letter-spacing", "0.08em")
      .text((d) => TYPE_ICONS[d.type] || "???");

    // Title below node
    node
      .append("text")
      .attr("class", "graph-label")
      .attr("dy", nodeR + 14)
      .attr("text-anchor", "middle")
      .attr("fill", (d) => (TYPE_COLORS[d.type] || TYPE_COLORS.article).label)
      .attr("font-size", mobile ? "9px" : "10px")
      .text((d) => {
        const max = mobile ? 14 : 20;
        return d.title?.length > max ? d.title.slice(0, max) + "…" : d.title;
      });

    // ── Tick ──
    sim.on("tick", () => {
      // Clamp nodes inside SVG
      nodes.forEach((d) => {
        d.x = Math.max(nodeR + 20, Math.min(width - nodeR - 20, d.x));
        d.y = Math.max(nodeR + 20, Math.min(height - nodeR - 40, d.y));
      });

      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Background click reset
    svg.on("click", () => {
      setSelectedNode(null);
      node.classed("graph-node--dimmed", false);
      node.classed("graph-node--selected", false);
      link.classed("graph-edge--dimmed", false);
      link.classed("graph-edge--active", false);
    });
  };

  if (loading) {
    return (
      <div className="graph-loading">
        <div className="graph-spinner" />
        <p>Building knowledge graph...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="graph-empty">
        <p>{error}</p>
      </div>
    );
  }

  if (stats.nodes === 0) {
    return (
      <div className="graph-empty">
        <svg width="44" height="44" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6.5 1a.5.5 0 0 0 0 1h1v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.354-.354a.5.5 0 0 0-.707-.707l-.354.354A6.97 6.97 0 0 0 8.5 3.07V2h1a.5.5 0 0 0 0-1h-3z" />
        </svg>
        <p>No connections yet</p>
        <span>Save more items with AI tags to see your knowledge graph</span>
      </div>
    );
  }

  const colors = selectedNode
    ? TYPE_COLORS[selectedNode.type] || TYPE_COLORS.article
    : null;

  return (
    <div className="graph-wrapper">
      <div className="graph-stats">
        <div className="graph-header">
          <button className="graph-back-btn" onClick={() => navigate("/")}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Back
          </button>

          <div className="graph-stats-left">
            <span className="graph-stats-badge">{stats.nodes}</span>
            <span>items</span>
            <span className="graph-stats-dot" />
            <span className="graph-stats-badge graph-stats-badge--edge">
              {stats.edges}
            </span>
            <span>connections</span>
          </div>

          <span className="graph-stats-hint">
            Drag · Pinch to zoom · Tap to highlight · Double-tap to open
          </span>
        </div>
      </div>

      <div className="graph-legend">
        {Object.entries(TYPE_COLORS).map(([type, c]) => (
          <span key={type} className="legend-item">
            <span className="legend-dot" style={{ background: c.stroke }} />
            {type}
          </span>
        ))}
      </div>

      <div className="graph-canvas" ref={containerRef}>
        <svg ref={svgRef} />
      </div>

      {selectedNode && colors && (
        <div className="graph-preview">
          <div className="graph-preview-header">
            <span
              className="graph-preview-type"
              style={{
                background: colors.fill,
                color: colors.stroke,
                border: `1px solid ${colors.stroke}`,
              }}
            >
              {TYPE_ICONS[selectedNode.type]} · {selectedNode.type}
            </span>
            <button
              className="graph-preview-close"
              onClick={() => setSelectedNode(null)}
            >
              ✕
            </button>
          </div>
          <p className="graph-preview-title">{selectedNode.title}</p>
          {selectedNode.tags?.length > 0 && (
            <div className="graph-preview-tags">
              {selectedNode.tags.map((tag) => (
                <span
                  key={tag}
                  className="graph-preview-tag"
                  style={{
                    borderColor: colors.stroke + "50",
                    color: colors.label,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            className="graph-preview-open"
            style={{
              background: colors.fill,
              border: `1px solid ${colors.stroke}`,
              color: colors.stroke,
            }}
            onClick={() => navigate(`/item/${selectedNode.id}`)}
          >
            Open item →
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
