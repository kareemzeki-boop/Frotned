
## 2025-05-15 - [Accessible Custom Navigation]
**Learning:** Custom UI elements (like dots and arrows in a slider) implemented with <div> tags are completely invisible to keyboard and screen reader users unless explicitly annotated with ARIA roles and tabindex.
**Action:** Always add role="button", tabindex="0", and aria-label to custom interactive elements, and ensure a global keydown listener handles Enter and Space for these elements to provide keyboard parity.
