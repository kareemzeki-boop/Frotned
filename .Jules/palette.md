## 2025-05-22 - Intrusive Modal Triggers
**Learning:** Using `onmouseenter` to trigger modal overlays for high-intent actions (like "Request Quote") causes significant user frustration due to accidental activations. This pattern breaks the expectation that modals should be explicit results of a user action.
**Action:** Always use click events for modal triggers and remove legacy hover triggers from dynamic and static templates.

## 2025-05-22 - Form Accessibility Parity
**Learning:** Static HTML projects often overlook standard `label[for]` and `input[id]` associations, especially in dynamically generated modals.
**Action:** Audit and implement semantic associations and `aria-describedby` for real-time feedback elements like character counters to ensure screen reader compatibility.
