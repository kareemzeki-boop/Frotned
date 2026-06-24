## 2025-03-05 - [RFQ Modal Accessibility & Micro-UX]
**Learning:** Static modal forms in this project frequently lack explicit label-input associations (id/for) and real-time user feedback for character-limited fields. Additionally, hover-triggered modals ("onmouseenter") can be disruptive to the user flow.
**Action:** Always implement semantic label-input pairings, provide live character counters for textareas with `aria-describedby`, and ensure high-intent actions like opening a contact form are triggered only by explicit clicks.
