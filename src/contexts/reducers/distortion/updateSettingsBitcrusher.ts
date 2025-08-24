import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';
import type { Distortion_SettingsActions } from '../../types';

export function updateSettingsBitcrusher(
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings {
  const bitcrusherNode = getAudioNode('bitcrusher');
  
  if (!bitcrusherNode) {
    console.error("bitcrusher node is not initialized");
    return state;
  }

  const { bitcrusher } = state;
  const { id, value } = action.payload;

  if (!id || !value) return { ...state };

  if (id === 'depth') {
    bitcrusherNode.setBitDepth(value);
    return { ...state, bitcrusher: { ...bitcrusher, bitDepth: value } };
  }
  if (id === 'd.sample') {
    bitcrusherNode.setDownsampling(value);
    return { ...state, bitcrusher: { ...bitcrusher, downsampling: value } };
  }
  if (id === 'mix') {
    const newDryValue = 1 - value;
    if (state.isActive && bitcrusher.isActive) {
      bitcrusherNode.setDryGain(newDryValue);
      bitcrusherNode.setWetGain(value);
    }
    return {
      ...state,
      bitcrusher: { ...bitcrusher, dryGain: newDryValue, wetGain: value },
    };
  }
  return { ...state };
}
