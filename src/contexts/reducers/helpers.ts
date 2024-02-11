import { currentOscillators } from './oscillatorTriggerReducer';

export const updateEnvelopeActiveOsc = (param: string, value: number) => {
  if (currentOscillators.length > 0) {
    currentOscillators.forEach(({ envelope }) => {
      envelope[param] = value;
    });
    return { param, value };
  }

  return null;
};
