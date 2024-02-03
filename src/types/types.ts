export type OscSettings = {
  id: 'oscillatorA' | 'oscillatorB';
  isActive: boolean;
  type: OscillatorType;
  octaveOffset: number;
  detune: number;
  gain: number;
};

export type EnvelopeSettings = {
  [key: string]: boolean | number;
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
  dryGain: number;
  wetGain: number;
  mixGain: number;
};

export type DelaySettings = {
  isActive: boolean;
  time: number;
  feedback: number;
  dryGain: number;
  wetGain: number;
  mixGain: number;
};

export type InitialSettingsState = {
  oscillators: {
    oscillatorA: OscSettings;
    oscillatorB: OscSettings;
  };
  envelope: EnvelopeSettings;
  lfo: {
    isActive: boolean;
    type: OscillatorType;
    frequency: number;
    gain: number;
  };
  filter: FilterSettings;
  delay: DelaySettings;
  master: {
    gain: number;
  };
};
