## 2025-05-15 - [Accessible Modals and Focus States]
**Learning:** Icon-only close buttons in this application frequently use non-semantic `div` elements and lack ARIA labels, making them invisible to screen readers. Additionally, the custom dark UI and AutoCAD-style crosshair cursor obscure default browser focus indicators.
**Action:** Always convert interactive `div` elements to `<button type="button">`, add explicit `aria-label="Close"` to icon-only buttons, and implement a high-contrast global `focus-visible` outline using `!important` to override inline styles.

## 2025-05-15 - [Form Accessibility Patterns]
**Learning:** Many form fields in the modal overlays (like RFQ) lack semantic pairing between `<label>` and `<input>`, which breaks screen reader navigation and reduces the clickable area for users.
**Action:** Ensure every form input has a unique `id` paired with a corresponding `<label for="...">`, and explicitly mark mandatory fields with `aria-required="true"`.
