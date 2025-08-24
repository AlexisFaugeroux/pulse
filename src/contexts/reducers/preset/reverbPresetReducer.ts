import { audioContext, reverb } from "../../../nodesConfig";
import type { ReverbSettings } from "../../../types/types";

export function reverbPresetReducer(
  preset: ReverbSettings,
): ReverbSettings {
  const { isActive, dryGain, wetGain, time, decay } = preset;

  isActive ? reverb.activate({ dryValue: dryGain, wetValue: wetGain }) : reverb.deactivate();

  reverb.setImpulseResponse(audioContext, reverb.node, time, decay);

  return { ...preset };
}
