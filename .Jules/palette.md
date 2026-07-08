## 2026-03-05 - [Accessibility & Real-time Feedback]
**Learning:** Many interactive forms in this project lack semantic label-input associations and real-time validation feedback. Using `aria-live="polite"` for character counters ensures screen reader users are kept informed of their input length without being interrupted.
**Action:** Always pair `<label for="...">` with `<input id="...">` in all modal forms and consider adding character counters for textareas with specific business limits.
