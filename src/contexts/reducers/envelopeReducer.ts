import { EnvelopeSettings } from '../../types/types';
import { Envelope_ActionTypes, Envelope_SettingsActions } from '../types';
import { linearToLinearRange } from './helpers';

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

      if (id === 'sustain') {
        return { ...state, [id]: value };
      }

      const convertedValue = linearToLinearRange(value, [0, 8]);
      return { ...state, [id]: convertedValue };
    }
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default envelopeReducer;
