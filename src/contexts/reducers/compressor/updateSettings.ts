import { getAudioNode } from '../../../audio/audioGraph';
import type { CompressorSettings } from '../../../types/types';
import type { Compressor_SettingsActions } from '../../types';

export function updateSettings(
  state: CompressorSettings,
  action: Compressor_SettingsActions,
): CompressorSettings {
  const compressor = getAudioNode('compressor');

  if (!compressor) {
    console.error("compressor node is not initialized");
    return state;
  }

  const { id, value } = action.payload;
  if (!id || !value) return state;

  if (id === 'mix' && state.isActive) {
    const newDryValue = 1 - value;
    compressor.setDryGain(newDryValue);
    compressor.setWetGain(value);

    return { ...state, dryGain: newDryValue, wetGain: value };
  }

  if (id === 'thresh.') {
    compressor.setThreshold(value);
    return { ...state, threshold: value };
  }

  if (id === 'ratio') {
    compressor.setRatio(value);
    return { ...state, ratio: value };
  }

  if (id === 'knee') {
    compressor.setKnee(value);
    return { ...state, knee: value };
  }

  if (id === 'attack') {
    compressor.setAttack(value);
    return { ...state, attack: value };
  }

  if (id === 'release') {
    compressor.setRelease(value);
    return { ...state, release: value };
  }

  return state;
}
