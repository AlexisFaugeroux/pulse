import { EnvelopeSettings } from '../../types/types';
import { linearToLinearRange } from '../../utils/helpers';
import { Envelope_ActionTypes, Envelope_SettingsActions } from '../types';
import { updateEnvelopeActiveOsc } from './helpers';

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

      if (id === 'attack' || id === 'release') {
        const convertedValue = linearToLinearRange(value, [0, 8]);
        updateEnvelopeActiveOsc(id, convertedValue);
        return { ...state, [id]: convertedValue };
      }
      if (id === 'decay') {
        const convertedValue = linearToLinearRange(value, [0, 5]);
        updateEnvelopeActiveOsc(id, convertedValue);
        return { ...state, [id]: convertedValue };
      }

      if (id === 'sustain') {
        updateEnvelopeActiveOsc(id, value);
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
