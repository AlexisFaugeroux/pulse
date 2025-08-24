import { getAudioGraph } from '../../../audio/audioGraph';
import type { ReverbSettings } from '../../../types/types';
import type { Reverb_SettingsActions } from '../../types';

export function updateSettings(
  state: ReverbSettings,
  action: Reverb_SettingsActions,
): ReverbSettings {
  const graph = getAudioGraph();
  if (!graph || !graph.nodes.reverb) {
    console.error("reverb node is not initialized");
    return state;
  }

  const reverb = graph.nodes.reverb;

  const { id, value } = action.payload;
  if (!id || !value) return state;

  if (id === 'time') {
    reverb.setImpulseResponse(graph.ctx, reverb.node, value, state.decay);
    return { ...state, time: value };
  }

  if (id === 'decay') {
    reverb.setImpulseResponse(graph.ctx, reverb.node, state.time, value);
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
  return state;
}
