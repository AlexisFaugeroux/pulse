import { EnvelopeSettings } from '../../types/types';
import { Envelope_ActionTypes, Envelope_SettingsActions } from '../types';
import { currentOscillators } from './oscillatorTriggerReducer';

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
        return { ...state, attack: value };
      }
      if (id === 'decay') {
        currentOscillators.forEach((oscillator) => oscillator.setDecay(value));
        return { ...state, [id]: value };
      }

      if (id === 'sustain') {
        currentOscillators.forEach((oscillator) =>
          oscillator.setSustain(value),
        );
        return { ...state, [id]: value };
      }

      if (id === 'release') {
        currentOscillators.forEach((oscillator) =>
          oscillator.setRelease(value),
        );
        return { ...state, [id]: value };
      }
      return { ...state };
    }
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default envelopeReducer;
