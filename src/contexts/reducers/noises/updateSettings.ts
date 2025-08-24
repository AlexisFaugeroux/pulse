import { getAudioGraph } from '../../../audio/audioGraph';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import type { Noise_SettingsActions } from '../../types/noises';
import type { NoisesState } from './types';

export function updateSettings(
  state: NoisesState,
  action: Noise_SettingsActions,
): typeof state {
  const graph = getAudioGraph();
  if (!graph) {
    console.error(
      'Could not update noise settings, audio graph is not initialized',
    );
    return state;
  }

  const { whiteNoise, pinkNoise, brownNoise } = state;
  const { value: newValue } = action.payload;

  if (newValue === undefined) {
    console.error('Update noise settings: no value provided');
    return state;
  }

  // Noise is too loud compared with oscillators volume
  const reducedGainValue =
    roundTwoDigitsNonFinite(newValue) - roundTwoDigitsNonFinite(newValue) * 0.8;

  const {
    ctx,
    nodes: { whiteNoiseGain, pinkNoiseGain, brownNoiseGain },
  } = graph;

  whiteNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    ctx.currentTime,
    TIME_CONSTANT,
  );
  pinkNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    ctx.currentTime,
    TIME_CONSTANT,
  );
  brownNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    ctx.currentTime,
    TIME_CONSTANT,
  );

  return {
    ...state,
    whiteNoise: {
      ...whiteNoise,
      gain: newValue,
    },
    pinkNoise: {
      ...pinkNoise,
      gain: newValue,
    },
    brownNoise: {
      ...brownNoise,
      gain: newValue,
    },
  };
}
