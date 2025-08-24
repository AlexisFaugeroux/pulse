import { getAudioGraph } from '../../../audio/audioGraph';
import type { EnvelopeSettings } from '../../../types/types';

export function envelopePresetReducer(state: EnvelopeSettings, preset: EnvelopeSettings): EnvelopeSettings {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("Could not update envelope settings, audio graph is not uninitialized");
    return state;
  }

  const { attack, decay, sustain, release } = preset;

  const { nodes: { activeOscillators, activeNoises }} = graph;

  activeOscillators.forEach((oscillator) => oscillator.setAttack(attack));
  activeNoises.forEach((noise) => noise.setAttack(attack));
  activeOscillators.forEach((oscillator) => oscillator.setDecay(decay));
  activeNoises.forEach((noise) => noise.setDecay(decay));

  activeOscillators.forEach((oscillator) => oscillator.setSustain(sustain));
  activeNoises.forEach((noise) => noise.setSustain(sustain));

  activeOscillators.forEach((oscillator) => oscillator.setRelease(release));
  activeNoises.forEach((noise) => noise.setRelease(release));

  return { ...preset };
}
