import { Settings } from '../../types/types';
import {
  Chorus_SettingsActions,
  Oscillator_TriggerActionsTypes,
  Phaser_SettingsActions,
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
import { Keyboard_SettingsActions } from '../types/keyboard';
import { type Master_Actions, Master_ActionTypes } from '../types/master';
import type { Noise_SettingsActions } from '../types/noises';
import type { Preset_SettingsActions } from '../types/preset';
import chorusReducer from './chorus/chorusReducer';
import compressorReducer from './compressor/compressorReducer';
import delayReducer from './delay/delayReducer';
import distortionReducer from './distortion/distortionReducer';
import envelopeReducer from './envelope/envelopeReducer';
import filterReducer from './filter/filterReducer';
import { getActionType } from './helpers';
import LFOReducer from './lfo/lfoReducer';
import masterReducer from './masterReducer';
import noisesReducer from './noises/noisesReducer';
import oscillatorTriggerReducer from './oscillators/oscillatorTriggerReducer';
import oscillatorsReducer from './oscillators/oscillatorsReducer';
import phaserReducer from './phaser/phaserReducer';
import { chorusPresetReducer } from './preset/chorusPresetReducer';
import { compressorPresetReducer } from './preset/compressorPresetReducer';
import { delayPresetReducer } from './preset/delayPresetReducer';
import { distortionPresetReducer } from './preset/distortionPresetReducer';
import { envelopePresetReducer } from './preset/envelopePresetReducer';
import { filterPresetReducer } from './preset/filterPresetReducer';
import { lfoPresetReducer } from './preset/lfoPresetReducer';
import { noisesPresetReducer } from './preset/noisesPresetReducer';
import { oscillatorPresetReducer } from './preset/oscillatorPresetReducer';
import { phaserPresetReducer } from './preset/phaserPresetReducer';
import { reverbPresetReducer } from './preset/reverbPresetReducer';
import reverbReducer from './reverb/reverbReducer';

export const mainReducer = (
  settings: Settings,
  action:
    | Preset_SettingsActions
    | Master_Actions
    | Oscillator_TriggerActions
    | Oscillator_SettingsActions
    | Noise_SettingsActions
    | Envelope_SettingsActions
    | LFO_SettingsActions
    | Filter_SettingsActions
    | Distortion_SettingsActions
    | Phaser_SettingsActions
    | Chorus_SettingsActions
    | Delay_SettingsActions
    | Reverb_SettingsActions
    | Compressor_SettingsActions
    | Keyboard_SettingsActions,
): Settings => {
  const type = getActionType(action.type);
  const {
    master,
    oscillators,
    noises,
    envelope,
    lfo,
    filter,
    distortion,
    phaser,
    chorus,
    delay,
    reverb,
    compressor,
    keyboardOffset,
  } = settings;

  if (
    Object.values(Oscillator_TriggerActionsTypes).includes(
      action.type as Oscillator_TriggerActionsTypes,
    )
  ) {
    oscillatorTriggerReducer(
      { oscillators, noises, envelope },
      action as Oscillator_TriggerActions,
    );
  }

  if (type === 'preset') {
    const { payload } = action as Preset_SettingsActions;
    return {
      master: masterReducer(master, {
        type: Master_ActionTypes.UpdateValue,
        payload: { value: payload.master.gain },
      }),
      oscillators: oscillatorPresetReducer(oscillators, payload.oscillators),
      noises: noisesPresetReducer(noises, payload.noises),
      envelope: envelopePresetReducer(payload.envelope),
      filter: filterPresetReducer(filter, payload.filter),
      lfo: lfoPresetReducer(lfo, payload.lfo),
      distortion: distortionPresetReducer(distortion, payload.distortion),
      phaser: phaserPresetReducer(phaser, payload.phaser),
      chorus: chorusPresetReducer(chorus, payload.chorus),
      delay: delayPresetReducer(delay, payload.delay),
      reverb: reverbPresetReducer(reverb, payload.reverb),
      compressor: compressorPresetReducer(compressor, payload.compressor),
      keyboardOffset: payload.keyboardOffset,
    };
  }

  const newState = {
    master:
      type === 'master'
        ? masterReducer(master, action as Master_Actions)
        : master,
    oscillators:
      type === 'oscillators'
        ? oscillatorsReducer(oscillators, action as Oscillator_SettingsActions)
        : oscillators,
    noises:
      type === 'noises'
        ? noisesReducer(noises, action as Noise_SettingsActions)
        : noises,
    envelope:
      type === 'envelope'
        ? envelopeReducer(envelope, action as Envelope_SettingsActions)
        : envelope,
    lfo: type === 'lfo' ? LFOReducer(lfo, action as LFO_SettingsActions) : lfo,
    filter:
      type === 'filter'
        ? filterReducer(filter, action as Filter_SettingsActions)
        : filter,
    distortion:
      type === 'distortion'
        ? distortionReducer(distortion, action as Distortion_SettingsActions)
        : distortion,
    phaser:
      type === 'phaser'
        ? phaserReducer(phaser, action as Phaser_SettingsActions)
        : phaser,
    chorus:
      type === 'chorus'
        ? chorusReducer(chorus, action as Chorus_SettingsActions)
        : chorus,
    delay:
      type === 'delay'
        ? delayReducer(delay, action as Delay_SettingsActions)
        : delay,
    reverb:
      type === 'reverb'
        ? reverbReducer(reverb, action as Reverb_SettingsActions)
        : reverb,
    compressor:
      type === 'compressor'
        ? compressorReducer(compressor, action as Compressor_SettingsActions)
        : compressor,
    keyboardOffset:
      type === 'keyboard'
        ? (action as Keyboard_SettingsActions).payload
        : keyboardOffset,
  };

  return newState;
};
