import type { Oscillator_TriggerActions } from '../../types';
import Noise from '../../../utils/classes/noises/Noise';

export function killNoise(
  action: Oscillator_TriggerActions,
  currentNoises: Noise[],
): void {
  const { frequency } = action.payload;

  const activeNoises: Noise[] = [];

  currentNoises.forEach((noise) => {
    frequency === noise.refFrequency ? noise.stop() : activeNoises.push(noise);
  });
  currentNoises = activeNoises;
}
