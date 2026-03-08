## 2025-05-14 - [Global Focus Visibility Override]
**Learning:** In codebases where `outline: none` or `outline: 0` is applied broadly (e.g., in a reset or on specific interactive elements), standard CSS specificity is often insufficient to restore focus indicators. Using `:focus-visible` with `!important` is a necessary and effective way to ensure keyboard accessibility without affecting mouse users.
**Action:** When fixing missing focus indicators, check for existing `outline: none` rules. Use `*:focus-visible { outline: [width] [style] [color] !important; }` to guarantee visibility across all interactive components.

## 2025-05-14 - [Dynamic ARIA Labels for Custom Components]
**Learning:** Custom UI components built with JS (like sliders or carousels) often lack basic accessibility primitives. Simply adding `role="button"` and `tabindex="0"` is not enough; they must also have descriptive `aria-label`s to be meaningful to screen reader users.
**Action:** Always audit JS-generated navigation elements (dots, arrows) and ensure they receive both keyboard support and descriptive labels during creation.
