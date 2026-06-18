## 2026-03-05 - [Initial Exploration]
**Learning:** CladWise UAE uses a mix of semantic and non-semantic elements for interactive components. Many icon-only buttons (especially close buttons) lack ARIA labels, making them inaccessible to screen readers.
**Action:** Always verify icon-only buttons have descriptive `aria-label` attributes and use semantic `<button type="button">` for interactive elements.

## 2026-03-05 - [Semantic Button Conversions]
**Learning:** When converting a `div` to a `button`, standard browser styles (padding, background, border) must be explicitly reset to maintain the original design.
**Action:** Use `background: none; border: none; padding: 0; font: inherit;` when converting non-semantic interactive elements to buttons.
