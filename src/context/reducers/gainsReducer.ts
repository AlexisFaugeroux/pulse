import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { Gain_ActionTypes, Gain_SettingsActions } from '../types';

const TIME_CONSTANT = 0.01;

function normalizeValue(n: number) {
  return isFinite(n) ? n : Math.round((n + Number.EPSILON) * 100) / 100;
}

const gainsReducer = (
  state: {
    oscAGainValue: number;
    oscBGainValue: number;
  },
  action: Gain_SettingsActions,
) => {
  const { value, parent } = action.payload;

  switch (action.type) {
    case Gain_ActionTypes.UpdateSettings:
      if (parent === 'oscillatorA') {
        oscAGain.gain.setTargetAtTime(
          normalizeValue(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
        return { ...state };
      } else if (parent === 'oscillatorB') {
        oscBGain.gain.setTargetAtTime(
          normalizeValue(value),
          audioContext.currentTime,
          TIME_CONSTANT,
        );
        return { ...state };
      } else {
        return { ...state };
      }
    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export default gainsReducer;
