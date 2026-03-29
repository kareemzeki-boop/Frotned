## 2025-05-14 - [Function Naming Conflicts in Single-File SPAs]
**Learning:** In large single-file applications (like this 10k+ line index.html), duplicate function names in different script blocks are a common source of silent failures. Specifically, a later 'closeLightbox' definition for a secondary feature (Material Explorer) overrode the main gallery's close logic, breaking core accessibility (Escape key) and UI behavior.
**Action:** Always check for existing function definitions when adding global handlers or new script blocks in single-file architectures. Use feature-specific prefixes (e.g., 'closeExpLightbox') to avoid global scope pollution.

## 2025-05-14 - [Interactive Elements as Divs]
**Learning:** Custom 'AutoCAD-style' UI components (toggles, deck dots) are often built as <div>s for styling flexibility but lack all keyboard/screen reader affordances.
**Action:** When encountering non-semantic interactive divs, always add 'role="button"', 'tabindex="0"', and a global delegated 'keydown' listener that maps 'Enter'/'Space' to 'click' to ensure parity with standard <button> elements.

## 2025-05-14 - [Accessibility Outline Visibility]
**Learning:** In dark-themed, highly styled apps with custom cursors, the default browser focus outline is often suppressed or invisible.
**Action:** Use '*:focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; }' to provide a consistent, high-contrast focus indicator that matches the app's design system while remaining accessible.
