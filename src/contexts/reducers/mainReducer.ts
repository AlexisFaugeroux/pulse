import { InitialSettingsState } from '../../types/types';
import oscillatorsReducer from './oscillatorsReducer';

import {
  type Envelope_SettingsActions,
  type Filter_SettingsActions,
  type Oscillator_TriggerActions,
  type Gain_SettingsActions,
  type Oscillator_SettingsActions,
  type LFO_SettingsActions,
  Gain_ActionTypes,
  Oscillator_SettingsActionTypes,
  Envelope_ActionTypes,
  LFO_SettingsActionTypes,
  Filter_ActionTypes,
  Oscillator_TriggerActionsTypes,
} from '../types';
import envelopeReducer from './envelopeReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';
import filterReducer from './filterReducer';
import gainReducer from './gainReducer';
import LFOReducer from './lfoReducer';

export const mainReducer = (
  {
    oscillators,
    gains,
    envelope,
    lfo,
    filter,
  }: Pick<
    InitialSettingsState,
    'envelope' | 'oscillators' | 'filter' | 'gains' | 'lfo'
  >,
  action:
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Gain_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions,
): Pick<
  InitialSettingsState,
  'envelope' | 'oscillators' | 'filter' | 'gains' | 'lfo'
> => {
  if (
    Object.values(Oscillator_SettingsActionTypes).includes(
      action.type as Oscillator_SettingsActionTypes,
    )
  ) {
    return {
      oscillators: oscillatorsReducer(
        oscillators,
        action as Oscillator_SettingsActions,
      ),
      gains,
      envelope,
      lfo,
      filter,
    };
  } else if (
    Object.values(Gain_ActionTypes).includes(action.type as Gain_ActionTypes)
  ) {
    return {
      oscillators,
      gains: gainReducer(gains, action as Gain_SettingsActions),
      envelope,
      lfo,
      filter,
    };
  } else if (
    Object.values(Envelope_ActionTypes).includes(
      action.type as Envelope_ActionTypes,
    )
  ) {
    return {
      oscillators,
      gains,
      envelope: envelopeReducer(envelope, action as Envelope_SettingsActions),
      lfo,
      filter,
    };
  } else if (
    Object.values(LFO_SettingsActionTypes).includes(
      action.type as LFO_SettingsActionTypes,
    )
  ) {
    return {
      oscillators,
      gains,
      envelope,
      lfo: LFOReducer(lfo, action as LFO_SettingsActions),
      filter,
    };
  } else if (
    Object.values(Filter_ActionTypes).includes(
      action.type as Filter_ActionTypes,
    )
  ) {
    return {
      oscillators,
      gains,
      envelope,
      lfo,
      filter: filterReducer(filter, action as Filter_SettingsActions),
    };
  } else if (
    Object.values(Oscillator_TriggerActionsTypes).includes(
      action.type as Oscillator_TriggerActionsTypes,
    )
  ) {
    oscillatorTriggerReducer(
      { oscillators, envelope },
      action as Oscillator_TriggerActions,
    );
  }

  return {
    oscillators,
    gains,
    envelope,
    lfo,
    filter,
  };
};
