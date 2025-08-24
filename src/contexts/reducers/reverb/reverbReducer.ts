import { reverb } from '../../../nodesConfig';
import type { ReverbSettings } from '../../../types/types';
import { Reverb_ActionTypes, type Reverb_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';

const reverbReducer = (
  state: ReverbSettings,
  action: Reverb_SettingsActions,
): ReverbSettings => {
  switch (action.type) {
    case Reverb_ActionTypes.Activate:
      reverb.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Reverb_ActionTypes.Deactivate:
      reverb.deactivate();

      return { ...state, dryGain: 1, isActive: false };

    case Reverb_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return { ...state };
  }
};

export default reverbReducer;
