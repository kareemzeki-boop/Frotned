## 2026-05-11 - [Accessibility: Div-to-Button Conversion Pattern]
**Learning:** When converting interactive <div> elements to semantic <button> elements in this application's custom design system, explicit CSS overrides (color, font-family, text-align, width) are necessary to counteract browser defaults and maintain the original "pill" or "card" aesthetic. Using aria-pressed for multi-toggle and single-select button groups provides clear state feedback to screen readers.
**Action:** Always include a CSS reset block for custom buttons and manage aria-pressed attributes in the selection logic.
