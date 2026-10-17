## 2025-05-14 - Accessible Form Feedback & Labeling
**Learning:** In static HTML projects without framework-managed state, dynamic UI feedback (like character counters) must be manually synchronized in the component's initialization/opening function to ensure state parity. Associating counters via `aria-describedby` provides essential context for screen reader users that native `maxlength` lacks.
**Action:** Always include a manual state reset/update in `openModal` style functions for any dynamic accessibility elements.
