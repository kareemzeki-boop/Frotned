# Palette's Journal - CladWise UAE

## 2026-03-05 - Improving Form Accessibility and Intentional Interactions
**Learning:** In complex single-page applications with many interactive elements, hover-triggered modals (like `onmouseenter`) can cause accidental UI churn and frustrate users. Additionally, semantic label-input association is often overlooked in custom-styled forms, breaking screen reader utility and reducing click target size.
**Action:** Always prefer explicit click actions for high-intent modals. Ensure all form fields use `for` and `id` attributes for labels.
