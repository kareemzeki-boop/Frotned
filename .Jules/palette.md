# Palette Journal - CladWise UAE

## 2025-05-22 - Initial Assessment
**Learning:** This is a static HTML/JS project. It relies heavily on custom CSS and vanilla JS for interactivity. Accessibility seems to have been a focus in previous iterations (based on memory), but there are always small gaps in static sites, especially with keyboard navigation and ARIA attributes for dynamic content.
**Action:** I will look for interactive elements that lack proper focus indicators or ARIA labels.

## 2025-05-22 - Material Toggle & Nav Accessibility
**Learning:** Interactive components in this static codebase (like Material Toggles and Nav Avatars) were originally built using `div` tags with `onclick` handlers, missing keyboard parity and semantic meaning. Additionally, global focus indicators were inconsistent or suppressed.
**Action:** Always convert interactive `div`s to `<button type="button">` and ensure `aria-pressed` or `aria-label` is used for state. Implement a global `*:focus-visible` rule using the design system's `--accent` color to provide a consistent, high-visibility focus state across the entire application without affecting mouse users.
