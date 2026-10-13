# CladWise U-value Calculator — prioritized change plan

## Current implementation and reproduced defects

The live `https://cladwise.ae/u-value-calculator.html` is byte-for-byte identical to this repository's `u-value-calculator.html` at commit `2534779` on `main`. The page is a single HTML file containing markup, CSS, state, calculation logic, compliance rules, and jsPDF export.

Reproduced on the live page:

1. **Stale layer R value after editing thickness.** Editing the first GFRC thickness input from 25 mm to 50 mm changes the draft input text to `50`, but the displayed row R remains `0.033` and the clear-field/result state remains unchanged until a change event. The source confirms `onThick()` updates state and calls `calculate()` without `renderLayers()`, while the field is bound with `onchange`. The UI therefore has multiple inconsistent states.
2. **Invalid values are coerced or ignored.** `parseFloat(v)||0`, `parseInt(v)||0`, and `parseFloat(...||1)||1` silently coerce invalid values, default area to 1 m², truncate fixing counts, and still allow result/compliance rendering from partial data.
3. **Cavity physics are fixed presets, not a model.** `aircavity` uses `r:0.18` and `aircavv` uses `r:0.13`, with “Drained” presented as a proxy for ventilation. No orientation, opening area, emissivity, threshold, or excluded-layer treatment is represented.
4. **Standard citations and claims are misleading.** The UI cites surface resistances to ISO 6946 Table 1, labels the calculator “combined method” although it only sums serial layers, and contains hardcoded unconditional UAE compliance thresholds and the phrase “meets all UAE standards”.
5. **Scope is mixed.** The preset is called “ACM-FR Curtain Wall” although no curtain-wall method exists. The current calculator is suitable only as an opaque external wall / rainscreen phase-1 calculator after the model is made explicit.
6. **Bridge and area inputs are hidden behind collapsed panels and defaults are invented.** The reference area is only visible after expanding Ψ; the default preset invents junction lengths and fixing counts. Negative Ψ is shown as a preset but there is no explicit dimension convention or source field.
7. **PDF recomputes independently.** The report repeats calculation and compliance logic instead of consuming a single validated calculation result, so UI/PDF drift is possible.
8. **Mobile table is a compressed desktop table.** At narrow widths it relies on horizontal overflow and does not provide full-width layer cards with robust labels, errors, and controls.

## Prioritized implementation scope

### P0 — one validated calculation state and honest wall scope

- Introduce a pure typed calculation engine in the inline script (`calculateModel`) that consumes a validated model and returns either structured validation errors or one immutable result object. DOM rendering, compliance assessment, and PDF export consume that same object.
- Keep draft strings separate from parsed numeric values. Validate conductivity, thickness, area, lengths, Ψ, χ, and integer counts without coercion. Block final result, compliance, and PDF export when required inputs are invalid. Empty assemblies show **Not calculated**.
- Add field-level error messages and `aria-invalid`/described-by wiring. Recalculate on `input` for thickness, lambda, area, bridge values, and counts; never depend on blur.
- Preserve full precision internally. Display engineering precision separately from detailed values. Use unrounded values for comparisons.
- Replace fixed cavity records with explicit cavity data: heat-flow direction (phase 1 wall = horizontal), depth, ventilation class, opening area in mm²/m, surface emissivities, source/provenance, and applicability status. Implement unventilated, slightly ventilated, and well-ventilated handling with explicit boundary treatment. For well-ventilated cavities, exclude the cavity and layers exterior to it from clear-field resistance while retaining them in the assembly display.
- Correct ISO 6946 references to the verified 2017 edition structure: section 6.8 / Table 7 for conventional surface resistances, section 6.9 for air layers, and the relevant Annex C/D/F references. Do not reproduce copyrighted standard text.
- Make all generic material and bridge values explicitly illustrative assumptions. Add source/provenance fields to material and bridge records and show them in the UI/report.
- Replace unconditional compliance chips with versioned rule records and an explicit jurisdiction, building type, element, and compliance-route selector. Initially evaluate only the verified Al Sa’fat January 2023 external-wall Silver/Golden values for the applicable route. Other standards remain **Not verified** or **Not assessed** until evidence and selector scope are present. Remove any rating-award language and blanket “all UAE standards” claims.
- Correct scope language: use “Opaque ACM-clad rainscreen example” rather than curtain wall. Unsupported windows, curtain walls, ground-contact, solar performance, condensation, and whole-building Pearl/LEED rating remain explicitly out of scope.
- Add the controlled numerical fixtures as automated browser-independent engine tests, including the exact values supplied by the request.

### P1 — usable workflow and evidence-rich report

