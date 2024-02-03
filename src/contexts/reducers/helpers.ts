import { currentOscillators } from './oscillatorTriggerReducer';

export const TIME_CONSTANT = 0.01;

export const roundTwoDigitsNonFinite = (n: number) => {
  return isFinite(n) ? n : Math.round((n + Number.EPSILON) * 100) / 100;
};

export const roundTwoDigits = (n: number) => {
  return Math.round((n + Number.EPSILON) * 100) / 100;
};

export function linearToLinearRange(value: number, newRange: [number, number]) {
  if (newRange[0] < -40 || newRange[1] > 40) return value;

  const newRangeDistance = newRange[1] - newRange[0];
  return value * newRangeDistance + newRange[0];
}

export function linearToLogarithmRange({
  base,
  value,
  linearRange,
  logarithmicRange,
}: {
  base?: number;
  value: number;
  linearRange: [number, number];
  logarithmicRange: [number, number];
}) {
  const log = base ? (y: number) => Math.log(y) / Math.log(base) : Math.log;

  const exponent =
    (value - linearRange[0] / linearRange[1] - linearRange[0]) *
      (log(logarithmicRange[1]) - log(logarithmicRange[0])) +
    log(logarithmicRange[0]);

  return Math.pow(20, exponent);
}

export const updateEnvelopeActiveOsc = (param: string, value: number) => {
  if (currentOscillators.length > 0) {
    currentOscillators.forEach(({ envelope }) => {
      envelope[param] = value;
    });
    return { param, value };
  }

  return null;
};
