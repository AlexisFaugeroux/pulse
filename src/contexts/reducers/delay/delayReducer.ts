import { delay } from '../../../nodesConfig';
import { DelaySettings } from '../../../types/types';
import { Delay_ActionTypes, Delay_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';

const delayReducer = (
  state: DelaySettings,
  action: Delay_SettingsActions,
): DelaySettings => {
  switch (action.type) {
    case Delay_ActionTypes.Activate:
      delay.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Delay_ActionTypes.Deactivate:
      delay.deactivate();

      return { ...state, dryGain: 1, isActive: false };

    case Delay_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return { ...state };
  }
};

export default delayReducer;
