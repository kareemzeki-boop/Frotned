## 2026-06-29 - [Accessibility in Engineering Tools]
**Learning:** Engineering tools like the U-Value Calculator often rely on dynamic tables where form controls (selects, inputs) lack traditional `<label>` elements due to space constraints. These must be given descriptive `aria-label` attributes (e.g., including the row index) to ensure screen reader users have sufficient context.
**Action:** Always use `aria-label` with dynamic context (like `${i + 1}`) for form controls within data grids or repeated table rows where visual labels are only in the header.
>>>>>>> REPLACE
