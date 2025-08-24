import type { OscillatorState } from '../oscillators/types';
import {
  audioContext,
  oscAGain,
  oscBGain,
  subGain,
} from '../../../nodesConfig';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import { TIME_CONSTANT } from '../../../utils/constants';
import { currentOscillators } from '../oscillators/oscillatorTriggerReducer';

export function oscillatorPresetReducer(
  preset: OscillatorState,
): OscillatorState {
  const {
    oscillatorA: presetOscillatorA,
    oscillatorB: presetOscillatorB,
    subOscillator: presetSubOscillator,
  } = preset;

  oscAGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetOscillatorA.gain),
    audioContext.currentTime,
    TIME_CONSTANT,
  );
  oscBGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetOscillatorB.gain),
    audioContext.currentTime,
    TIME_CONSTANT,
  );
  subGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetSubOscillator.gain),
    audioContext.currentTime,
    TIME_CONSTANT,
  );

  if (currentOscillators.length > 0) {
    currentOscillators.forEach((osc) => {
      osc.node.disconnect();
      osc.stop();
    });
    currentOscillators.forEach(({ node, frequency, octaveShift }) => {
      node.detune.value = presetOscillatorA.detune * 100;
      node.detune.value = presetOscillatorB.detune * 100;

      const { frequency: newFrequencyA } = octaveShift(
        presetOscillatorA.octaveOffset,
        frequency,
      );
      const { frequency: newFrequencyB } = octaveShift(
        presetOscillatorB.octaveOffset,
        frequency,
      );
      const { frequency: newFrequencySub } = octaveShift(
        presetSubOscillator.octaveOffset,
        frequency,
      );

      if (newFrequencyA !== node.frequency.value) {
        node.frequency.setValueAtTime(
          newFrequencyA,
          audioContext.currentTime + 0.006,
        );
      }
      if (newFrequencyB !== node.frequency.value) {
        node.frequency.setValueAtTime(
          newFrequencyB,
          audioContext.currentTime + 0.006,
        );
      }

      if (newFrequencySub !== node.frequency.value) {
        node.frequency.setValueAtTime(
          newFrequencySub,
          audioContext.currentTime + 0.006,
        );
      }
    });
  }

  return {
    ...preset,
  };
}
