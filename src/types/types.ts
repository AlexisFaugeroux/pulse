export type OscSettings = {
    frequency: AudioParam;
    detune: AudioParam;
    type: OscillatorType;
    adsr: EnvelopeSettings;
};

export type EnvelopeSettings = {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export type FilterSettings = {
    frequency: AudioParam;
    gain: AudioParam;
    Q: AudioParam;
    type: BiquadFilterType
}