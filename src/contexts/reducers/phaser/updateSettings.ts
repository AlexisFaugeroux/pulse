import { getAudioNode } from '../../../audio/audioGraph';
import type { PhaserSettings } from '../../../types/types';
import type { Phaser_SettingsActions } from '../../types';

export function updateSettings(
  state: PhaserSettings,
  action: Phaser_SettingsActions,
): PhaserSettings {
  const phaser = getAudioNode('phaser');
  if (!phaser) {
    console.error("phaser node is not initialized");
    return state;
  }

  const { id, value } = action.payload;

  if (!id || !value) return { ...state };
  if (id === 'base.freq') {
    phaser.setBaseFrequency(value);
    return { ...state, baseFrequency: value };
  }
  if (id === 'rate') {
    phaser.setRate(value);
    return { ...state, rate: value };
  }
  if (id === 'depth') {
    phaser.setDepth(value);
    return { ...state, depth: value };
  }
  if (id === 'Q') {
    phaser.setQ(value);
    return { ...state, q: value };
  }
  if (id === 'mix' && state.isActive) {
    const newDryValue = 1 - value;
    phaser.setDryGain(newDryValue);
    phaser.setWetGain(value);

    return {
      ...state,
      dryGain: newDryValue,
      wetGain: value,
    };
  }
  return state;
}
