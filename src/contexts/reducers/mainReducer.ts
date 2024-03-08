import { InitialSettingsState } from '../../types/types';
import {
  Chorus_SettingsActions,
  Flanger_SettingsActions,
  Oscillator_TriggerActionsTypes,
  type Compressor_SettingsActions,
  type Delay_SettingsActions,
  type Distortion_SettingsActions,
  type Envelope_SettingsActions,
  type Filter_SettingsActions,
  type LFO_SettingsActions,
  type Oscillator_SettingsActions,
  type Oscillator_TriggerActions,
  type Reverb_SettingsActions,
} from '../types';
import { Master_Actions } from '../types/master';
import chorusReducer from './chorusReducer';
import compressorReducer from './compressorReducer';
import delayReducer from './delayReducer';
import distortionReducer from './distortionReducer';
import envelopeReducer from './envelopeReducer';
import filterReducer from './filterReducer';
import flangerReducer from './flangerReducer';
import { getActionType } from './helpers';
import LFOReducer from './lfoReducer';
import masterReducer from './masterReducer';
import oscillatorTriggerReducer from './oscillatorTriggerReducer';
import oscillatorsReducer from './oscillatorsReducer';
import reverbReducer from './reverbReducer';

export const mainReducer = (
  settings: InitialSettingsState,

  action:
    | Master_Actions
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
    | Distortion_SettingsActions
    | Flanger_SettingsActions
    | Chorus_SettingsActions
    | Delay_SettingsActions
    | Reverb_SettingsActions
    | Compressor_SettingsActions,
): InitialSettingsState => {
  const type = getActionType(action.type);

  const { oscillators, envelope } = settings;
  if (
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
    master:
      type === 'master'
        ? masterReducer(settings.master, action as Master_Actions)
        : settings.master,
    oscillators:
      type === 'oscillators'
        ? oscillatorsReducer(
            settings.oscillators,
            action as Oscillator_SettingsActions,
          )
        : settings.oscillators,
    envelope:
      type === 'envelope'
        ? envelopeReducer(settings.envelope, action as Envelope_SettingsActions)
        : settings.envelope,
    lfo:
      type === 'lfo'
        ? LFOReducer(settings.lfo, action as LFO_SettingsActions)
        : settings.lfo,
    filter:
      type === 'filter'
        ? filterReducer(settings.filter, action as Filter_SettingsActions)
        : settings.filter,
    distortion:
      type === 'distortion'
        ? distortionReducer(
            settings.distortion,
            action as Distortion_SettingsActions,
          )
        : settings.distortion,
    flanger:
      type === 'flanger'
        ? flangerReducer(settings.flanger, action as Flanger_SettingsActions)
        : settings.flanger,
    chorus:
      type === 'chorus'
        ? chorusReducer(settings.chorus, action as Chorus_SettingsActions)
        : settings.chorus,
    delay:
      type === 'delay'
        ? delayReducer(settings.delay, action as Delay_SettingsActions)
        : settings.delay,
    reverb:
      type === 'reverb'
        ? reverbReducer(settings.reverb, action as Reverb_SettingsActions)
        : settings.reverb,
    compressor:
      type === 'compressor'
        ? compressorReducer(
            settings.compressor,
            action as Compressor_SettingsActions,
          )
        : settings.compressor,
  };
};
