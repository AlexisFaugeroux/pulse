import type { EnvelopeSettings } from '../../../types/types';
import {
  currentNoises,
  currentOscillators,
} from '../oscillators/oscillatorTriggerReducer';

export function envelopePresetReducer(preset: EnvelopeSettings): EnvelopeSettings {
  const { attack, decay, sustain, release } = preset;

  currentOscillators.forEach((oscillator) => oscillator.setAttack(attack));
  currentNoises.forEach((noise) => noise.setAttack(attack));
  currentOscillators.forEach((oscillator) => oscillator.setDecay(decay));
  currentNoises.forEach((noise) => noise.setDecay(decay));

  currentOscillators.forEach((oscillator) => oscillator.setSustain(sustain));
  currentNoises.forEach((noise) => noise.setSustain(sustain));

  currentOscillators.forEach((oscillator) => oscillator.setRelease(release));
  currentNoises.forEach((noise) => noise.setRelease(release));

  return { ...preset };
}
