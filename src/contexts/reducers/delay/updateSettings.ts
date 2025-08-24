import { delay } from '../../../nodesConfig';
import type { DelaySettings } from '../../../types/types';
import type { Delay_SettingsActions } from '../../types';

export function updateSettings(
  state: DelaySettings,
  action: Delay_SettingsActions,
): DelaySettings {
  const { id, value } = action.payload;
  if (!id || !value) return { ...state };

  if (id === 'time') {
    delay.setTime(value);

    return { ...state, time: value };
  }

  if (id === 'feedback') {
    delay.setFeedback(value);

    return { ...state, feedback: value };
  }

  if (id === 'mix' && state.isActive) {
    const newDryValue = 1 - value;
    delay.setDryGain(newDryValue);
    delay.setWetGain(value);

    return {
      ...state,
      dryGain: newDryValue,
      wetGain: value,
    };
  }
  return { ...state };
}
