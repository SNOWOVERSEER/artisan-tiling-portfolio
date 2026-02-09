import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);

/* ── Anti-scraping (does not affect SEO — crawlers don't execute JS) ── */

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Block common keyboard shortcuts for copying / saving / viewing source
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + U (view source), Ctrl/Cmd + S (save), Ctrl/Cmd + Shift + I (devtools)
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")
  ) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
    e.preventDefault();
  }
});

// Disable image dragging site-wide
document.addEventListener("dragstart", (e) => {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
});
