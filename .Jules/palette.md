# Palette's Journal - CladWise UAE

## 2026-06-13 - RFQ Modal Accessibility and Character Counter
**Learning:** This static project uses manual modal management via class toggling. Interactive components like RFQ forms often miss standard accessibility attributes like 'aria-required' and semantic label associations ('for'/'id'). Adding a live character counter requires manual DOM manipulation in the 'open' function to ensure state reset, as there is no reactive framework.
**Action:** Always check modal forms for 'for'/'id' pairings and 'aria-required'. When adding dynamic UI elements, inject reset logic into the corresponding 'open' function.
