## 2025-05-14 - [A11y: RFQ Modal Form Labels and Requirements]
**Learning:** Modal forms in this application frequently omit semantic associations between `<label>` and `<input>` elements, and mandatory fields are not identified to screen readers.
**Action:** Always check modal forms for `for`/`id` pairings and `aria-required="true"` on mandatory fields. Ensure icon-only close buttons have descriptive `aria-label` attributes.

## 2025-05-14 - [A11y: Modal Visibility Control]
**Learning:** The application controls modal visibility via the `.open` class on overlay containers (e.g., `#rfq-overlay`) rather than programmatic functions like `showModal()`.
**Action:** When writing automated UI verification scripts, trigger modal visibility by directly manipulating the `classList` of the overlay element.
