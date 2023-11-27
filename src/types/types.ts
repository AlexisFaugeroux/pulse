export type OscSettings = {
  id: 'oscillatorA' | 'oscillatorB';
  isActive: boolean;
  type: OscillatorType;
  detune: number;
  adsr: EnvelopeSettings;
};

export type EnvelopeSettings = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type FilterSettings = {
  frequency: AudioParam;
  gain: AudioParam;
  Q: AudioParam;
  type: BiquadFilterType;
};

export type InitialSettingsState = {
  oscillators: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  };
  gains: {
    oscAGainValue: number;
    oscBGainValue: number;
  };
};
