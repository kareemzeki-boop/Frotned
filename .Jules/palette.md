## 2025-04-18 - [Semantic Buttons vs Global Handlers]
**Learning:** Even with a global 'Enter/Space' keydown listener, using semantic <button> elements is superior as they provide native keyboard interaction, better screen reader integration, and reduce redundant JavaScript logic.
**Action:** Always prioritize converting interactive <div> elements to semantic <button type="button"> elements.

## 2025-04-18 - [Focus Visibility in Dark Themes]
**Learning:** In dark-themed applications with custom cursors, a global *:focus-visible outline with !important is often necessary to ensure accessibility compliance and visibility against various background intensities.
**Action:** Use 'outline: 2px solid var(--accent) !important;' for reliable focus indicators in themed environments.
