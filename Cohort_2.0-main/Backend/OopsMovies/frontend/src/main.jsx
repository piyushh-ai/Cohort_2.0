import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "@studio-freight/lenis";
import "./index.css";
import App from "./App.jsx";

const lenis = new Lenis({
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1.1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
