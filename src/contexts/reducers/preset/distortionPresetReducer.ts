import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';

export function distortionPresetReducer(
  state: DistortionSettings,
  preset: DistortionSettings,
): DistortionSettings {
  const clippingNode = getAudioNode('clipping');
  if (!clippingNode) {
    console.error('clipping node is not initialized');
    return state;
  }

  const bitcrusherNode = getAudioNode('bitcrusher');
  if (!bitcrusherNode) {
    console.error('bitcrusher node is not initialized');
    return state;
  }

  const { clipping, bitcrusher } = preset;

  if (clipping.isActive) {
    clippingNode.setType(clippingNode.type);

    const newDriveValue = clippingNode.setDrive(clipping.drive);
    clippingNode.makeDistortionCurve(newDriveValue, clipping.type);

    clippingNode.setDryGain(clipping.dryGain);
    clippingNode.setWetGain(clipping.wetGain);
  } else if (bitcrusher.isActive) {
    bitcrusherNode.setBitDepth(bitcrusher.bitDepth);
    bitcrusherNode.setDownsampling(bitcrusher.downsampling);
    bitcrusherNode.setDryGain(bitcrusher.dryGain);
    bitcrusherNode.setWetGain(bitcrusher.wetGain);
  } else {
    clippingNode.deactivate();
    bitcrusherNode.deactivate();
  }

  return { ...preset };
}
