import { InitialSettingsState } from '../../types/types';
import oscillatorsReducer from './oscillatorsReducer';

import { Envelope_SettingsActions } from '../types';
import {
  Oscillator_TriggerActions,
  type Oscillator_SettingsActions,
} from '../types/oscillator';
import envelopeReducer from './envelopeReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';

export const mainReducer = (
  {
    oscillators,
    envelope,
  }: Pick<InitialSettingsState, 'envelope' | 'oscillators'>,
  action:
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Envelope_SettingsActions,
): Pick<InitialSettingsState, 'envelope' | 'oscillators'> => {
  const reducedOscillators = oscillatorsReducer(
    oscillators,
    action as Oscillator_SettingsActions,
  );
  const reducedEnvelope = envelopeReducer(
    envelope,
    action as Envelope_SettingsActions,
  );

  oscillatorTriggerReducer(
    { oscillators: reducedOscillators, envelope: reducedEnvelope },
    action as Oscillator_TriggerActions,
  );

  return {
    oscillators: reducedOscillators,
    envelope: reducedEnvelope,
  };
};
