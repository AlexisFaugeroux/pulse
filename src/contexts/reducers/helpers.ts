import {
  Chorus_ActionTypes,
  Compressor_ActionTypes,
  Delay_ActionTypes,
  Distortion_ActionTypes,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  Flanger_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
  Oscillator_TriggerActionsTypes,
  Reverb_ActionTypes,
} from '../types';
import { Master_ActionTypes } from '../types/master';
import { Noise_SettingsActionTypes } from '../types/noises';

export function getActionType(
  actionType:
    | Master_ActionTypes
    | Oscillator_TriggerActionsTypes
    | Oscillator_SettingsActionTypes
    | Noise_SettingsActionTypes
    | Envelope_ActionTypes
    | LFO_SettingsActionTypes
    | Filter_ActionTypes
    | Distortion_ActionTypes
    | Flanger_ActionTypes
    | Chorus_ActionTypes
    | Delay_ActionTypes
    | Reverb_ActionTypes
    | Compressor_ActionTypes,
): string {
  if (
    Object.values(Master_ActionTypes).includes(actionType as Master_ActionTypes)
  )
    return 'master';
  if (
    Object.values(Oscillator_SettingsActionTypes).includes(
      actionType as Oscillator_SettingsActionTypes,
    )
  )
    return 'oscillators';
  if (
    Object.values(Noise_SettingsActionTypes).includes(
      actionType as Noise_SettingsActionTypes,
    )
  )
    return 'noises';
  if (
    Object.values(Envelope_ActionTypes).includes(
      actionType as Envelope_ActionTypes,
    )
  )
    return 'envelope';
  if (
    Object.values(LFO_SettingsActionTypes).includes(
      actionType as LFO_SettingsActionTypes,
    )
  )
    return 'lfo';
  if (
    Object.values(Filter_ActionTypes).includes(actionType as Filter_ActionTypes)
  )
    return 'filter';
  if (
    Object.values(Distortion_ActionTypes).includes(
      actionType as Distortion_ActionTypes,
    )
  )
    return 'distortion';
  if (
    Object.values(Flanger_ActionTypes).includes(
      actionType as Flanger_ActionTypes,
    )
  )
    return 'flanger';
  if (
    Object.values(Chorus_ActionTypes).includes(actionType as Chorus_ActionTypes)
  )
    return 'chorus';
  if (
    Object.values(Delay_ActionTypes).includes(actionType as Delay_ActionTypes)
  )
    return 'delay';
  if (
    Object.values(Reverb_ActionTypes).includes(actionType as Reverb_ActionTypes)
  )
    return 'reverb';
  if (
    Object.values(Compressor_ActionTypes).includes(
      actionType as Compressor_ActionTypes,
    )
  )
    return 'compressor';
  return 'trigger';
}
