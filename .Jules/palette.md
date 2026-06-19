## 2026-03-05 - Global Keyboard Parity & Accessibility
**Learning:** In projects where interactive elements are built with non-semantic `div` elements, a global delegated `keydown` listener can effectively map 'Enter' and 'Space' to 'click' events for any element with `role="button"`. Additionally, a centralized 'Escape' key handler using optional chaining (e.g., `document.getElementById('id')?.classList.contains('open')`) safely manages multiple overlay systems without state management libraries.
**Action:** Always add `role="button"` and `tabindex="0"` to non-semantic interactive elements and use a global delegated listener for keyboard parity. Use optional chaining in global listeners to prevent errors when elements are missing.

## 2026-03-05 - CSS Focus Styles in Legacy Projects
**Learning:** Global focus indicators (`:focus-visible`) often require the use of `!important` when the codebase utilizes frequent inline styles or specific resets that remove outlines. This ensures accessibility compliance across all interactive components in a single-file application.
**Action:** Apply global focus styles with `!important` and `outline-offset` to guarantee visibility against varied backgrounds and custom cursors.
