## 2026-03-05 - [Anti-pattern: Modal Trigger on Hover]
**Learning:** Found multiple instances where high-intent modals (like RFQ forms) were triggered by `onmouseenter`. This is a significant accessibility and UX issue as it causes unintentional UI state changes, jarring experiences for screen reader users, and difficulty for users with motor impairments.
**Action:** Always prefer explicit `onclick` triggers for modals. If hover effects are needed, limit them to visual highlights, never structural navigation or modal activation.

## 2026-03-05 - [Character Counter Pattern]
**Learning:** Textareas with character limits should have a live counter associated via `aria-describedby` to ensure screen readers announce the remaining capacity. Initializing the counter state in the modal opening function is crucial for consistency when the modal is reused.
**Action:** Implement a `.rfq-field-header` flex container to align labels and counters, and ensure `updateCounter()` is called on modal open and user input.
