import { lfo } from '../../../nodesConfig';
import { LFOMode } from '../../../utils/constants';
import type { LFO_SettingsActions } from '../../types';

export function updateType(
  state: {
    isActive: boolean;
    mode: LFOMode;
    type: OscillatorType;
    frequency: number;
    gain: number;
  },
  action: LFO_SettingsActions,
): typeof state {
  const { id } = action.payload;

  if (!id) {
    console.error('Update LFO type: no id provided');
    return { ...state };
  }

  lfo.setType(id as OscillatorType);
  return { ...state, type: id as OscillatorType };
}
