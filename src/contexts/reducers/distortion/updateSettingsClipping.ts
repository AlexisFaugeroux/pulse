import { clippingDistortion } from '../../../nodesConfig';
import type { DistortionSettings } from '../../../types/types';
import type { Distortion_SettingsActions } from '../../types';

export function updateSettingsClipping(
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings {
  const { clipping } = state;
  const { id, value } = action.payload;

  if (!id || !value) return { ...state };

  if (id === 'drive') {
    const newDriveValue = clippingDistortion.setDrive(value);
    clippingDistortion.makeDistortionCurve(newDriveValue, state.clipping.type);
    return { ...state, clipping: { ...clipping, drive: value } };
  }
  if (id === 'mix') {
    const newDryValue = 1 - value;
    if (state.isActive && clipping.isActive) {
      clippingDistortion.setDryGain(newDryValue);
      clippingDistortion.setWetGain(value);
    }
    return {
      ...state,
      clipping: { ...clipping, dryGain: newDryValue, wetGain: value },
    };
  }
  return { ...state };
}
