## 2026-03-05 - Character Counter Accessibility
**Learning:** Character counters for textareas should be associated with the input field using 'aria-describedby' to ensure assistive technologies announce the remaining character count to the user.
**Action:** Always pair character count displays with 'aria-describedby' on the target input.

## 2026-03-05 - UI State Resets in Static Apps
**Learning:** In a large static HTML/JS codebase without a reactive framework, UI state resets (like character counters) must be manually injected into existing global toggle/open functions to ensure consistent behavior across multiple modal openings.
**Action:** Explicitly reset dynamic UI elements in the corresponding 'open' or 'reset' functions.

## 2026-03-05 - Visible Focus States
**Learning:** Root style blocks should include clear focus-visible outlines to ensure keyboard accessibility. Using '!important' is often necessary in large legacy codebases to override inconsistent 'outline: none' styles.
**Action:** Implement '*:focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; }' in the global CSS.
