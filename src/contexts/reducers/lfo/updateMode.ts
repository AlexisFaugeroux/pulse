import { lfo } from '../../../nodesConfig';
import { LFOMode } from '../../../utils/constants';
import type { LFO_SettingsActions } from '../../types';

export function updateMode(
  state: {
    isActive: boolean;
    mode: LFOMode;
    type: OscillatorType;
    frequency: number;
    gain: number;
  },
  action: LFO_SettingsActions,
): typeof state {
  const { mode } = action.payload;

  if (state.isActive && mode) {
    if (mode === LFOMode.TREMOLO) {
      lfo.setTremoloGain(state.gain);
      lfo.setMode(mode);
    } else {
      lfo.setVibratoGain(state.gain);
      lfo.setMode(mode);
    }
    return { ...state, mode };
  }
  return { ...state };
}
