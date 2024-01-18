import {
  audioContext,
  oscAGain,
  oscBGain,
  oscLFOGain,
} from '../../nodesConfig';
import { GainSettings } from '../../types/types';
import { Gain_ActionTypes, Gain_SettingsActions } from '../types';
import { TIME_CONSTANT, roundTwoDigitsNonFinite } from './helpers';

const gainReducer = (state: GainSettings, action: Gain_SettingsActions) => {
  const { value, parent } = action.payload;

  switch (action.type) {
    case Gain_ActionTypes.UpdateSettings:
      if (parent === 'oscillatorA') {
        oscAGain.gain.setTargetAtTime(
          roundTwoDigitsNonFinite(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      } else if (parent === 'oscillatorB') {
        oscBGain.gain.setTargetAtTime(
          roundTwoDigitsNonFinite(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      } else if (parent === 'lfo') {
        oscLFOGain.gain.setTargetAtTime(
          roundTwoDigitsNonFinite(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
      }
      return { ...state };
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default gainReducer;
