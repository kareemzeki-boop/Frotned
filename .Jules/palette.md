## 2025-05-14 - RFQ Interaction & Modal Accessibility Patterns
**Learning:** High-intent modals like "Request Quote" should not be triggered on `onmouseenter` as it leads to accidental openings and a jarring UX. Additionally, icon-only close buttons and non-semantic `div` buttons are common accessibility gaps in this codebase that hinder screen reader and keyboard users.
**Action:** Always replace `onmouseenter` with `onclick` for modal triggers. Ensure all close buttons have `aria-label="Close"` and convert `div` interactives to semantic `<button>` elements with CSS resets to maintain visual parity.

## 2025-05-14 - Real-time Engineering Tools Feedback
**Learning:** Engineering tools like the U-Value Calculator require real-time feedback for screen readers to be truly accessible. Dynamic table rows and result displays often lack the necessary ARIA attributes to announce changes.
**Action:** Implement `aria-live="polite"` on calculation result displays and ensure dynamic table inputs have descriptive `aria-label` attributes associated with their row index or context.
