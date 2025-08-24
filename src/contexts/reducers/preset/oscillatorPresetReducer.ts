import type { OscillatorState } from '../oscillators/types';
import { roundTwoDigitsNonFinite } from '../../../utils/helpers';
import { TIME_CONSTANT } from '../../../utils/constants';
import { getAudioGraph } from '../../../audio/audioGraph';

export function oscillatorPresetReducer(
  state: OscillatorState,
  preset: OscillatorState,
): OscillatorState {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("graph node is not initialized");
    return state;
  }

  const { ctx, nodes: {activeOscillators, oscAGain, oscBGain, subGain }} = graph;

  const {
    oscillatorA: presetOscillatorA,
    oscillatorB: presetOscillatorB,
    subOscillator: presetSubOscillator,
  } = preset;

  oscAGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetOscillatorA.gain),
    ctx.currentTime,
    TIME_CONSTANT,
  );
  oscBGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetOscillatorB.gain),
    ctx.currentTime,
    TIME_CONSTANT,
  );
  subGain.gain.setTargetAtTime(
    roundTwoDigitsNonFinite(presetSubOscillator.gain),
    ctx.currentTime,
    TIME_CONSTANT,
  );

  if (activeOscillators.length > 0) {
    activeOscillators.forEach((osc) => {
      osc.node.disconnect();
      osc.stop();
    });
    activeOscillators.forEach(({ node, frequency, octaveShift }) => {
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
          ctx.currentTime + 0.006,
        );
      }
      if (newFrequencyB !== node.frequency.value) {
        node.frequency.setValueAtTime(
          newFrequencyB,
          ctx.currentTime + 0.006,
        );
      }

      if (newFrequencySub !== node.frequency.value) {
        node.frequency.setValueAtTime(
          newFrequencySub,
          ctx.currentTime + 0.006,
        );
      }
    });
  }

  return {
    ...preset,
  };
}
