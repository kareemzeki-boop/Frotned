## 2026-03-05 - [Character Counter State Management in Static UI]
**Learning:** In a flat static HTML/JS project without reactive frameworks, dynamic UI elements like character counters must have their state manually synchronized within 'open' or 'toggle' functions (e.g., calling `updateCounter()` inside `openModal()`) to ensure the display accurately reflects pre-filled or reset field values upon interaction.
**Action:** Always identify global initialization/open functions when adding dynamic metadata to forms and inject state reset logic to prevent stale UI indicators.

## 2026-03-05 - [Accessible Label-Input Pairing]
**Learning:** This application frequently uses non-semantic patterns where labels are not programmatically associated with inputs. Pairing labels with inputs using `id` and `for` attributes not only improves screen reader navigation but also increases the clickable target area for users.
**Action:** Audit form modals for missing label-input associations and implement semantic pairings to enhance both accessibility and UX.
