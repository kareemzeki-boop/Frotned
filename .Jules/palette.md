## 2026-03-05 - Global Accessibility & Keyboard Parity
**Learning:** In static HTML projects with many custom overlays and non-semantic interactive elements (like `div` cards or dots), global keyboard parity is essential. Mapping 'Enter' and 'Space' to 'click' for elements with `role="button"` provides a scalable way to ensure keyboard accessibility without modifying every JS click handler.
**Action:** Always add `role="button"`, `tabindex="0"`, and `aria-label` to custom interactive elements, and implement a global delegated `keydown` listener that maps 'Enter'/'Space' to `click()` (while ignoring inputs/textareas).

## 2026-03-05 - Overlay Management & Escape Key
**Learning:** As a project grows, overlays (modals, lightboxes, drawers) often proliferate with inconsistent closing mechanisms. A centralized `Escape` key handler that checks for the active overlay (using class lists) ensures a predictable user experience.
**Action:** Consolidate `Escape` key logic into a single global listener that priority-checks active overlays to trigger their respective close functions.
