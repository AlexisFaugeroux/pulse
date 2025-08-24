import { getAudioNode } from "../../../audio/audioGraph";
import type { PhaserSettings } from "../../../types/types";

export function phaserPresetReducer(
  state: PhaserSettings,
  preset: PhaserSettings,
): PhaserSettings {
  const phaser = getAudioNode('phaser');
  if (!phaser) {
    console.error("phaser node is not initialized");
    return state;
  }

  const { isActive, dryGain, wetGain, baseFrequency, rate, depth, q } = preset;

  isActive ? phaser.activate({ dryValue: dryGain, wetValue: wetGain }) : phaser.deactivate();

  phaser.setBaseFrequency(baseFrequency);
  phaser.setRate(rate);
  phaser.setDepth(depth);
  phaser.setQ(q);

  return { ...preset };
}
