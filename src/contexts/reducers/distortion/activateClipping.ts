import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';

export function activateClipping(
  state: DistortionSettings,
): DistortionSettings {
  const clippingNode = getAudioNode('clipping');
  
  if (!clippingNode) {
    console.error("clipping node is not initialized");
    return state;
  }

  const { clipping } = state;

  clippingNode.activate({
    dryValue: 1 - clipping.wetGain,
    wetValue: clipping.wetGain,
  });

  return {
    ...state,
    clipping: {
      ...clipping,
      isActive: true,
      dryGain: 1 - clipping.wetGain,
    },
    isActive: true,
  };
}
