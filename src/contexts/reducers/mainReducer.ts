import { InitialSettingsState } from '../../types/types';
import oscillatorsReducer from './oscillatorsReducer';

import {
  Delay_ActionTypes,
  Delay_SettingsActions,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
  Oscillator_TriggerActionsTypes,
  type Envelope_SettingsActions,
  type Filter_SettingsActions,
  type LFO_SettingsActions,
  type Oscillator_SettingsActions,
  type Oscillator_TriggerActions,
} from '../types';
import delayReducer from './delayReducer';
import envelopeReducer from './envelopeReducer';
import filterReducer from './filterReducer';
import LFOReducer from './lfoReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';

export const mainReducer = (
  {
    oscillators,
    envelope,
    lfo,
    filter,
    delay,
  }: Pick<
    InitialSettingsState,
    'envelope' | 'oscillators' | 'filter' | 'lfo' | 'delay'
  >,
  action:
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
    | Delay_SettingsActions,
): Pick<
  InitialSettingsState,
  'envelope' | 'oscillators' | 'filter' | 'lfo' | 'delay'
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
      envelope,
      lfo,
      filter,
      delay,
    };
  } else if (
    Object.values(Envelope_ActionTypes).includes(
      action.type as Envelope_ActionTypes,
    )
  ) {
    return {
      oscillators,
      envelope: envelopeReducer(envelope, action as Envelope_SettingsActions),
      lfo,
      filter,
      delay,
    };
  } else if (
    Object.values(LFO_SettingsActionTypes).includes(
      action.type as LFO_SettingsActionTypes,
    )
  ) {
    return {
      oscillators,
      envelope,
      lfo: LFOReducer(lfo, action as LFO_SettingsActions),
      filter,
      delay,
    };
  } else if (
    Object.values(Filter_ActionTypes).includes(
      action.type as Filter_ActionTypes,
    )
  ) {
    return {
      oscillators,
      envelope,
      lfo,
      filter: filterReducer(filter, action as Filter_SettingsActions),
      delay,
    };
  } else if (
    Object.values(Delay_ActionTypes).includes(action.type as Delay_ActionTypes)
  ) {
    return {
      oscillators,
      envelope,
      lfo,
      filter,
      delay: delayReducer(delay, action as Delay_SettingsActions),
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
    envelope,
    lfo,
    filter,
    delay,
  };
};
