import {
  EnvelopeSettings,
  NoiseSettings,
  OscSettings,
  SubOscSettings,
} from '../../../types/types';

export interface OscillatorState {
  oscillatorA: OscSettings;
  oscillatorB: OscSettings;
  subOscillator: SubOscSettings;
}

export interface OscillatroTriggerState {
  oscillators: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
    subOscillator: SubOscSettings;
  };
  noises: {
    whiteNoise: NoiseSettings;
    pinkNoise: NoiseSettings;
    brownNoise: NoiseSettings;
  };
  envelope: EnvelopeSettings;
}
