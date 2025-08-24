import { getAudioGraph } from "../../../audio/audioGraph";
import type { ReverbSettings } from "../../../types/types";

export function reverbPresetReducer(
  state: ReverbSettings,
  preset: ReverbSettings,
): ReverbSettings {
  const graph = getAudioGraph();
  if (!graph || !graph.nodes.reverb) {
    console.error("reverb node is not initialized");
    return state;
  }

  const reverb = graph.nodes.reverb;
  const { isActive, dryGain, wetGain, time, decay } = preset;

  isActive ? reverb.activate({ dryValue: dryGain, wetValue: wetGain }) : reverb.deactivate();

  reverb.setImpulseResponse(graph.ctx, reverb.node, time, decay);

  return { ...preset };
}
