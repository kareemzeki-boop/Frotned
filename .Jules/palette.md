## 2026-03-05 - Modal Trigger Over-Sensitivity
**Learning:** High-intent actions like "Request Quote" or "Register" should not be triggered by mouse hover (`onmouseenter`). This leads to accidental modal activation when users are simply scanning the page, creating a disjointed and frustrating UX.
**Action:** Always use explicit `onclick` events for modal triggers, especially in dense information environments like supplier directories or product grids.

## 2026-03-05 - Global Focus Visibility in Large Static Codebases
**Learning:** Large, single-file HTML projects often have inconsistent 'outline: none' styles that kill keyboard accessibility. A global `*:focus-visible` override is required to ensure consistent navigation cues.
**Action:** Implement `*:focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; }` in the root style block. The `!important` flag is necessary to reliably override scattered inline or component-specific resets in these types of repositories.

## 2026-03-05 - Live Counter Sync in Static JS
**Learning:** In projects without reactive frameworks (React/Vue), dynamic UI elements like character counters can easily get out of sync with field state if they are pre-filled or reset.
**Action:** Manually inject state reset logic (e.g., `counter.textContent = '0/1000'`) into the global 'open' or 'toggle' function for the modal to ensure fresh UI state on every interaction.
