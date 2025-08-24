import { getAudioNode } from '../../../audio/audioGraph';
import type { FilterSettings } from '../../../types/types';

export function filterPresetReducer(
  state: FilterSettings,
  preset: FilterSettings,
): FilterSettings {
  const filter = getAudioNode('filter');

  if (!filter) {
    console.error('filter node is not initialized');
    return state;
  }

  const { frequency, Q, gain, type } = preset;

  filter.setFrequency(frequency);
  filter.setQ(Q);
  filter.setGain(gain);

  filter.setType(type);

  return { ...preset };
}
