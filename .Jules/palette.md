# Palette's UX Journal

## 2026-03-05 - Improving Overlay Escape Key Handling
**Learning:** The application uses multiple independent overlays but the global keydown listener only handles a few. A unified Escape key handler improves consistency and accessibility across all modal-like components.
**Action:** Implement a priority-based Escape key handler that checks for the top-most open overlay and closes it.
