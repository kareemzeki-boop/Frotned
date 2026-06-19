## 2026-03-05 - Global Keyboard Parity for Non-Semantic Buttons
**Learning:** The application extensively uses `div` elements with `onclick` handlers for critical UI actions (close buttons, carousel navigation). These are invisible to keyboard users and screen readers by default.
**Action:** Always add `role="button"`, `tabindex="0"`, and `aria-label` to these elements. To ensure full keyboard parity without adding individual listeners to every element, use a global delegated `keydown` listener that maps `Enter` and `Space` to `click()` for any element with `role="button"`.
