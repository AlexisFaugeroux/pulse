import {
  whiteNoiseGain,
  pinkNoiseGain,
  brownNoiseGain,
  audioContext,
  filter,
} from '../../../nodesConfig';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import { NoisesState } from '../noises/types';

export function noisesPresetReducer(preset: NoisesState): NoisesState {
  const { whiteNoise, pinkNoise, brownNoise } = preset;

  if (whiteNoise.isActive) {
    const { gain } = whiteNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) - roundTwoDigitsNonFinite(gain) * 0.7;

    whiteNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      audioContext.currentTime,
      TIME_CONSTANT,
    );

    pinkNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    whiteNoiseGain.connect(filter.dryGain);
    whiteNoiseGain.connect(filter.node);
  } else if (pinkNoise.isActive) {
    const { gain } = pinkNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) - roundTwoDigitsNonFinite(gain) * 0.7;

    pinkNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      audioContext.currentTime,
      TIME_CONSTANT,
    );

    whiteNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    pinkNoiseGain.connect(filter.dryGain);
    pinkNoiseGain.connect(filter.node);
  } else if (brownNoise.isActive) {
    const { gain } = brownNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) - roundTwoDigitsNonFinite(gain) * 0.7;

    brownNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      audioContext.currentTime,
      TIME_CONSTANT,
    );

    whiteNoiseGain.disconnect();
    pinkNoiseGain.disconnect();

    brownNoiseGain.connect(filter.dryGain);
    brownNoiseGain.connect(filter.node);
  }

  return { ...preset };
}
