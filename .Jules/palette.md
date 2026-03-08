## 2025-05-15 - [Accessibility Gaps in Static Prototypes]
**Learning:** Raw HTML/JS prototypes often overlook basic accessibility (ARIA labels, linked form labels, focus indicators) when focusing on visual polish and layout. Container-based styling for forms often leads to unlinked labels.
**Action:** Always check icon-only buttons and form label-input associations in static sites, as they lack the automated accessibility checks common in modern frameworks. Use :focus-visible for non-intrusive keyboard navigation support.
