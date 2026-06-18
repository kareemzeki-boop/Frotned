## 2025-05-15 - Accessible Semantic Conversions
**Learning:** Non-semantic interactive elements (like `div` or `span` with `onclick`) are common in legacy static codebases and invisible to screen readers/keyboard users. Converting these to `<button type="button">` with explicit CSS resets (border, padding, font) restores accessibility without breaking the visual design.
**Action:** Always check for `onclick` handlers on generic containers and replace them with semantic buttons, ensuring `type="button"` is used to avoid unintended form submissions.
