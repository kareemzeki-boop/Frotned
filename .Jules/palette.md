## 2024-05-15 - [Global Focus Indicators and ARIA Labels]
**Learning:** In projects with extensive inline styling or CSS resets (e.g., `outline: none`), global accessibility enhancements like `:focus-visible` must often use `!important` to effectively override local styles and ensure keyboard navigation is visible across all interactive components.
**Action:** When implementing keyboard accessibility in a monolithic codebase, identify common patterns of focus suppression and apply a high-specificity global override.

**Learning:** Icon-only buttons in monolithic HTML structures are frequently duplicated across different modal types (auth, lightbox, etc.) without accessible names.
**Action:** Perform a comprehensive search for recurring icon-class patterns and apply `aria-label` attributes to all instances to ensure screen reader compatibility for critical navigation actions like "Close".
