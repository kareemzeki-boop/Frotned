## 2026-03-05 - [Accessible Selection Grids]
**Learning:** Using non-semantic `div` elements for selection grids (like Emirate or Category selection) is a recurring pattern in this app that breaks keyboard navigation and screen reader support.
**Action:** Always convert these `div` structures to `<button type="button">` with `aria-pressed` states, ensuring visual parity with CSS resets (`font: inherit`, `color: inherit`).
