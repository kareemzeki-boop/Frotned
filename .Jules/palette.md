## 2026-03-05 - [Global Escape Handling and Close Button Accessibility]
**Learning:** Overlays and modals in this project often use non-semantic elements (like `div` for buttons) and miss keyboard-driven closing logic (Escape key), which is a common accessibility pattern.
**Action:** Always check and implement `aria-label` for icon-only buttons, convert non-semantic interactive elements to `<button>`, and ensure the global `keydown` listener handles `Escape` for all overlays.
