## 2025-07-07 - [Micro-UX: RFQ Character Counter & Accessibility]
**Learning:** Adding a character counter to multi-line textareas provides immediate feedback on input constraints, preventing frustration during form submission. Pairing icon-only buttons with `aria-label` is a critical and low-effort accessibility win.
**Action:** Always include `maxlength` and a live counter for multi-line text inputs in forms. Ensure all decorative or icon-only interactive elements have descriptive `aria-label` or `aria-hidden` attributes.
