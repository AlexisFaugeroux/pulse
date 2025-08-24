import { EnvelopeSettings } from '../../../types/types';
import { Envelope_ActionTypes, Envelope_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';

const envelopeReducer = (
  state: EnvelopeSettings,
  action: Envelope_SettingsActions,
): EnvelopeSettings => {
  switch (action.type) {
    case Envelope_ActionTypes.Activate:
      return { ...state, isActive: true };

    case Envelope_ActionTypes.Deactivate:
      return { ...state, isActive: false };

    case Envelope_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return state;
  }
};

export default envelopeReducer;
