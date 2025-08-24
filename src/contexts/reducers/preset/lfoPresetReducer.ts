import { getAudioGraph } from '../../../audio/audioGraph';
import type { LFOSettings } from '../../../types/types';
import { LFOMode } from '../../../utils/constants';

export function lfoPresetReducer(state: LFOSettings, preset: LFOSettings) {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("lfo node is not initialized");
    return state;
  }

  const { nodes: { lfo, oscAGain, oscBGain} } = graph;
  const { type, isActive, mode, gain, frequency } = preset;

  lfo.disconnect();
  if (isActive) {
    lfo.connect(oscAGain.gain);
    lfo.connect(oscBGain.gain);
    if (mode === LFOMode.TREMOLO) {
      lfo.setTremoloGain(gain);
      lfo.setMode(mode);
    } else {
      lfo.setVibratoGain(gain);
      lfo.setMode(mode);
    }

    lfo.setRate(frequency);

    lfo.setType(type);
  }

  return { ...preset };
}
