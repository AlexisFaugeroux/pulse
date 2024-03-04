import { InitialSettingsState } from '../../types/types';
import {
  Delay_ActionTypes,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
  Oscillator_TriggerActionsTypes,
  Reverb_ActionTypes,
  type Delay_SettingsActions,
  type Envelope_SettingsActions,
  type Filter_SettingsActions,
  type LFO_SettingsActions,
  type Oscillator_SettingsActions,
  type Oscillator_TriggerActions,
  type Reverb_SettingsActions,
  type Compressor_SettingsActions,
  Compressor_ActionTypes,
} from '../types';
import {
  Distortion_ActionTypes,
  Distortion_SettingsActions,
} from '../types/distortion';
import { Master_ActionTypes, Master_Actions } from '../types/master';
import compressorReducer from './compressorReducer';
import delayReducer from './delayReducer';
import distortionReducer from './distortionReducer';
import envelopeReducer from './envelopeReducer';
import filterReducer from './filterReducer';
import LFOReducer from './lfoReducer';
import masterReducer from './masterReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';
import oscillatorsReducer from './oscillatorsReducer';
import reverbReducer from './reverbReducer';

export const mainReducer = (
  {
    master,
    oscillators,
    envelope,
    lfo,
    filter,
    distortion,
    delay,
    reverb,
    compressor,
  }: InitialSettingsState,

  action:
    | Master_Actions
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
    | Distortion_SettingsActions
    | Delay_SettingsActions
    | Reverb_SettingsActions
    | Compressor_SettingsActions,
): InitialSettingsState => {
  if (
    Object.values(Master_ActionTypes).includes(
      action.type as Master_ActionTypes,
    )
  ) {
    return {
      master: masterReducer(master, action as Master_Actions),
      oscillators,
      envelope,
      lfo,
      filter,
      distortion,
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(Oscillator_SettingsActionTypes).includes(
      action.type as Oscillator_SettingsActionTypes,
    )
  ) {
    return {
      master,
      oscillators: oscillatorsReducer(
        oscillators,
        action as Oscillator_SettingsActions,
      ),
      envelope,
      lfo,
      filter,
      distortion,
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(Envelope_ActionTypes).includes(
      action.type as Envelope_ActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope: envelopeReducer(envelope, action as Envelope_SettingsActions),
      lfo,
      filter,
      distortion,
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(LFO_SettingsActionTypes).includes(
      action.type as LFO_SettingsActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo: LFOReducer(lfo, action as LFO_SettingsActions),
      filter,
      distortion,
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(Filter_ActionTypes).includes(
      action.type as Filter_ActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo,
      filter: filterReducer(filter, action as Filter_SettingsActions),
      distortion,
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(Distortion_ActionTypes).includes(
      action.type as Distortion_ActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo,
      filter,
      distortion: distortionReducer(
        distortion,
        action as Distortion_SettingsActions,
      ),
      delay,
      reverb,
      compressor,
    };
  } else if (
    Object.values(Delay_ActionTypes).includes(action.type as Delay_ActionTypes)
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo,
      filter,
      distortion,
      delay: delayReducer(delay, action as Delay_SettingsActions),
      reverb,
      compressor,
    };
  } else if (
    Object.values(Reverb_ActionTypes).includes(
      action.type as Reverb_ActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo,
      filter,
      distortion,
      delay,
      reverb: reverbReducer(reverb, action as Reverb_SettingsActions),
      compressor,
    };
  } else if (
    Object.values(Compressor_ActionTypes).includes(
      action.type as Compressor_ActionTypes,
    )
  ) {
    return {
      master,
      oscillators,
      envelope,
      lfo,
      filter,
      distortion,
      delay,
      reverb,
      compressor: compressorReducer(
        compressor,
        action as Compressor_SettingsActions,
      ),
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
    master,
    oscillators,
    envelope,
    lfo,
    filter,
    distortion,
    delay,
    reverb,
    compressor,
  };
};
