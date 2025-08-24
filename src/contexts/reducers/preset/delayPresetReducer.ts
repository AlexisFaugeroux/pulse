import { getAudioNode } from "../../../audio/audioGraph";
import type { DelaySettings } from "../../../types/types";

export function delayPresetReducer(
  state: DelaySettings,
  preset: DelaySettings,
): DelaySettings {
  const delay = getAudioNode('delay');

  if (!delay) {
    console.error("delay node is not initialized");
    return state;
  }

  const { isActive, dryGain, wetGain, time, feedback } = preset;

  isActive ? delay.activate({ dryValue: dryGain, wetValue: wetGain }) : delay.deactivate();

  delay.setTime(time);
  delay.setFeedback(feedback);

  return { ...preset };
}
