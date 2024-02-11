import { audioContext, masterGain } from '../../nodesConfig';
import { TIME_CONSTANT } from '../../utils/constants';
import { Master_Actions } from '../types/master';

const masterReducer = (
  state: {
    gain: number;
  },
  action: Master_Actions,
): typeof state => {
  masterGain.gain.setTargetAtTime(
    action.payload.value,
    audioContext.currentTime,
    TIME_CONSTANT,
  );
  return { gain: action.payload.value };
};

export default masterReducer;
