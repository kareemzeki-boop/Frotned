## 2026-03-05 - [RFQ Modal Accessibility and UX]
**Learning:** High-intent forms like RFQ benefit from explicit field associations (id/for) and real-time feedback (character counters) to reduce friction and improve screen reader experience. The absence of a framework requires manual UI state resets in opening functions.
**Action:** Always check for missing label-input associations in modals and implement character counters for textareas with `aria-describedby`. Ensure resets are added to the `open*` functions.
