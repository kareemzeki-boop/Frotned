## 2026-03-05 - Global Overlay Accessibility and Keyboard Parity
**Learning:** This static project uses many non-semantic `div` elements for interaction and custom modal systems. Global accessibility can be efficiently improved by combining explicit ARIA labels on common button classes with a delegated `keydown` listener that maps keyboard events to clicks for any element with `role="button"`.
**Action:** Always add `aria-label` to icon-only buttons and implement a global delegated `keydown` listener for `role="button"` elements to ensure keyboard parity without manual per-element listeners.
