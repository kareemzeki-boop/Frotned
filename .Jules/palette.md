## 2025-05-14 - [A11y Foundations]
**Learning:** This static project relies heavily on non-semantic <div> elements for core interactivity (carousels, modals, toggles), which are invisible to screen readers and keyboard-only users by default.
**Action:** Consistently apply `role="button"`, `tabindex="0"`, and `aria-label` to custom interactive elements, and use a global delegated listener to map keyboard 'Enter'/'Space' to clicks.
