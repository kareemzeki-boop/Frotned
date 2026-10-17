# Palette's UX Journal - CladWise UAE

## 2026-03-05 - Material Comparison Accessibility
**Learning:** Interactive toggles implemented with `div` elements lack keyboard focusability and semantic state (like `aria-pressed`), making them inaccessible to screen readers and keyboard-only users.
**Action:** Convert `div` based toggles to semantic `<button type="button">` elements and use `aria-pressed` for state management.
