/* CladWise U-value engine — pure model/calculation functions. */
(function (global) {
  'use strict';

  const STANDARD = { id: 'iso-6946-2017', edition: 'ISO 6946:2017', wallHeatFlow: 'horizontal' };
  const SIGMA = 5.670374419e-8;
  const DEFAULTS = { rse: 0.04, rsi: 0.13, meanTemperatureK: 293.15 };

  function issue(path, message) { return { path, message }; }
  function isFiniteNumber(v) { return typeof v === 'number' && Number.isFinite(v); }
  function number(value) { return typeof value === 'number' ? value : Number(value); }
  function requiredPositive(value, path, label, allowZero) {
    const n = number(value);
    if (!isFiniteNumber(n) || (!allowZero && n <= 0) || (allowZero && n < 0)) return issue(path, `${label} must be a finite ${allowZero ? 'non-negative' : 'positive'} number.`);
    return null;
  }
  function validSource(source) {
    return source && typeof source === 'object' && String(source.label || '').trim() && String(source.url || '').trim();
  }

  function cavityResistance(cavity) {
    const d = number(cavity.depthMm) / 1000;
    const e1 = number(cavity.emissivity1), e2 = number(cavity.emissivity2);
    const effectiveEmissivity = 1 / (1 / e1 + 1 / e2 - 1);
    const hr = effectiveEmissivity * 4 * SIGMA * Math.pow(DEFAULTS.meanTemperatureK, 3);
    const ha = Math.max(0.025 / d, 1.25);
    const unventilated = 1 / (ha + hr);
    const open = number(cavity.openingAreaMm2PerM);
    if (cavity.ventilation === 'well') return { value: 0, unventilated, hr, ha, excluded: true, boundaryResistance: DEFAULTS.rsi };
    if (cavity.ventilation === 'slightly') {
      const fraction = Math.min(1, Math.max(0, (open - 500) / 1000));
      return { value: unventilated * (1 - fraction), unventilated, hr, ha, interpolation: fraction, excluded: false };
    }
    return { value: unventilated, unventilated, hr, ha, excluded: false };
  }

  function validateModel(model) {
    const errors = [];
    if (!model || typeof model !== 'object') return [issue('model', 'A calculation model is required.')];
    if (!Array.isArray(model.layers)) errors.push(issue('layers', 'Assembly layers are required.'));
    if (!model.layers || model.layers.length === 0) errors.push(issue('layers', 'Add at least one assembly layer.'));
    const areaError = requiredPositive(model.referenceArea, 'referenceArea', 'Reference area');
    if (areaError) errors.push(areaError);
    if (!['internal', 'external'].includes(model.dimensionConvention)) errors.push(issue('dimensionConvention', 'Choose an internal or external dimension convention.'));
    if (model.ventilationUnknown) errors.push(issue('cavity.ventilation', 'Select a cavity ventilation class before calculating.'));

    let cavityCount = 0;
    (model.layers || []).forEach((layer, index) => {
      const p = `layers.${index}`;
      const tErr = requiredPositive(layer.draftThickness ?? layer.thicknessMm, `${p}.thicknessMm`, 'Thickness');
      if (tErr) errors.push(tErr);
      if (layer.kind === 'cavity') {
        cavityCount += 1;
        const dErr = requiredPositive(layer.cavity?.depthMm, `${p}.cavity.depthMm`, 'Cavity depth');
        if (dErr) errors.push(dErr);
        const e1Err = requiredPositive(layer.cavity?.emissivity1, `${p}.cavity.emissivity1`, 'First surface emissivity');
        const e2Err = requiredPositive(layer.cavity?.emissivity2, `${p}.cavity.emissivity2`, 'Second surface emissivity');
        if (e1Err || number(layer.cavity?.emissivity1) > 1) errors.push(e1Err || issue(`${p}.cavity.emissivity1`, 'Emissivity must be between 0 and 1.'));
        if (e2Err || number(layer.cavity?.emissivity2) > 1) errors.push(e2Err || issue(`${p}.cavity.emissivity2`, 'Emissivity must be between 0 and 1.'));
        if (!['unventilated', 'slightly', 'well'].includes(layer.cavity?.ventilation)) errors.push(issue(`${p}.cavity.ventilation`, 'Choose unventilated, slightly ventilated, or well ventilated.'));
        if (['slightly', 'well'].includes(layer.cavity?.ventilation)) {
          const oErr = requiredPositive(layer.cavity?.openingAreaMm2PerM, `${p}.cavity.openingAreaMm2PerM`, 'Opening area', true);
          if (oErr) errors.push(oErr);
        }
        if (!validSource(layer.source)) errors.push(issue(`${p}.source`, 'Add a source URL/document for the cavity model.'));
      } else {
        const lErr = requiredPositive(layer.draftLambda ?? layer.lambda, `${p}.lambda`, 'Conductivity');
        if (lErr) errors.push(lErr);
        if (!validSource(layer.source)) errors.push(issue(`${p}.source`, 'Add a source URL/document or mark this value as an illustrative assumption.'));
      }
    });
    if (cavityCount > 1) errors.push(issue('layers', 'Use one explicit cavity model per assembly calculation in phase 1.'));

    (model.psi || []).forEach((bridge, index) => {
      const p = `psi.${index}`;
      const vErr = requiredPositive(bridge.draftValue ?? bridge.value, `${p}.value`, 'Ψ value', true);
      const lErr = requiredPositive(bridge.draftLength ?? bridge.lengthM, `${p}.lengthM`, 'Ψ length');
      if (vErr) errors.push(vErr);
      if (lErr) errors.push(lErr);
      if (bridge.value < 0 && (!bridge.dimensionConvention || !validSource(bridge.source))) errors.push(issue(p, 'A negative Ψ requires an explicit dimension convention and source.'));
    });
    (model.chi || []).forEach((bridge, index) => {
      const p = `chi.${index}`;
      const vErr = requiredPositive(bridge.draftValue ?? bridge.value, `${p}.value`, 'χ value', true);
      const cErr = requiredPositive(bridge.draftCount ?? bridge.count, `${p}.count`, 'Fixing count');
      if (vErr) errors.push(vErr);
      if (cErr || !Number.isInteger(number(bridge.count))) errors.push(cErr || issue(`${p}.count`, 'Fixing count must be a non-negative integer.'));
    });
    return errors;
  }

  function calculateModel(model) {
    const errors = validateModel(model);
    if (errors.length) return { valid: false, errors, status: 'invalid' };
    const layers = model.layers.map((layer) => ({ ...layer, thicknessMm: number(layer.draftThickness ?? layer.thicknessMm), lambda: number(layer.draftLambda ?? layer.lambda) }));
    const cavityIndex = layers.findIndex((layer) => layer.kind === 'cavity');
    const cavity = cavityIndex >= 0 ? cavityResistance(layers[cavityIndex].cavity) : null;
    const wellCavity = cavity && cavity.excluded;
    const rows = layers.map((layer, index) => {
      const beforeWellCavity = wellCavity && index <= cavityIndex;
      const r = layer.kind === 'cavity' ? cavity.value : layer.thicknessMm / 1000 / layer.lambda;
      return { ...layer, r, included: !beforeWellCavity, exclusionReason: beforeWellCavity ? (index === cavityIndex ? 'Well-ventilated cavity resistance excluded.' : 'Layer exterior to well-ventilated cavity excluded.') : null };
    });
    const includedRows = rows.filter(row => row.included);
    const rBoundary = wellCavity ? DEFAULTS.rsi : DEFAULTS.rse;
    const totalR = rBoundary + includedRows.reduce((sum, row) => sum + row.r, 0) + DEFAULTS.rsi;
    const clearU = 1 / totalR;
    const area = number(model.referenceArea);
    const psiDelta = (model.psi || []).reduce((sum, bridge) => sum + number(bridge.value) * number(bridge.lengthM) / area, 0);
    const chiDelta = (model.chi || []).reduce((sum, bridge) => sum + number(bridge.value) * number(bridge.count) / area, 0);
    const effectiveU = clearU + psiDelta + chiDelta;
    const result = { valid: true, status: model.indicative ? 'indicative' : 'valid', errors: [], rows, cavity, rBoundary, totalR, clearU, psiDelta, chiDelta, effectiveU, area, standard: STANDARD };
    if (model.rule) {
      const comparable = !model.indicative && model.rule.element === 'opaque-external-wall' && model.rule.route === 'prescriptive' && model.rule.verified;
      result.compliance = comparable ? { status: effectiveU <= model.rule.limit ? 'pass' : 'fail', limit: model.rule.limit, margin: model.rule.limit - effectiveU, rule: model.rule } : { status: 'not-assessed', rule: model.rule };
    } else result.compliance = { status: 'not-assessed' };
    return result;
  }

  function rounded(value, digits) { return Number(value.toFixed(digits)); }
  global.CladWiseEngine = { STANDARD, DEFAULTS, validateModel, calculateModel, cavityResistance, rounded };
})(window);
