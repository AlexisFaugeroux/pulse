import {
  Oscillator_TriggerActionsTypes,
  type Oscillator_TriggerActions,
} from '../../types';
import { createNoise } from './createNoise';
import { killNoise } from './killNoise';
import { killOsc } from './killOsc';
import { createOsc } from './createOsc';
import { OscillatroTriggerState } from './types';
import { getAudioGraph } from '../../../audio/audioGraph';

const oscillatorTriggerReducer = async (
  state: OscillatroTriggerState,
  action: Oscillator_TriggerActions,
): Promise<void> => {
  const graph = getAudioGraph();
  if (!graph) {
    console.error("Could not trigger oscillator, audio graph is not uninitialized");
    return ;
  }

  const defaultEnvelopeSettings = {
    attack: 0.005,
    decay: 1,
    sustain: 1,
    release: 0.1,
  };

  const { nodes: { activeOscillators, activeNoises }} = graph;

  switch (action.type) {
    case Oscillator_TriggerActionsTypes.Create:
      createOsc(state, action, defaultEnvelopeSettings);
      return;
    case Oscillator_TriggerActionsTypes.Kill:
      killOsc(state, action, activeOscillators);
      return;

    case Oscillator_TriggerActionsTypes.CreateNoise:
      createNoise(state, action, activeNoises, defaultEnvelopeSettings);
      return;

    case Oscillator_TriggerActionsTypes.KillNoise: {
      killNoise(action, activeNoises);
      return;
    }

    default:
      console.error('Reducer error action: ', action);
      return;
  }
};

export default oscillatorTriggerReducer;
