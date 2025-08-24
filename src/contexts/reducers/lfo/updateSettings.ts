import { lfo } from '../../../nodesConfig';
import { LFOMode } from '../../../utils/constants';
import type { LFO_SettingsActions } from '../../types';

export function updateSettings(
  state: {
    isActive: boolean;
    mode: LFOMode;
    type: OscillatorType;
    frequency: number;
    gain: number;
  },
  action: LFO_SettingsActions,
): typeof state {
  const { id, value } = action.payload;

  if (!value) return { ...state };

  if (id === 'rate') {
    lfo.setRate(value);
    return { ...state, frequency: value };
  }

  if (id === 'level') {
    state.mode === LFOMode.TREMOLO
      ? lfo.setTremoloGain(value)
      : lfo.setVibratoGain(value);

    return { ...state, gain: value };
  }
  return { ...state };
}
