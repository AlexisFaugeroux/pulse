import { chorus } from '../../../nodesConfig';
import type { ChorusSettings } from '../../../types/types';

export function chorusPresetReducer(preset: ChorusSettings): ChorusSettings {
  const {
    isActive,
    dryGain,
    wetGain,
    rate,
    feedback,
    depth,
    time,
    stereoPhase,
  } = preset;

  isActive
    ? chorus.activate({ dryValue: dryGain, wetValue: wetGain })
    : chorus.deactivate();

  chorus.setRate(rate);
  chorus.setFeedback(feedback);
  chorus.setDepth(depth);
  chorus.setDelay(time);
  chorus.setStereoPhase(stereoPhase);

  return { ...preset };
}
