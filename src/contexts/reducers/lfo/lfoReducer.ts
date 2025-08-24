import { lfo } from '../../../nodesConfig';
import { LFOMode } from '../../../utils/constants';
import { LFO_SettingsActionTypes, type LFO_SettingsActions } from '../../types';
import { updateMode } from './updateMode';
import { updateSettings } from './updateSettings';
import { updateType } from './updateType';

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
  switch (action.type) {
    case LFO_SettingsActionTypes.Activate:
      lfo.activate({ gain: state.gain });
      return { ...state, isActive: true };

    case LFO_SettingsActionTypes.Deactivate:
      lfo.deactivate();
      return { ...state, isActive: false };

    case LFO_SettingsActionTypes.UpdateMode:
      return updateMode(state, action);

    case LFO_SettingsActionTypes.UpdateSettings:
      return updateSettings(state, action);

    case LFO_SettingsActionTypes.UpdateType:
      return updateType(state, action);

    default:
      console.error('Reducer error action: ', action);
      return { ...state };
  }
};
export default LFOReducer;
