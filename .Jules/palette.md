## 2026-06-15 - [RFQ Modal Accessibility & Intentionality]
**Learning:** Found a recurring pattern of non-semantic modal triggers (hover-to-open) and missing form accessibility (label/input association, aria-required) in the static HTML structure.
**Action:** Always prefer explicit `onclick` for high-intent actions like RFQs. Ensure every form field has a matching `id`/`for` pairing and a character counter where appropriate to provide real-time feedback. Manually reset UI state (like counters) within the initialization function (e.g., `openRFQ`) since there is no reactive framework.
