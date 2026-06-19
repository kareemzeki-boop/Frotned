## 2025-05-23 - [Accessibility in JS Templates & Global Key Listeners]
**Learning:** In projects where UI components (like pagination dots or toggles) are dynamically generated via JavaScript string templates, they often lack semantic meaning and keyboard support. Additionally, frequent inline styles like `outline: none` can break standard accessibility features.
**Action:**
1. Always include `role="button"`, `tabindex="0"`, and `aria-label` directly in JS string templates for interactive elements.
2. Use a global delegated `keydown` listener to map `Enter`/`Space` to `click` events for all elements with `role="button"` to ensure keyboard parity without adding listeners to every instance.
3. Apply `*:focus-visible { ... !important }` to ensure focus rings are visible even when specific elements have inline `outline: none`.
4. Unified the 'Escape' key handler across all disparate modal/overlay systems to provide a consistent exit path for keyboard users.
