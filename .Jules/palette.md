## 2026-06-21 - [A11y] Missing Label-Input Associations in Form-Heavy Tools
**Learning:** In the GRC Panel Checker and similar technical tools, <label> elements are frequently not associated with their corresponding <input> or <select> elements. This breaks screen reader navigation and reduces the clickable area for users.
**Action:** Always implement `for` and `id` pairings for form controls. In static tools with multiple tabs, also ensure `aria-pressed` or `aria-selected` is dynamically managed in the toggle logic.
