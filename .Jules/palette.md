## 2026-03-05 - Interactive Div Pattern without Accessibility
**Learning:** This project frequently uses `div` elements with `onclick` for primary interactions (hero cards, material deck navigation) while lacking ARIA roles, tabindex, and keyboard listeners. Global `outline: none` further hinders keyboard navigation.
**Action:** Always check for `onclick` on non-interactive elements and add `role="button"`, `tabindex="0"`, and keyboard listeners. Use `!important` for `:focus-visible` to override existing inline or global `outline: none`.
