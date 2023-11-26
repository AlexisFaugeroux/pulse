import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { Gain_ActionTypes, Gain_SettingsActions } from '../types';

const TIME_CONSTANT = 0.01;

const gainsReducer = (
  state: {
    oscAGainValue: number;
    oscBGainValue: number;
  },
  action: Gain_SettingsActions,
) => {
  switch (action.type) {
    case Gain_ActionTypes.UpdateSettings:
      if (action.payload.parent === 'oscillatorA') {
        oscAGain.gain.setTargetAtTime(
          action.payload.value,
          audioContext.currentTime,
          TIME_CONSTANT,
        );
        return { ...state };
      } else {
        oscBGain.gain.setTargetAtTime(
          action.payload.value,
          audioContext.currentTime,
          TIME_CONSTANT,
        );
        return { ...state };
      }
    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};

export default gainsReducer;
