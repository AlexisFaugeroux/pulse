import { lfo, oscAGain, oscBGain } from '../../../nodesConfig';
import type { LFOSettings } from '../../../types/types';
import { LFOMode } from '../../../utils/constants';

export function lfoPresetReducer(preset: LFOSettings) {
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
