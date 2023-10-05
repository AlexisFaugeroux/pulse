export function convertRange(
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number,
) {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

export function getDeg(
  startAngle: number,
  endAngle: number,
  cX: number,
  cY: number,
  pts: {
    x: number;
    y: number;
  },
) {
  const x = cX - pts.x;
  const y = cY - pts.y;

  let deg = (Math.atan(y / x) * 180) / Math.PI;

  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }

  const finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
  return finalDeg;
}
