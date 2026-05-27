## 2026-03-05 - [RFQ Modal Accessibility & Micro-UX]
**Learning:** In a static HTML/JS environment, dynamic components like character counters must be manually reset in their 'open' functions to avoid state leakage between sessions. Explicit label-input associations and ARIA roles significantly improve the form's screen reader experience.
**Action:** Always inject state resets (like counter zeroing) into modal entry functions and ensure all icon-only buttons have descriptive aria-labels.
