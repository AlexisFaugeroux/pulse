import { getAudioGraph } from "../../../audio/audioGraph";
import type { EnvelopeSettings } from "../../../types/types";
import type { Envelope_SettingsActions } from "../../types";

export function updateSettings(
  state: EnvelopeSettings,
  action: Envelope_SettingsActions,
): EnvelopeSettings {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("Could not update envelope settings, audio graph is not uninitialized");
    return state;
  }

  const { id, value } = action.payload;

  if (!id || !value) return state;

  const { nodes: { activeOscillators, activeNoises }} = graph;

  if (id === 'attack') {
    activeOscillators.forEach((oscillator) => oscillator.setAttack(value));
    activeNoises.forEach((noise) => noise.setAttack(value));
    return { ...state, attack: value };
  }
  if (id === 'decay') {
    activeOscillators.forEach((oscillator) => oscillator.setDecay(value));
    activeNoises.forEach((noise) => noise.setDecay(value));
    return { ...state, decay: value };
  }

  if (id === 'sustain') {
    activeOscillators.forEach((oscillator) => oscillator.setSustain(value));
    activeNoises.forEach((noise) => noise.setSustain(value));
    return { ...state, sustain: value };
  }

  if (id === 'release') {
    activeOscillators.forEach((oscillator) => oscillator.setRelease(value));
    activeNoises.forEach((noise) => noise.setRelease(value));
    return { ...state, release: value };
  }
  return state;
}
