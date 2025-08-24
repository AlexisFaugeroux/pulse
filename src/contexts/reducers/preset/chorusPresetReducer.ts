import { getAudioNode } from '../../../audio/audioGraph';
import type { ChorusSettings } from '../../../types/types';

export function chorusPresetReducer(state: ChorusSettings, preset: ChorusSettings): ChorusSettings {
  const chorus = getAudioNode('chorus');
  if (!chorus) {
    console.error("chorus node is not initialized");
    return state;
  }

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
