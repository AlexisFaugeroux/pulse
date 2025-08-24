import type { Oscillator_TriggerActions } from '../../types';
import type { OscillatroTriggerState } from './types';
import WhiteNoise from '../../../utils/classes/noises/WhiteNoise';
import PinkNoise from '../../../utils/classes/noises/PinkNoise';
import BrownNoise from '../../../utils/classes/noises/BrownNoise';
import Noise from '../../../utils/classes/noises/Noise';
import { getAudioGraph } from '../../../audio/audioGraph';

export function createNoise(
  state: OscillatroTriggerState,
  action: Oscillator_TriggerActions,
  currentNoises: Noise[],
  defaultEnvelopeSettings: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  },
): void {
  const graph = getAudioGraph();
  if (!graph) {
    console.error(
      'Could not create noise, audio graph is not initialized',
    );
    return ;
  }
  const {
    noises: { whiteNoise, pinkNoise, brownNoise },
    envelope,
  } = state;
  const { frequency } = action.payload;

  if (!frequency) {
    console.error('Create noise: frequency not provided');
    return;
  }
  const {
    ctx,
    nodes: { whiteNoiseGain, pinkNoiseGain, brownNoiseGain },
  } = graph;

  if (whiteNoise.isActive) {
    const newWhiteNoise = new WhiteNoise(
      ctx,
      whiteNoiseGain,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      frequency,
    );
    newWhiteNoise
      .init()
      .then(() => currentNoises.push(newWhiteNoise))
      .catch((e) => console.error(e));
  } else if (pinkNoise.isActive) {
    const newPinkNoise = new PinkNoise(
      ctx,
      pinkNoiseGain,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      frequency,
    );
    newPinkNoise
      .init()
      .then(() => currentNoises.push(newPinkNoise))
      .catch((e) => console.error(e));
    currentNoises.push(newPinkNoise);
  } else if (brownNoise.isActive) {
    const newBrownNoise = new BrownNoise(
      ctx,
      brownNoiseGain,
      envelope.isActive
        ? envelope
        : { isActive: false, ...defaultEnvelopeSettings },
      frequency,
    );
    newBrownNoise
      .init()
      .then(() => currentNoises.push(newBrownNoise))
      .catch((e) => console.log(e));
    currentNoises.push(newBrownNoise);
  }
}
