import { bitcrusherDistortion } from '../../../nodesConfig';
import type { DistortionSettings } from '../../../types/types';
import type { Distortion_SettingsActions } from '../../types';

export function updateSettingsBitcrusher(
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings {
  const { bitcrusher } = state;
  const { id, value } = action.payload;

  if (!id || !value) return { ...state };

  if (id === 'depth') {
    bitcrusherDistortion.setBitDepth(value);
    return { ...state, bitcrusher: { ...bitcrusher, bitDepth: value } };
  }
  if (id === 'd.sample') {
    bitcrusherDistortion.setDownsampling(value);
    return { ...state, bitcrusher: { ...bitcrusher, downsampling: value } };
  }
  if (id === 'mix') {
    const newDryValue = 1 - value;
    if (state.isActive && bitcrusher.isActive) {
      bitcrusherDistortion.setDryGain(newDryValue);
      bitcrusherDistortion.setWetGain(value);
    }
    return {
      ...state,
      bitcrusher: { ...bitcrusher, dryGain: newDryValue, wetGain: value },
    };
  }
  return { ...state };
}
