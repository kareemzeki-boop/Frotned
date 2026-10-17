## 2026-07-03 - [Syntax safety with apostrophes]
**Learning:** Apostrophes in descriptive strings (e.g., 'Al Sa'fat') can break JavaScript execution if the string is wrapped in single quotes.
**Action:** Use double quotes for string literals containing apostrophes or ensure proper escaping.

## 2026-07-03 - [Accessibility synchronization in dynamic UI]
**Learning:** Toggle buttons with visual state classes (e.g., '.active') must also have their ARIA state ('aria-pressed') updated in the associated JavaScript handler.
**Action:** Always update 'aria-pressed' when toggling visual active states on buttons.
