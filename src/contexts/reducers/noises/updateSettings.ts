import {
  audioContext,
  brownNoiseGain,
  pinkNoiseGain,
  whiteNoiseGain,
} from '../../../nodesConfig';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import type { Noise_SettingsActions } from '../../types/noises';
import type { NoisesState } from './types';

export function updateSettings(
  state: NoisesState,
  action: Noise_SettingsActions,
): typeof state {
  const { whiteNoise, pinkNoise, brownNoise } = state;
  const { value: newValue } = action.payload;

  if (newValue === undefined) {
    console.error('Update noise settings: no value provided');
    return { ...state };
  }

  // Noise is too loud compared with oscillators volume
  const reducedGainValue =
    roundTwoDigitsNonFinite(newValue) - roundTwoDigitsNonFinite(newValue) * 0.7;

  whiteNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    audioContext.currentTime,
    TIME_CONSTANT,
  );
  pinkNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    audioContext.currentTime,
    TIME_CONSTANT,
  );
  brownNoiseGain.gain.setTargetAtTime(
    reducedGainValue,
    audioContext.currentTime,
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
