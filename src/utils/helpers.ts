export const roundTwoDigits = (n: number) => {
  return Math.round((n + Number.EPSILON) * 100) / 100;
};

export const roundTwoDigitsNonFinite = (n: number) => {
  return isFinite(n) ? n : Math.round((n + Number.EPSILON) * 100) / 100;
};

export function linearToLinearRange(value: number, newRange: [number, number]) {
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
