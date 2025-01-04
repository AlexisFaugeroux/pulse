import Oscillator from '../../../utils/classes/Oscillator';
import { roundTwoDigits } from '../../../utils/helpers';
import type { Oscillator_TriggerActions } from '../../types';
import type { OscillatroTriggerState } from './types';

export function killOsc(
  state: OscillatroTriggerState,
  action: Oscillator_TriggerActions,
  currentOscillators: Oscillator[],
): void {
  const { frequency } = action.payload;
  const activeOscillators: Oscillator[] = [];

  currentOscillators.forEach((oscillator) => {
    const { node, parent, octaveShift, stop } = oscillator;

    const { frequency: shiftedFrequency } = octaveShift(
      state.oscillators[parent as keyof typeof state.oscillators].octaveOffset,
      frequency ?? 0,
    );
    if (
      roundTwoDigits(node.frequency.value) === roundTwoDigits(shiftedFrequency)
    ) {
      stop();
    } else {
      activeOscillators.push(oscillator);
    }
  });
  currentOscillators = activeOscillators;
}
