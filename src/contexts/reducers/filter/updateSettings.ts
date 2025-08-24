import { filter } from '../../../nodesConfig';
import type { FilterSettings } from '../../../types/types';
import type { Filter_SettingsActions } from '../../types';

export function updateSettings(
  state: FilterSettings,
  action: Filter_SettingsActions,
): FilterSettings {
  const { id, value } = action.payload;
  if (!value) return { ...state };

  if (id === 'cutoff') {
    filter.setFrequency(value);
    return { ...state, frequency: value };
  }

  if (id === 'Q') {
    filter.setQ(value);
    return { ...state, Q: value };
  }

  if (id === 'gain') {
    filter.setGain(value);
    return { ...state, gain: value };
  }
  return { ...state };
}