- Reorganize the first screen into project/jurisdiction/element/system/representative-area setup, then Assembly, Thermal bridges, and Review sections while preserving the existing CladWise visual identity and links.
- Put reference area, gross/net convention, dimension convention, and bridge calculation route in the main setup. Keep clear-field U, bridge additions, effective/area-normalized U, rule limit/margin, and status always visible.
- Add searchable material picker behavior, duplicate/reorder/delete, custom material source entry, explicit outside-to-inside labels, preset overwrite warning, local save/load, scenario comparison, and a model-based insulation suggestion only where a verified target exists.
- Replace desktop table compression with mobile layer cards below 560 px; improve contrast, readable text, visible focus, labels for icon buttons, and keyboard operation.
- Refactor PDF export to consume the same result object and include project/date/revision/method/edition, actual inputs, source/provenance, cavity treatment and excluded layers, area conventions, bridge calculations, assumptions, uncertainty, rule evidence, and preliminary/indicative status. Verify multipage layout from generated PDFs.

### Deferred separate methods

Windows/doors will be a separate ISO 10077-1 module using sourced Ug/Uf and component areas; Uf must be a validated input or numerical/test result. Curtain walls will be separate under ISO 12631. Ground-contact calculations will use ISO 13370. Solar and condensation metrics will not be appended to the wall formula.

## Verified standards and rule evidence

- **ISO 6946:2017**: the official ISO scope excludes doors/windows/glazed units, curtain walling, ground-contact components, and designed air permeation; it covers thermally homogeneous layers and an approximate inhomogeneous method, while cases where insulation is bridged by metal can be outside scope. Official metadata confirms the 2017 publication and corrected 2021 English version. Public clause headings identify 6.8 surface resistances and 6.9 air layers. Exact numerical tables remain licensed evidence and will not be copied into the product.
- **ISO 10077-1:2017**: official scope covers windows and pedestrian doors with glazed/opaque panels in frames. It is a separate future module.
- **ISO 10077-2:2017**: official scope covers frame profiles and frame junctions with glazing/opaque panels and excludes frame-to-building-structure thermal bridges. It is a separate future module.
- **Al Sa’fat**: Dubai Municipality’s official page states Silver mandatory requirements apply to new buildings and Golden/Platinum are additional performance requirements. The official January 2023 PDF is titled “Al Sa’fat – Dubai Green Building System-2nd edition, January 2023”. Section 501.01 and Table 501.01(1) state the external-wall/exposed-floor limits are 0.57 W/m²K for Silver and 0.42 W/m²K for Golden/Platinum. Section 501.02 addresses thermal bridges and gives a villa-specific 0.40 W/m²K envelope condition. These rules require jurisdiction/building-type/element scope; they do not establish an Estidama rating.
- **Estidama Pearl**: DMT Information Bulletin #8 is dated 1 February 2011, Version 1.0. RE-R1 provides prescriptive and performance methods. The performance method requires whole-building dynamic modelling against an ASHRAE Appendix G baseline and multiple end uses; a wall U-value alone cannot award a Pearl rating.
- **Barjeel**: the official RAK source states the GBR apply across Ras Al Khaimah, identifies building typologies including individual private villas, and distinguishes Fundamental prescriptive from Comprehensive performance-based regulations. Exact current thermal limit evidence and any private-villa exception must be verified from the authoritative applicable edition before enabling a PASS/FAIL rule.

## Project structure

This repository is a static multi-page site. The existing calculator remains at `u-value-calculator.html` to preserve the public route, identity, navigation, and unrelated pages. Because the current project has no separate build system, the first implementation will use a clearly separated module-like block inside the existing file (`CALCULATION ENGINE`, `STATE/VALIDATION`, `RENDERERS`, `REPORT`) and a small in-file test harness exposed only under a test query flag. A later refactor can extract `u-value-engine.js` without changing the route.

Preview/staging will be a local HTTP server bound to `0.0.0.0` using this repository checkout. Production will not be deployed or pushed until preview evidence is reviewed and approved.

## Design direction

Preserve the current CladWise dark green / engineering-console identity, but make it calmer and more legible: technical editorial typography, high-contrast data cards, explicit status labels, and thin green rules used as orientation markers rather than decoration. Use the existing signature green as the brand color. Interactions should reveal model assumptions and validation state directly beside the input; animation should be limited to short state transitions and must never obscure changed values. The voice should be direct and engineering-specific: “Indicative model — verify source and scope before relying on it” and “Not assessed: select a jurisdiction and applicable route.”

## Preview acceptance evidence

Before requesting approval for production, verify the numerical fixtures, invalid-input blocking, cavity boundary behavior, engine/UI/PDF agreement, keyboard operation, preset overwrite protection, save/load, 390 px and desktop screenshots, and a multipage PDF inspection. Report changed files, unresolved licensed/evidence gaps, exact rule references, staging URL, screenshots, and sample PDF. No production publish is part of this plan.
