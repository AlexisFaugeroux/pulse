import { audioContext, oscAGain, oscBGain } from '../../nodesConfig';
import { OscSettings } from '../../types/types';
import Oscillator from '../../utils/classes/Oscillator';
import {
  Oscillator_ActionTypes,
  type Oscillator_SettingsActions,
} from '../types/index';

let currentOscillators: Oscillator[] = [];

// pitchShift comme méthode de classe

const oscillatorsReducer = (
  state: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  },
  action: Oscillator_SettingsActions,
): {
  oscillatorA: OscSettings;
  oscillatorB: OscSettings;
} => {
  const { oscillatorA, oscillatorB } = state;
  const {
    id,
    note: initialNote,
    frequency: initialFrequency,
    parent,
    value,
  } = action.payload;

  switch (action.type) {
    case Oscillator_ActionTypes.Create:
      {
        if (!initialNote || !initialFrequency) {
          console.error('Create oscillator A: note or frequency not provided');
          return { ...state };
        }

        if (oscillatorA.isActive && oscillatorB.isActive) {
          const newOscillatorA = new Oscillator(
            audioContext,
            oscAGain,
            oscillatorA.type,
            initialNote,
            initialFrequency,
            oscillatorA.octaveOffset,
            oscillatorA.detune,
            oscillatorA.adsr,
            oscillatorA.id,
          );
          const newOscillatorB = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            initialNote,
            initialFrequency,
            oscillatorB.octaveOffset,
            oscillatorB.detune,
            oscillatorB.adsr,
            oscillatorB.id,
          );
          currentOscillators.push(newOscillatorA, newOscillatorB);
        } else if (oscillatorA.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            oscAGain,
            oscillatorA.type,
            initialNote,
            initialFrequency,
            oscillatorA.octaveOffset,
            oscillatorA.detune,
            oscillatorA.adsr,
            oscillatorA.id,
          );
          currentOscillators.push(newOscillator);
        } else if (oscillatorB.isActive) {
          const newOscillator = new Oscillator(
            audioContext,
            oscBGain,
            oscillatorB.type,
            initialNote,
            initialFrequency,
            oscillatorB.octaveOffset,
            oscillatorB.detune,
            oscillatorB.adsr,
            oscillatorB.id,
          );
          currentOscillators.push(newOscillator);
        }
      }
      return { ...state };

    case Oscillator_ActionTypes.Kill:
      {
        const activeOscillators: Oscillator[] = [];

        currentOscillators.forEach((oscillator) => {
          const { node, parent, octaveShift, stop } = oscillator;

          const { frequency: shiftedFrequency } = octaveShift(
            state[parent as keyof typeof state].octaveOffset,
            initialFrequency ?? 0,
          );
          if (
            Math.round(node.frequency.value) === Math.round(shiftedFrequency)
          ) {
            stop();
          } else {
            activeOscillators.push(oscillator);
          }
        });

        currentOscillators = activeOscillators;
      }
      return { ...state };

    case Oscillator_ActionTypes.Activate:
      if (!id) {
        console.error('Activate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };

    case Oscillator_ActionTypes.Deactivate:
      if (!id) {
        console.error('Deactivate oscillator: no id provided');
        return { ...state };
      }

      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };

    case Oscillator_ActionTypes.UpdateSettings:
      if (!id) {
        console.error('Update oscillator settings: no id provided');
        return { ...state };
      }

      if (parent) {
        currentOscillators.forEach(
          ({
            node,
            parent: currOscParent,
            offset,
            initialFrequency,
            octaveShift,
          }) => {
            if (id === 'detune' && currOscParent === parent) {
              node.detune.value = value ? value * 100 : 0;
            }
            if (id === 'octaveOffset' && currOscParent === parent) {
              const { frequency: newFrequency } = octaveShift(
                value ?? offset,
                initialFrequency,
              );

              if (newFrequency !== node.frequency.value) {
                node.frequency.setValueAtTime(
                  newFrequency,
                  audioContext.currentTime + 0.006,
                );
              }
            }
          },
        );
        return {
          ...state,
          [parent]: {
            ...state[parent as keyof typeof state],
            [id]: value,
          },
        };
      } else {
        return { ...state };
      }

    case Oscillator_ActionTypes.UpdateType:
      if (!id) {
        console.error('Update oscillator type: no id provided');
        return { ...state };
      }

      if (parent === 'oscillatorA') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (currOscParent === parent) {
            node.type = id as OscillatorType;
          }
        });

        return {
          ...state,
          oscillatorA: { ...oscillatorA, type: id as OscillatorType },
        };
      } else if (parent === 'oscillatorB') {
        currentOscillators.forEach(({ node, parent: currOscParent }) => {
          if (currOscParent === parent) {
            node.type = id as OscillatorType;
          }
        });
        return {
          ...state,
          oscillatorB: { ...oscillatorB, type: id as OscillatorType },
        };
      } else {
        return { ...state };
      }

    default:
      console.log('Reducer error action: ', action);
      return { ...state };
  }
};
export default oscillatorsReducer;
