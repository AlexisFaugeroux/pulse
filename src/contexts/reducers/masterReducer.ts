import { getAudioGraph } from '../../audio/audioGraph';
import { TIME_CONSTANT } from '../../utils/constants';
import { Master_Actions } from '../types/master';

const masterReducer = (
  state: {
    gain: number;
  },
  action: Master_Actions,
): typeof state => {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("Could not update master volume, audio graph is not initialized");
    return state;
  }

  const { ctx, nodes: { masterGain }} = graph;

  masterGain.gain.setTargetAtTime(
    action.payload.value ?? 0,
    ctx.currentTime,
    TIME_CONSTANT,
  );
  return { gain: action.payload.value };
};

export default masterReducer;
