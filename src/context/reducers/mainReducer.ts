import { InitialSettingsState } from '../../types/types';
import oscillatorsReducer from './oscillatorsReducer';

import type {
  Envelope_SettingsActions,
  Filter_SettingsActions,
  Oscillator_TriggerActions,
  Gain_SettingsActions,
  Oscillator_SettingsActions,
} from '../types';
import envelopeReducer from './envelopeReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';
import filterReducer from './filterReducer';
import gainReducer from './gainReducer';

export const mainReducer = (
  {
    oscillators,
    gains,
    envelope,
    filter,
  }: Pick<
    InitialSettingsState,
    'envelope' | 'oscillators' | 'filter' | 'gains'
  >,
  action:
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Gain_SettingsActions
    | Envelope_SettingsActions
    | Filter_SettingsActions,
): Pick<
  InitialSettingsState,
  'envelope' | 'oscillators' | 'filter' | 'gains'
> => {
  const reducedOscillators = oscillatorsReducer(
    oscillators,
    action as Oscillator_SettingsActions,
  );
  const reducedGain = gainReducer(gains, action as Gain_SettingsActions);
  const reducedEnvelope = envelopeReducer(
    envelope,
    action as Envelope_SettingsActions,
  );
  const reducedFilter = filterReducer(filter, action as Filter_SettingsActions);

  oscillatorTriggerReducer(
    { oscillators: reducedOscillators, envelope: reducedEnvelope },
    action as Oscillator_TriggerActions,
  );

  return {
    oscillators: reducedOscillators,
    gains: reducedGain,
    envelope: reducedEnvelope,
    filter: reducedFilter,
  };
};
