## 2025-05-14 - Character Counter Accessibility
**Learning:** For inputs with character limits, simply displaying a visual counter (e.g., "0 / 1000") is insufficient for screen reader users. The counter element should be programmatically associated with the input field.
**Action:** Always link character counter elements to their respective textareas or inputs using the `aria-describedby` attribute to ensure assistive technologies announce the limit and current count.
