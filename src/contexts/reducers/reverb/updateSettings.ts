import { audioContext, reverb } from '../../../nodesConfig';
import type { ReverbSettings } from '../../../types/types';
import type { Reverb_SettingsActions } from '../../types';

export function updateSettings(
  state: ReverbSettings,
  action: Reverb_SettingsActions,
): ReverbSettings {
  const { node } = reverb;

  const { id, value } = action.payload;
  if (!id || !value) return { ...state };

  if (id === 'time') {
    reverb.setImpulseResponse(audioContext, node, value, state.decay);
    return { ...state, time: value };
  }

  if (id === 'decay') {
    reverb.setImpulseResponse(audioContext, node, state.time, value);
    return { ...state, decay: value };
  }

  if (id === 'mix' && state.isActive) {
    const newDryValue = 1 - value;
    reverb.setDryGain(newDryValue);
    reverb.setWetGain(value);

    return {
      ...state,
      dryGain: newDryValue,
      wetGain: value,
    };
  }
  return { ...state };
}
