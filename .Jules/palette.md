## 2026-05-06 - [Accessibility in Dynamic Calculators]
**Learning:** Engineering tools with dynamic outputs (like the U-Value Calculator) often lack real-time feedback for screen reader users, and data-grid-like inputs are difficult to navigate without specific aria-labels.
**Action:** Always implement 'aria-live="polite"' on key output displays and ensure dynamically generated row inputs have descriptive labels (e.g., "Thickness for layer 1").
