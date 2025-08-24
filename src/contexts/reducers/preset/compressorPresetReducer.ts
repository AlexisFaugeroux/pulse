import { getAudioNode } from "../../../audio/audioGraph";
import type { CompressorSettings } from "../../../types/types";

export function compressorPresetReducer(
  state: CompressorSettings,
  preset: CompressorSettings,
): CompressorSettings {
  const compressor = getAudioNode('compressor');

  if (!compressor) {
    console.error("compressor node is not initialized");
    return state;
  }

  const { isActive, dryGain, wetGain, threshold, ratio, knee, attack, release } = preset;

  isActive ? compressor.activate({ dryValue: dryGain, wetValue: wetGain }) : compressor.deactivate();

  compressor.setThreshold(threshold);
  compressor.setRatio(ratio);
  compressor.setKnee(knee);
  compressor.setAttack(attack);
  compressor.setRelease(release);

  return { ...preset };
}
