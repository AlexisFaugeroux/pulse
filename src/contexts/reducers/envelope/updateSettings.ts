import type { EnvelopeSettings } from "../../../types/types";
import type { Envelope_SettingsActions } from "../../types";
import { currentNoises, currentOscillators } from "../oscillators/oscillatorTriggerReducer";

export function updateSettings(
  state: EnvelopeSettings,
  action: Envelope_SettingsActions,
): EnvelopeSettings {
  const { id, value } = action.payload;

  if (!id || !value) return state;

  if (id === 'attack') {
    currentOscillators.forEach((oscillator) => oscillator.setAttack(value));
    currentNoises.forEach((noise) => noise.setAttack(value));
    return { ...state, attack: value };
  }
  if (id === 'decay') {
    currentOscillators.forEach((oscillator) => oscillator.setDecay(value));
    currentNoises.forEach((noise) => noise.setDecay(value));
    return { ...state, decay: value };
  }

  if (id === 'sustain') {
    currentOscillators.forEach((oscillator) => oscillator.setSustain(value));
    currentNoises.forEach((noise) => noise.setSustain(value));
    return { ...state, sustain: value };
  }

  if (id === 'release') {
    currentOscillators.forEach((oscillator) => oscillator.setRelease(value));
    currentNoises.forEach((noise) => noise.setRelease(value));
    return { ...state, release: value };
  }
  return state;
}
