export type OscSettings = {
  id: 'oscillatorA' | 'oscillatorB';
  isActive: boolean;
  type: OscillatorType;
  octaveOffset: number;
  detune: number;
};

export type EnvelopeSettings = {
  isActive: boolean;
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
  envelope: EnvelopeSettings;
  gains: {
    oscAGainValue: number;
    oscBGainValue: number;
  };
};
