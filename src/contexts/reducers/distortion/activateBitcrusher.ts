import { bitcrusherDistortion } from '../../../nodesConfig';
import type { DistortionSettings } from '../../../types/types';

export function activateBitcrusher(
  state: DistortionSettings,
): DistortionSettings {
  const { bitcrusher } = state;

  bitcrusherDistortion.activate({
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
