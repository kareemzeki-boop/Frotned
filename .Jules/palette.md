## 2026-06-28 - Accessibility Overhaul for Supplier Registration
**Learning:** This app uses many non-semantic 'div' and 'span' elements for interactive controls, which are invisible to screen readers and inaccessible via keyboard.
**Action:** Always check for 'onclick' handlers on non-semantic elements and refactor them to '<button type="button">' with proper ARIA attributes (like 'aria-pressed' or 'aria-expanded') and CSS resets to maintain visual parity.
