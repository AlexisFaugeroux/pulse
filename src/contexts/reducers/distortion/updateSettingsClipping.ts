import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';
import type { Distortion_SettingsActions } from '../../types';

export function updateSettingsClipping(
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings {
  const clippingNode = getAudioNode('clipping');
  
  if (!clippingNode) {
    console.error("clipping node is not initialized");
    return state;
  }

  const { clipping } = state;
  const { id, value } = action.payload;

  if (!id || !value) return state;

  if (id === 'drive') {
    const newDriveValue = clippingNode.setDrive(value);
    clippingNode.makeDistortionCurve(newDriveValue, state.clipping.type);
    return { ...state, clipping: { ...clipping, drive: value } };
  }
  if (id === 'mix') {
    const newDryValue = 1 - value;
    if (state.isActive && clipping.isActive) {
      clippingNode.setDryGain(newDryValue);
      clippingNode.setWetGain(value);
    }
    return {
      ...state,
      clipping: { ...clipping, dryGain: newDryValue, wetGain: value },
    };
  }
  return state;
}
