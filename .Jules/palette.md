## 2026-05-07 - Modernizing non-semantic interactive elements
**Learning:** This application extensively uses `div` and `span` elements with `onclick` handlers for core interactivity (modals, tabs, comparison toggles). This breaks keyboard navigation and screen reader support. A reusable pattern for this repo is to convert these to semantic `<button type="button">` elements while explicitly overriding browser button styles (padding, font, color, background) to maintain the existing design. Additionally, a global delegated `keydown` listener mapping `Enter` and `Space` to `click` for `role="button"` elements provides a robust fallback for legacy components.
**Action:** Always prefer `<button type="button">` for interactive elements. For legacy `div` buttons, add `role="button"`, `tabindex="0"`, and ensure the global `keydown` listener is active.

## 2026-05-07 - Prioritized Escape Key Handling
**Learning:** With multiple overlapping UI layers (modals, lightboxes, sidebar drawers), a simple `Escape` listener is insufficient. A prioritized priority sequence (e.g., Lightbox > Explorer > Auth > Modal) ensures a predictable user experience when dismissing overlays.
**Action:** Implement a centralized `Escape` key handler with a clear priority sequence based on the application's modal stack.
