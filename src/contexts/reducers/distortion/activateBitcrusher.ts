import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';

export function activateBitcrusher(
  state: DistortionSettings,
): DistortionSettings {
  const bitcrusherNode = getAudioNode('bitcrusher');
  
  if (!bitcrusherNode) {
    console.error("bitcrusher node is not initialized");
    return state;
  }

  const { bitcrusher } = state;

  bitcrusherNode.activate({
    dryValue: 1 - bitcrusher.wetGain,
    wetValue: bitcrusher.wetGain,
  });
  return {
    ...state,
    bitcrusher: {
      ...bitcrusher,
      isActive: true,
      dryGain: 1 - bitcrusher.wetGain,
    },
    isActive: true,
  };
}
