## 2026-03-06 - [Dynamic Calculator Accessibility]
**Learning:** Real-time calculators in this app often lack screen reader feedback when results update dynamically. Additionally, dynamically generated table rows for assembly layers often omit context-specific labels for inputs.
**Action:** Always apply `aria-live="polite"` to calculation result displays and ensure dynamically rendered inputs have unique, descriptive `aria-label` attributes that include the row index or context.
