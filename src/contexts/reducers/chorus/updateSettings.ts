import { chorus } from '../../../nodesConfig';
import type { ChorusSettings } from '../../../types/types';
import type { Chorus_SettingsActions } from '../../types';

export function updateSettings(
  state: ChorusSettings,
  action: Chorus_SettingsActions,
): ChorusSettings {
  const { id, value } = action.payload;
  if (!id || !value) return { ...state };

  if (id === 'rate') {
    chorus.setRate(value);
    return { ...state, rate: value };
  }
  if (id === 'feedback') {
    chorus.setFeedback(value);
    return { ...state, feedback: value };
  }
  if (id === 'depth') {
    chorus.setDepth(value);
    return { ...state, depth: value };
  }
  if (id === 'time') {
    chorus.setDelay(value);
    return { ...state, time: value };
  }
  if (id === 'phase') {
    chorus.setStereoPhase(value);
    return { ...state, stereoPhase: value };
  }

  if (id === 'mix' && state.isActive) {
    const newDryValue = 1 - value;
    chorus.setDryGain(newDryValue);
    chorus.setWetGain(value);

    return {
      ...state,
      dryGain: newDryValue,
      wetGain: value,
    };
  }
  return { ...state };
}
