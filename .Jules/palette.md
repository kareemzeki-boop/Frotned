# Palette's UX Journal

## 2025-04-25 - [Semantic Button Conversion & Keyboard Navigation]
**Learning:** In static HTML projects, interactive elements are often implemented as `div` tags for styling ease, sacrificing accessibility. Converting these to `<button>` requires explicit CSS resets (background, border, padding) to avoid visual regressions while gaining native focus and screen reader support. Implementing a prioritized global `Escape` key handler is more efficient than individual listeners for complex multi-modal interfaces.
**Action:** Always prefer `<button type="button">` for interactive elements and use a central keydown dispatcher for managing multiple overlay states.
