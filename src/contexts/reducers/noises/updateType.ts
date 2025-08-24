import { getAudioGraph } from '../../../audio/audioGraph';
import { Noise_Types } from '../../../utils/constants';
import type { Noise_SettingsActions } from '../../types/noises';
import type { NoisesState } from './types';

export function updateType(
  state: NoisesState,
  action: Noise_SettingsActions,
): typeof state {
  const graph = getAudioGraph();
  if (!graph) {
    console.error(
      'Could not update noise type, audio graph is not initialized',
    );
    return state;
  }

  const {
    nodes: { filter, whiteNoiseGain, pinkNoiseGain, brownNoiseGain },
  } = graph;
  const { id } = action.payload;

  if (!id) {
    console.error('Update noise type: no id provided');
    return state;
  }
  if (id === Noise_Types.WHITE) {
    pinkNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    whiteNoiseGain.connect(filter.dryGain);
    whiteNoiseGain.connect(filter.node);

    return {
      ...state,
      pinkNoise: { ...state.pinkNoise, isActive: false },
      brownNoise: { ...state.brownNoise, isActive: false },
    };
  } else if (id === Noise_Types.PINK) {
    whiteNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    pinkNoiseGain.connect(filter.dryGain);
    pinkNoiseGain.connect(filter.node);

    return {
      ...state,
      whiteNoise: { ...state.whiteNoise, isActive: false },
      brownNoise: { ...state.brownNoise, isActive: false },
    };
  } else if (id === Noise_Types.BROWN) {
    whiteNoiseGain.disconnect();
    pinkNoiseGain.disconnect();

    brownNoiseGain.connect(filter.dryGain);
    brownNoiseGain.connect(filter.node);

    return {
      ...state,
      whiteNoise: { ...state.whiteNoise, isActive: false },
      pinkNoise: { ...state.pinkNoise, isActive: false },
    };
  }
  return state;
}
