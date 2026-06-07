## 2026-06-07 - Real-time Accessibility for Dynamic Calculators
**Learning:** In highly dynamic, calculation-heavy interfaces (like the U-Value Calculator), screen reader users are often left unaware of background state changes. Using `aria-live="polite"` on key result areas and status indicators ensures updates are announced without jarring the user.
**Action:** Always apply `aria-live` to result displays and status chips that change based on user input.

## 2026-06-07 - Dynamic ARIA Labels in Lists
**Learning:** When rendering repetitive interactive elements (like table rows for assembly layers), generic labels (e.g., "Delete") are insufficient. Screen readers benefit significantly from unique, context-aware labels that include the item's index or name.
**Action:** In `render` functions that map over data, inject unique indices into `aria-label` attributes (e.g., `aria-label="Remove layer ${i + 1}"`).
