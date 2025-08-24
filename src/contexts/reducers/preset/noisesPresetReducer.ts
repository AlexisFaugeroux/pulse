import { getAudioGraph } from '../../../audio/audioGraph';
import { TIME_CONSTANT } from '../../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import { NoisesState } from '../noises/types';

export function noisesPresetReducer(state: NoisesState, preset: NoisesState): NoisesState {
  const graph = getAudioGraph();
  if (!graph) {
    console.error(
      'Could not update noise settings, audio graph is not initialized',
    );
    return state;
  }

  const { whiteNoise, pinkNoise, brownNoise } = preset;

  const {
    ctx,
    nodes: { filter, whiteNoiseGain, pinkNoiseGain, brownNoiseGain },
  } = graph;

  if (whiteNoise.isActive) {
    const { gain } = whiteNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) * 0.5;

    whiteNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      ctx.currentTime,
      TIME_CONSTANT,
    );

    pinkNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    whiteNoiseGain.connect(filter.dryGain);
    whiteNoiseGain.connect(filter.node);

    return { ...preset };
  } else if (pinkNoise.isActive) {
    const { gain } = pinkNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) * 0.5;

    pinkNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      ctx.currentTime,
      TIME_CONSTANT,
    );

    whiteNoiseGain.disconnect();
    brownNoiseGain.disconnect();

    pinkNoiseGain.connect(filter.dryGain);
    pinkNoiseGain.connect(filter.node);
  
    return { ...preset };
  } else if (brownNoise.isActive) {
    const { gain } = brownNoise;

    const reducedGainValue =
      roundTwoDigitsNonFinite(gain) * 0.5;

    brownNoiseGain.gain.setTargetAtTime(
      reducedGainValue,
      ctx.currentTime,
      TIME_CONSTANT,
    );

    whiteNoiseGain.disconnect();
    pinkNoiseGain.disconnect();

    brownNoiseGain.connect(filter.dryGain);
    brownNoiseGain.connect(filter.node);
  
    return { ...preset };
  }

  return state;
}
