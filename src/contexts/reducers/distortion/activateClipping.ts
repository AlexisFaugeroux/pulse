import { clippingDistortion } from '../../../nodesConfig';
import type { DistortionSettings } from '../../../types/types';

export function activateClipping(
  state: DistortionSettings,
): DistortionSettings {
  const { clipping } = state;

  clippingDistortion.activate({
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
