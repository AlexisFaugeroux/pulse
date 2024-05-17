import { EnvelopeSettings } from '../../types/types';
import { Envelope_ActionTypes, Envelope_SettingsActions } from '../types';
import { currentNoises, currentOscillators } from './oscillatorTriggerReducer';

const envelopeReducer = (
  state: EnvelopeSettings,
  action: Envelope_SettingsActions,
): EnvelopeSettings => {
  switch (action.type) {
    case Envelope_ActionTypes.Activate:
      return { ...state, isActive: true };

    case Envelope_ActionTypes.Deactivate:
      return { ...state, isActive: false };

    case Envelope_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'attack') {
        currentOscillators.forEach((oscillator) => oscillator.setAttack(value));
        currentNoises.forEach((noise) => noise.setAttack(value));
        return { ...state, attack: value };
      }
      if (id === 'decay') {
        currentOscillators.forEach((oscillator) => oscillator.setDecay(value));
        currentNoises.forEach((noise) => noise.setDecay(value));
        return { ...state, decay: value };
      }

      if (id === 'sustain') {
        currentOscillators.forEach((oscillator) =>
          oscillator.setSustain(value),
        );
        currentNoises.forEach((noise) => noise.setSustain(value));
        return { ...state, sustain: value };
      }

      if (id === 'release') {
        currentOscillators.forEach((oscillator) =>
          oscillator.setRelease(value),
        );
        currentNoises.forEach((noise) => noise.setRelease(value));
        return { ...state, release: value };
      }
      return { ...state };
    }
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default envelopeReducer;
