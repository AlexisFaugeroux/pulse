import {
  audioContext,
  delay,
  delayDryGain,
  delayMixGain,
  delayWetGain,
  feedback,
} from '../../nodesConfig';
import { DelaySettings } from '../../types/types';
import { Delay_ActionTypes, Delay_SettingsActions } from '../types';
import { TIME_CONSTANT, linearToLinearRange, roundTwoDigits } from './helpers';

const delayReducer = (
  state: DelaySettings,
  action: Delay_SettingsActions,
): DelaySettings => {
  const { currentTime } = audioContext;

  switch (action.type) {
    case Delay_ActionTypes.Activate:
      delayWetGain.connect(delayMixGain);

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Delay_ActionTypes.Deactivate:
      delayWetGain.disconnect();

      return { ...state, dryGain: 1, isActive: false };

    case Delay_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'time') {
        const convertedValue = linearToLinearRange(value, [0, 2]);
        delay.delayTime.setTargetAtTime(
          convertedValue,
          currentTime,
          TIME_CONSTANT,
        );

        return { ...state, [id]: convertedValue };
      } else if (id === 'feedback') {
        feedback.gain.setTargetAtTime(value, currentTime, TIME_CONSTANT);

        return { ...state };
      } else if (id === 'mix' && state.isActive) {
        const newDryValue = roundTwoDigits(1 - value);

        delayDryGain.gain.setValueAtTime(
          newDryValue,
          currentTime + TIME_CONSTANT,
        );
        delayWetGain.gain.setValueAtTime(
          // Input value based on mouse drag has precision issue, value is often not 0 when input visually is
          value < 0.03 ? 0 : roundTwoDigits(value),
          currentTime + TIME_CONSTANT,
        );

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
