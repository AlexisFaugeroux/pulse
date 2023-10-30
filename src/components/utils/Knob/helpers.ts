export const clampValue = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

export const normalizeValue = (val: number, min: number, max: number) => {
  return (val - min) / (max - min);
};

export function getSupportedPropertyName(properties: string[]) {
  for (let i = 0; i < properties.length; i++)
    if (
      typeof document.body.style[
        properties[i] as keyof typeof document.body.style
      ] !== 'undefined'
    )
      return properties[i];
  return null;
}

export function getTransformProperty() {
  return getSupportedPropertyName([
    'transform',
    'msTransform',
    'webkitTransform',
    'mozTransform',
    'oTransform',
  ]);
}
