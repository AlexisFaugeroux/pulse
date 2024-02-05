import { audioContext, delay } from '../../nodesConfig';
import { DelaySettings } from '../../types/types';
import { Delay_ActionTypes, Delay_SettingsActions } from '../types';
import { TIME_CONSTANT, linearToLinearRange, roundTwoDigits } from './helpers';

const delayReducer = (
  state: DelaySettings,
  action: Delay_SettingsActions,
): DelaySettings => {
  const { currentTime } = audioContext;
  const { node, feedback, dryGain, wetGain, mixGain } = delay;

  if (!node) throw new Error('Delay reducer: node is null');

  switch (action.type) {
    case Delay_ActionTypes.Activate:
      wetGain.connect(mixGain);
      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Delay_ActionTypes.Deactivate:
      wetGain.disconnect();
      return { ...state, dryGain: 1, isActive: false };

    case Delay_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'time') {
        const convertedValue = linearToLinearRange(value, [0, 2]);
        node.delayTime.setTargetAtTime(
          convertedValue,
          currentTime,
          TIME_CONSTANT,
        );

        return { ...state, time: convertedValue };
      }

      if (id === 'feedback') {
        feedback.gain.setTargetAtTime(value, currentTime, TIME_CONSTANT);
        return { ...state, feedback: value };
      }

      if (id === 'mix' && state.isActive) {
        const newDryValue = roundTwoDigits(1 - value);
        dryGain.gain.setValueAtTime(newDryValue, currentTime + TIME_CONSTANT);
        wetGain.gain.setValueAtTime(
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
