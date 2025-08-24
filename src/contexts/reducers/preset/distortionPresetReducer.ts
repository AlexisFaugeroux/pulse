import { bitcrusherDistortion, clippingDistortion } from '../../../nodesConfig';
import type { DistortionSettings } from '../../../types/types';

export function distortionPresetReducer(
  preset: DistortionSettings,
): DistortionSettings {
  const { clipping, bitcrusher } = preset;

  if (clipping.isActive) {
    clippingDistortion.setType(clippingDistortion.type);

    const newDriveValue = clippingDistortion.setDrive(clipping.drive);
    clippingDistortion.makeDistortionCurve(newDriveValue, clipping.type);

    clippingDistortion.setDryGain(clipping.dryGain);
    clippingDistortion.setWetGain(clipping.wetGain);
  } else if (bitcrusher.isActive) {
    bitcrusherDistortion.setBitDepth(bitcrusher.bitDepth);
    bitcrusherDistortion.setDownsampling(bitcrusher.downsampling);
    bitcrusherDistortion.setDryGain(bitcrusher.dryGain);
    bitcrusherDistortion.setWetGain(bitcrusher.wetGain);
  }
  else {
    clippingDistortion.deactivate();
    bitcrusherDistortion.deactivate();
  }

  return { ...preset };
}
