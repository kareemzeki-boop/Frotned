## 2025-01-24 - Keyboard Parity Pattern for Custom UI

**Learning:** In projects with monolithic HTML files and heavy reliance on custom UI elements (like `div`s acting as sliders or toggles), adding `role="button"` and `tabindex="0"` is only half the battle. Users expect keyboard interactivity ('Enter' and 'Space') which isn't native to non-button elements even with a role. Implementing a global delegated listener for `keydown` ensures that all such custom "buttons" work consistently without duplicating event logic across multiple components.

**Action:** When refactoring custom UI for accessibility, always pair `tabindex="0"` with a global `keydown` handler that translates 'Enter' and 'Space' to 'click' events for elements with `role="button"`.
