## 2026-03-05 - Overlay Accessibility & Escape Handling
**Learning:** In large single-file legacy projects, overlays often lack unified keyboard handling and semantic buttons. Converting `div` to `button` requires CSS resets (`font: inherit`, `padding: 0`) to avoid layout shifts.
**Action:** Use a prioritized global `keydown` listener to handle `Escape` across all potential overlays using optional chaining for safety.

## 2026-03-05 - Duplicate Function Definitions
**Learning:** `index.html` has multiple script blocks where functions like `closeLightbox` are redefined, causing the last definition to win globally.
**Action:** Always check for duplicate function names across the entire file before implementing new logic that depends on those functions. Use unique names (e.g., `closeExpLightbox`) to avoid conflicts.
