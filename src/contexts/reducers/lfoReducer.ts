import { lfo } from '../../nodesConfig';
import { LFOMode } from '../../utils/constants';
import { LFO_SettingsActionTypes, type LFO_SettingsActions } from '../types';

const LFOReducer = (
  state: {
    isActive: boolean;
    mode: LFOMode;
    type: OscillatorType;
    frequency: number;
    gain: number;
  },
  action: LFO_SettingsActions,
): typeof state => {
  const { id, value, mode } = action.payload;

  switch (action.type) {
    case LFO_SettingsActionTypes.Activate:
      lfo.activate({ gain: state.gain });
      return { ...state, isActive: true };

    case LFO_SettingsActionTypes.Deactivate:
      lfo.deactivate();
      return { ...state, isActive: false };

    case LFO_SettingsActionTypes.UpdateMode:
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

    case LFO_SettingsActionTypes.UpdateSettings:
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

    case LFO_SettingsActionTypes.UpdateType:
      if (!id) {
        console.error('Update LFO type: no id provided');
        return { ...state };
      }

      lfo.setType(id as OscillatorType);
      return { ...state, type: id as OscillatorType };

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};
export default LFOReducer;
