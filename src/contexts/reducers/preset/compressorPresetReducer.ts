import { compressor } from "../../../nodesConfig";
import type { CompressorSettings } from "../../../types/types";

export function compressorPresetReducer(
  preset: CompressorSettings,
): CompressorSettings {
  const { isActive, dryGain, wetGain, threshold, ratio, knee, attack, release } = preset;

  isActive ? compressor.activate({ dryValue: dryGain, wetValue: wetGain }) : compressor.deactivate();

  compressor.setThreshold(threshold);
  compressor.setRatio(ratio);
  compressor.setKnee(knee);
  compressor.setAttack(attack);
  compressor.setRelease(release);

  return { ...preset };
}
