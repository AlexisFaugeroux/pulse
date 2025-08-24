import { phaser } from "../../../nodesConfig";
import type { PhaserSettings } from "../../../types/types";

export function phaserPresetReducer(
  preset: PhaserSettings,
): PhaserSettings {
  const { isActive, dryGain, wetGain, baseFrequency, rate, depth, q } = preset;

  isActive ? phaser.activate({ dryValue: dryGain, wetValue: wetGain }) : phaser.deactivate();

  phaser.setBaseFrequency(baseFrequency);
  phaser.setRate(rate);
  phaser.setDepth(depth);
  phaser.setQ(q);

  return { ...preset };
}
