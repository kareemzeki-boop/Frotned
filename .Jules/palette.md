# 🎨 Palette's UX & Accessibility Journal

## 2025-05-22 - [Standardizing Interactive Accessibility]
**Learning:** In a large static HTML codebase with many non-semantic interactive elements (like divs used as buttons), global focus-visible styles and delegated keyboard listeners are highly effective "broad strokes" for accessibility.
**Action:** Always include a global `*:focus-visible` outline and a window-level `keydown` listener for `role="button"` elements to ensure keyboard parity without manual per-element refactoring.

## 2025-05-22 - [Form Accessibility in Static Contexts]
**Learning:** Dynamic modals in static apps often miss basic a11y features like label-input associations and real-time validation feedback (e.g., character counters).
**Action:** Manually pair labels/inputs with `id`/`for` and implement manual state resets for UI helpers like character counters in the modal's "open" function.
