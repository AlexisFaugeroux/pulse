import { filter } from '../../../nodesConfig';
import type { FilterSettings } from '../../../types/types';
import type { Filter_SettingsActions } from '../../types';

export function updateType(
  state: FilterSettings,
  action: Filter_SettingsActions,
): FilterSettings {
  const { id } = action.payload;
  if (!id) throw new Error('Update filter: no property id provided');

  filter.setType(id as BiquadFilterType);
  return { ...state };
}
