# CladWise U-value Calculator — implementation TODO

## P0: Validated calculation engine and one calculation state

- Separate a pure, typed calculation engine from DOM rendering. Use one validated model for the layer table, R breakdown, U result, compliance assessment and PDF. Editing thickness or conductivity updates every relevant cell immediately, without requiring blur.
- Reject blank, non-finite, zero or negative conductivity, non-positive thickness and area, negative lengths, and negative/non-integer fixing counts. Keep draft field text separate from valid numeric values. Never silently replace area 0 with 1, ignore an invalid layer, truncate a fixing count, or issue PASS/FAIL from partial data.
- Allow a supported negative Ψ only with an explicit dimension convention and source. Never confuse a negative Ψ with permission for negative lengths or area.
- Mark invalid fields with clear reasons. Hide the final result and disable compliance assessment and report export until required inputs are valid. For no layers show “Not calculated”, not FAIL badges.
- Preserve full calculation precision internally. Show sensible engineering precision, input provenance and uncertainty. Compare compliance using unrounded values. Implement selected-standard reporting rounding separately from detailed numerical view.

## P0: Air-cavity physics and wall scope

- Replace fixed-R cavity records with a cavity model containing orientation, depth, ventilation class, opening area with explicit units, surface emissivities and applicability limits.
- Distinguish unventilated, slightly ventilated, and well-ventilated cavities. “Drained” does not establish ventilation class.
- Use verified ISO 6946:2017 references for clauses 6.8 and 6.9 and relevant annexes. In the 2017 edition conventional surface resistances are referenced to Table 7, not Table 1.
- For well-ventilated cavities, exclude cavity resistance and layers on the cavity’s exterior side from clear-field resistance while retaining them visually. Apply the standard’s still-air boundary resistance at the cavity-facing surface. Explain excluded layers and why.
- Implement slightly ventilated interpolation and unventilated depth/heat-flow/emissivity handling; do not use d/λ for air or one fixed R for every depth.
- Prompt for unknown ventilation. Phase 1 is horizontal heat flow for opaque external walls/rainscreens. Do not use the wall formula for ground-contact, roofs, exposed floors, windows, curtain walls, solar performance, or condensation.

## P0: Honest materials, bridges, and rules

- Label generic conductivity values and bridge presets as illustrative assumptions. Store source URL/document, publisher/manufacturer, product, density where relevant, declared/design status, reference temperature/moisture, ageing status, edition/date and applicable range.
- Keep linear and point bridges, make reference area visible in the main setup, require representative zone dimensions, and state gross/net area plus dimension convention. Distinguish total fixing count from fixings/m².
- Distinguish clear-field U, applicable Annex F corrections, and H = Σ(UᵢAᵢ) + Σ(ΨL) + Σ(χn). Do not double-count bridges. Only report area-normalized effective U where boundary and reference area are defined.
- Require qualified or sourced Ψ/χ values with source, geometry, insulation thickness and convention. Indicative presets produce indicative results and suppress authoritative compliance conclusions.
- Add validated ISO 6946 upper/lower resistance combined method for applicable inhomogeneous layers, with fractions summing to 1, error and applicability checks. Do not call a serial sum the combined method.
- Replace hardcoded compliance chips with versioned rule records and jurisdiction/building-type/element/compliance-route selectors. Missing evidence is “Not verified”; wrong scope is “Not applicable”.
- Remove Estidama rating claims from one wall U-value. Distinguish PBRS/PVRS and prescriptive/performance paths.
- Verify Al Sa’fat against Dubai Municipality’s January 2023 second edition. Verify Barjeel’s current applicable edition and private-villa exception before enabling a rule. Do not assert one value meets all UAE standards.

## P1: Workflow and evidence-rich report

- First screen: project/jurisdiction, element/system type, representative area, then illustrative assembly or custom assembly.
- Use Assembly, Thermal bridges, Review sections and always-visible clear-field U, bridge additions, effective U, selected limit/margin, and valid/indicative/not-assessed status.
- Add searchable material picker, plain-language units, custom source entry, duplicate/reorder/delete, undo, and labelled outside-to-inside cross-section.
- At 390 px use full-width layer cards. Ensure names, values, units, errors, delete controls, focus, keyboard support, and contrast are usable.
- Warn before preset overwrite. Add local save/load and scenario comparison. Make insulation suggestions model- and scope-aware.
- PDF includes project, date, revision, method/edition, actual inputs and sources, cavity/excluded-layer treatment, area conventions, bridges, assumptions, uncertainty, evaluated rule clause, result/margin, and preliminary/indicative status. Inspect multipage layout.

## Mandatory controlled regression fixtures

- Homogeneous wall: 200 mm concrete λ 1.7 + 80 mm wool λ 0.036, Rse 0.04, Rsi 0.13, no bridges: RT 2.5098692810457517 and U 0.3984271242936382 W/m²K.
- Add Ψ 0.06 W/mK and L 1 m: area 1 m² effective U 0.4584271242936382; area 2 m² effective U 0.4284271242936382. Area 0/negative blocks.
- GFRC fixture with 50 mm well-ventilated cavity: RT 2.7683174603174603, Uclear 0.3612302470126832; with illustrative Ψ/χ additions 0.5512302470126832. Verification fixture only.
- GFRC 25→50 mm updates included R 0.0333333333→0.0666666667 everywhere; excluded outer cladding thickness does not alter well-ventilated clear-field U.
- Blank/zero/negative λ, blank/negative thickness, negative/zero area, non-integer/negative fixing count: no final result, no PASS/FAIL, no export. Empty assembly: Not calculated.
- Verify cavity boundaries, inhomogeneous fractions, bridge sign/dimensions, double counting, and threshold-near rounding.
- Arithmetic-only single-window fixture: Ag 1.5, Ug 1.1, Af .3, Uf 2.0, lg 5, Ψg .04 gives Uw 1.3611111111111112 W/m²K, without implying certification.
- Engine/UI/PDF agree. Test unrounded comparisons, unknown rules, mobile 390 px, desktop, keyboard-only, reset, overwrite warning, save/load, and long PDF tables.
