## 2026-04-10 - [Accessibility Infrastructure]
**Learning:** Legacy projects often use non-semantic elements (like `div`) for interactive components, leading to poor keyboard and screen reader support. Implementing global `*:focus-visible` styles and converting key interactions to semantic `<button>` tags with ARIA labels provides immediate, high-impact accessibility wins with minimal code changes.
**Action:** When working with <div> based buttons, always include 'background: none; border: none; color: inherit;' to preserve existing layouts while gaining semantic benefits.
