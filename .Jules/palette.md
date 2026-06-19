## 2026-03-05 - [Initial Accessibility Review]
**Learning:** Icon-only close buttons in complex modal systems often lack ARIA labels and may use non-semantic elements, hindering screen reader users.
**Action:** Always provide explicit `aria-label="Close"` to close buttons and prefer semantic `<button>` elements for interactive controls.

## 2026-03-05 - [CSS Resets for Semantic Conversions]
**Learning:** When converting non-semantic `div` elements to semantic `<button>` elements in pixel-perfect layouts, browser defaults (like `padding` or `font`) can cause visual regressions even if styles seem mostly inherited.
**Action:** Explicitly set `padding: 0` and `background: none` / `border: none` (if applicable) when performing semantic conversions to ensure visual parity.
