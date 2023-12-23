export type OscSettings = {
  id: 'oscillatorA' | 'oscillatorB';
  isActive: boolean;
  type: OscillatorType;
  octaveOffset: number;
  detune: number;
};

export type GainSettings = {
  oscAGainValue: number;
  oscBGainValue: number;
};

export type EnvelopeSettings = {
  isActive: boolean;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type FilterSettings = {
  isActive: boolean;
  frequency: number;
  gain: number;
  Q: number;
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
  filter: FilterSettings;
};
