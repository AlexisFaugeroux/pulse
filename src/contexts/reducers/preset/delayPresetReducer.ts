import { delay } from "../../../nodesConfig";
import type { DelaySettings } from "../../../types/types";

export function delayPresetReducer(
  preset: DelaySettings,
): DelaySettings {
  const { isActive, dryGain, wetGain, time, feedback } = preset;

  isActive ? delay.activate({ dryValue: dryGain, wetValue: wetGain }) : delay.deactivate();

  delay.setTime(time);
  delay.setFeedback(feedback);

  return { ...preset };
}
