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
  oscLFOGainValue: number;
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

export type DelaySettings = {
  isActive: boolean;
  time: number;
  feedback: number;
  delayDryGain: number;
  delayWetGain: number;
  delayMixGain: number;
};

export type InitialSettingsState = {
  oscillators: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  };
  envelope: EnvelopeSettings;
  gains: GainSettings;
  lfo: {
    isActive: boolean;
    type: OscillatorType;
    frequency: number;
  };
  filter: FilterSettings;
  delay: DelaySettings;
};
