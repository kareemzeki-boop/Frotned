## 2025-03-05 - [A11y: Missing Label Associations and ARIA Labels]
**Learning:** This static HTML/JS application frequently uses `<label>` elements without `for` attributes and icon-only `<button>` elements without descriptive `aria-label`s. This makes the interface less accessible for screen readers and reduces the click/tap target effectiveness for form fields.
**Action:** When working with modals or forms in this project, always check for and implement `for`/`id` pairings on labels and add `aria-label="Close"` (or other appropriate descriptions) to icon-based buttons.
