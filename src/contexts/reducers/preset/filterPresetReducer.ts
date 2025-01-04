import { filter } from '../../../nodesConfig';
import type { FilterSettings } from '../../../types/types';

export function filterPresetReducer(preset: FilterSettings): FilterSettings {
  const { frequency, Q, gain, type } = preset;

  filter.setFrequency(frequency);
  filter.setQ(Q);
  filter.setGain(gain);

  filter.setType(type);

  return { ...preset };
}
