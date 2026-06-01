## 2025-05-15 - [RFQ Modal Accessibility & Character Counter]
**Learning:** In a large static HTML codebase without a reactive framework, dynamic UI elements like character counters require manual state initialization and reset within global "open" functions to ensure accuracy across multiple sessions.
**Action:** Always check the "open" or "reset" function of a modal when adding dynamic elements to ensure they are properly cleared or initialized.

**Learning:** Associating labels with inputs using `for` and `id` is a high-impact, low-effort accessibility win that is often overlooked in manually coded HTML forms.
**Action:** Audit forms for missing `id`/`for` pairings and `aria-required` attributes on mandatory fields.
