# 🎨 Palette's UX & Accessibility Journal

## 2026-03-05 - [Global Overlay Collision and Keyboard Parity]
**Learning:** Multiple overlay systems (gallery vs. experience explorer) used identical function names (`closeLightbox`), causing naming collisions and logic overrides in the global scope. Additionally, non-semantic close triggers (divs) and fragmented keyboard listeners resulted in inconsistent "Escape" key behavior across the app's 9+ modal states.
**Action:** Implement unique namespaces for component-specific lightbox functions (e.g., `closeExpLightbox`) and centralize global keyboard handling for all overlays to ensure consistent accessibility and keyboard parity.
