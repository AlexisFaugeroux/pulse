import {
  Chorus_ActionTypes,
  Compressor_ActionTypes,
  Delay_ActionTypes,
  Distortion_ActionTypes,
  Envelope_ActionTypes,
  Filter_ActionTypes,
  LFO_SettingsActionTypes,
  Oscillator_SettingsActionTypes,
  Oscillator_TriggerActionsTypes,
  Phaser_ActionTypes,
  Reverb_ActionTypes,
} from '../types';
import { Keyboard_ActionTypes } from '../types/keyboard';
import { Master_ActionTypes } from '../types/master';
import { Noise_SettingsActionTypes } from '../types/noises';
import { Preset_SettingsActionTypes } from '../types/preset';

export function getActionType(
  actionType:
    | Preset_SettingsActionTypes
    | Master_ActionTypes
    | Oscillator_TriggerActionsTypes
    | Oscillator_SettingsActionTypes
    | Noise_SettingsActionTypes
    | Envelope_ActionTypes
    | LFO_SettingsActionTypes
    | Filter_ActionTypes
    | Distortion_ActionTypes
    | Phaser_ActionTypes
    | Chorus_ActionTypes
    | Delay_ActionTypes
    | Reverb_ActionTypes
    | Compressor_ActionTypes
    | Keyboard_ActionTypes,
): string {
  if (
    Object.values(Preset_SettingsActionTypes).includes(
      actionType as Preset_SettingsActionTypes,
    )
  )
    return 'preset';
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
    Object.values(Phaser_ActionTypes).includes(actionType as Phaser_ActionTypes)
  )
    return 'phaser';
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
  if (
    Object.values(Keyboard_ActionTypes).includes(
      actionType as Keyboard_ActionTypes,
    )
  )
    return 'keyboard';
  return 'trigger';
}
