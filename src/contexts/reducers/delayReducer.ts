import { delay } from '../../nodesConfig';
import { DelaySettings } from '../../types/types';
import { Delay_ActionTypes, Delay_SettingsActions } from '../types';

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

    case Delay_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'time') {
        delay.setTime(value);

        return { ...state, time: value };
      }

      if (id === 'feedback') {
        delay.setFeedback(value);

        return { ...state, feedback: value };
      }

      if (id === 'mix' && state.isActive) {
        const newDryValue = 1 - value;
        delay.setDryGain(newDryValue);
        delay.setWetGain(value);

        return {
          ...state,
          dryGain: newDryValue,
          wetGain: value,
        };
      }
      return { ...state };
    }
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default delayReducer;
