export const NOTES: {
  [key: string]: string | number;
  note: string;
  frequency: number;
}[] = [
  { note: 'C0', frequency: 16.35 },
  { note: 'C#0', frequency: 17.32 },
  { note: 'D0', frequency: 18.35 },
  { note: 'D#0', frequency: 19.45 },
  { note: 'E0', frequency: 20.6 },
  { note: 'F0', frequency: 21.83 },
  { note: 'F#0', frequency: 23.12 },
  { note: 'G0', frequency: 24.5 },
  { note: 'G#0', frequency: 25.96 },
  { note: 'A0', frequency: 27.5 },
  { note: 'A#0', frequency: 29.14 },
  { note: 'B0', frequency: 30.87 },

  { note: 'C1', frequency: 32.7 },
  { note: 'C#1', frequency: 34.65 },
  { note: 'D1', frequency: 36.71 },
  { note: 'D#1', frequency: 38.89 },
  { note: 'E1', frequency: 41.2 },
  { note: 'F1', frequency: 43.65 },
  { note: 'F#1', frequency: 46.25 },
  { note: 'G1', frequency: 49 },
  { note: 'G#1', frequency: 51.91 },
  { note: 'A1', frequency: 55 },
  { note: 'A#1', frequency: 58.27 },
  { note: 'B1', frequency: 61.74 },

  { note: 'C2', frequency: 65.41 },
  { note: 'C#2', frequency: 69.3 },
  { note: 'D2', frequency: 73.42 },
  { note: 'D#2', frequency: 77.78 },
  { note: 'E2', frequency: 82.41 },
  { note: 'F2', frequency: 87.31 },
  { note: 'F#2', frequency: 92.5 },
  { note: 'G2', frequency: 98 },
  { note: 'G#2', frequency: 103.83 },
  { note: 'A2', frequency: 110 },
  { note: 'A#2', frequency: 116.54 },
  { note: 'B2', frequency: 123.47 },

  { note: 'C3', frequency: 130.81 },
  { note: 'C#3', frequency: 138.59 },
  { note: 'D3', frequency: 146.83 },
  { note: 'D#3', frequency: 155.56 },
  { note: 'E3', frequency: 164.81 },
  { note: 'F3', frequency: 174.61 },
  { note: 'F#3', frequency: 185 },
  { note: 'G3', frequency: 196 },
  { note: 'G#3', frequency: 207.65 },
  { note: 'A3', frequency: 220 },
  { note: 'A#3', frequency: 233.08 },
  { note: 'B3', frequency: 246.94 },

  { note: 'C4', frequency: 261.63 },
  { note: 'C#4', frequency: 277.18 },
  { note: 'D4', frequency: 293.66 },
  { note: 'D#4', frequency: 311.13 },
  { note: 'E4', frequency: 329.63 },
  { note: 'F4', frequency: 349.23 },
  { note: 'F#4', frequency: 369.99 },
  { note: 'G4', frequency: 392 },
  { note: 'G#4', frequency: 415.3 },
  { note: 'A4', frequency: 440 },
  { note: 'A#4', frequency: 466.16 },
  { note: 'B4', frequency: 493.884 },

  { note: 'C5', frequency: 523.25 },
  { note: 'C#5', frequency: 554.37 },
  { note: 'D5', frequency: 587.33 },
  { note: 'D#5', frequency: 622.25 },
  { note: 'E5', frequency: 659.26 },
  { note: 'F5', frequency: 698.46 },
  { note: 'F#5', frequency: 739.99 },
  { note: 'G5', frequency: 783.99 },
  { note: 'G#5', frequency: 830.61 },
  { note: 'A5', frequency: 880 },
  { note: 'A#5', frequency: 932.33 },
  { note: 'B5', frequency: 987.77 },

  { note: 'C6', frequency: 1046.5 },
  { note: 'C#6', frequency: 1108.73 },
  { note: 'D6', frequency: 1174.66 },
  { note: 'D#6', frequency: 1244.51 },
  { note: 'E6', frequency: 1318.51 },
  { note: 'F6', frequency: 1396.91 },
  { note: 'F#6', frequency: 1479.98 },
  { note: 'G6', frequency: 1567.98 },
  { note: 'G#6', frequency: 1661.221 },
  { note: 'A6', frequency: 1760 },
  { note: 'A#6', frequency: 1864.663 },
  { note: 'B6', frequency: 1975.53 },

  { note: 'C7', frequency: 2093 },
  { note: 'C#7', frequency: 2217.46 },
  { note: 'D7', frequency: 2349.32 },
  { note: 'D#7', frequency: 2489.02 },
  { note: 'E7', frequency: 2637.02 },
  { note: 'F7', frequency: 2793.83 },
  { note: 'F#7', frequency: 2959.96 },
  { note: 'G7', frequency: 3135.96 },
  { note: 'G#7', frequency: 3322.44 },
  { note: 'A7', frequency: 3520 },
  { note: 'A#7', frequency: 3729.31 },
  { note: 'B7', frequency: 3951.07 },

  { note: 'C8', frequency: 4186.01 },
  { note: 'C#8', frequency: 4434.92 },
  { note: 'D8', frequency: 4698.63 },
  { note: 'D#8', frequency: 4978.03 },
  { note: 'E8', frequency: 5274.04 },
  { note: 'F8', frequency: 5587.65 },
  { note: 'F#8', frequency: 5919.91 },
  { note: 'G8', frequency: 6271.93 },
  { note: 'G#8', frequency: 6644.88 },
  { note: 'A8', frequency: 7040 },
  { note: 'A#8', frequency: 7458.62 },
  { note: 'B8', frequency: 7902.13 },
];

export const KEYBOARD_DEFAULT_OCTAVES = {
  lower: 2,
  upper: 3,
};

export const ALLOWED_KEYS = [
  'q',
  'z',
  's',
  'e',
  'd',
  'r',
  'f',
  't',
  'g',
  'y',
  'h',
  'u',
  'j',
  'i',
  'k',
  'o',
  'l',
  'p',
  'm',
  'w',
  'x',
  'c',
  'v',
  'b',
];

export const KEY_TO_NOTES: Record<string, Record<string, string[]>> = {
  GROUP1: {
    q: ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    z: ['C#0', 'C#1', 'C#2', 'C#3', 'C#4', 'C#5', 'C#6', 'C#7', 'C#8'],
    s: ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    e: ['D#0', 'D#1', 'D#2', 'D#3', 'D#4', 'D#5', 'D#6', 'D#7', 'D#8'],
    d: ['E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
    r: ['F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
    f: ['F#0', 'F#1', 'F#2', 'F#3', 'F#4', 'F#5', 'F#6', 'F#7', 'F#8'],
    t: ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
    g: ['G#0', 'G#1', 'G#2', 'G#3', 'G#4', 'G#5', 'G#6', 'G#7', 'G#8'],
    y: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    h: ['A#0', 'A#1', 'A#2', 'A#3', 'A#4', 'A#5', 'A#6', 'A#7', 'A#8'],
    u: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
  },
  GROUP2: {
    j: ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    i: ['C#0', 'C#1', 'C#2', 'C#3', 'C#4', 'C#5', 'C#6', 'C#7', 'C#8'],
    k: ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    o: ['D#0', 'D#1', 'D#2', 'D#3', 'D#4', 'D#5', 'D#6', 'D#7', 'D#8'],
    l: ['E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
    p: ['F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
    m: ['F#0', 'F#1', 'F#2', 'F#3', 'F#4', 'F#5', 'F#6', 'F#7', 'F#8'],
    w: ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
    x: ['G#0', 'G#1', 'G#2', 'G#3', 'G#4', 'G#5', 'G#6', 'G#7', 'G#8'],
    c: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    v: ['A#0', 'A#1', 'A#2', 'A#3', 'A#4', 'A#5', 'A#6', 'A#7', 'A#8'],
    b: ['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
  },
};

export const NOTE_TO_KEYS: Record<string, string[]> = {
  C0: ['q', 'j'],
  'C#0': ['z', 'i'],
  D0: ['s', 'k'],
  'D#0': ['e', 'o'],
  E0: ['d', 'l'],
  F0: ['r', 'p'],
  'F#0': ['f', 'm'],
  G0: ['t', 'w'],
  'G#0': ['g', 'x'],
  A0: ['y', 'c'],
  'A#0': ['h', 'v'],
  B0: ['u', 'b'],
  C1: ['j', 'q'],
  'C#1': ['i', 'z'],
  D1: ['k', 's'],
  'D#1': ['o', 'e'],
  E1: ['l', 'd'],
  F1: ['p', 'r'],
  'F#1': ['m', 'f'],
  G1: ['w', 't'],
  'G#1': ['x', 'g'],
  A1: ['c', 'y'],
  'A#1': ['v', 'h'],
  B1: ['b', 'u'],
  C2: ['q', 'j'],
  'C#2': ['z', 'i'],
  D2: ['s', 'k'],
  'D#2': ['e', 'o'],
  E2: ['d', 'l'],
  F2: ['r', 'p'],
  'F#2': ['f', 'm'],
  G2: ['t', 'w'],
  'G#2': ['g', 'x'],
  A2: ['y', 'c'],
  'A#2': ['h', 'v'],
  B2: ['u', 'b'],
  C3: ['j', 'q'],
  'C#3': ['i', 'z'],
  D3: ['k', 's'],
  'D#3': ['o', 'e'],
  E3: ['l', 'd'],
  F3: ['p', 'r'],
  'F#3': ['m', 'f'],
  G3: ['w', 't'],
  'G#3': ['x', 'g'],
  A3: ['c', 'y'],
  'A#3': ['v', 'h'],
  B3: ['b', 'u'],
  C4: ['q', 'j'],
  'C#4': ['z', 'i'],
  D4: ['s', 'k'],
  'D#4': ['e', 'o'],
  E4: ['d', 'l'],
  F4: ['r', 'p'],
  'F#4': ['f', 'm'],
  G4: ['t', 'w'],
  'G#4': ['g', 'x'],
  A4: ['y', 'c'],
  'A#4': ['h', 'v'],
  B4: ['u', 'b'],
  C5: ['j', 'q'],
  'C#5': ['i', 'z'],
  D5: ['k', 's'],
  'D#5': ['o', 'e'],
  E5: ['l', 'd'],
  F5: ['p', 'r'],
  'F#5': ['m', 'f'],
  G5: ['w', 't'],
  'G#5': ['x', 'g'],
  A5: ['c', 'y'],
  'A#5': ['v', 'h'],
  B5: ['b', 'u'],
  C6: ['q', 'j'],
  'C#6': ['z', 'i'],
  D6: ['s', 'k'],
  'D#6': ['e', 'o'],
  E6: ['d', 'l'],
  F6: ['r', 'p'],
  'F#6': ['f', 'm'],
  G6: ['t', 'w'],
  'G#6': ['g', 'x'],
  A6: ['y', 'c'],
  'A#6': ['h', 'v'],
  B6: ['u', 'b'],
  C7: ['j', 'q'],
  'C#7': ['i', 'z'],
  D7: ['k', 's'],
  'D#7': ['o', 'e'],
  E7: ['l', 'd'],
  F7: ['p', 'r'],
  'F#7': ['m', 'f'],
  G7: ['w', 't'],
  'G#7': ['x', 'g'],
  A7: ['c', 'y'],
  'A#7': ['v', 'h'],
  B7: ['b', 'u'],
  C8: ['q', 'j'],
  'C#8': ['z', 'i'],
  D8: ['s', 'k'],
  'D#8': ['e', 'o'],
  E8: ['d', 'l'],
  F8: ['r', 'p'],
  'F#8': ['f', 'm'],
  G8: ['t', 'w'],
  'G#8': ['g', 'x'],
  A8: ['y', 'c'],
  'A#8': ['h', 'v'],
  B8: ['u', 'b'],
};

export const NOISE_VALUES = ['White', 'Pink', 'Brown'];

export enum LFOMode {
  TREMOLO = 'TREMOLO',
  VIBRATO = 'VIBRATO',
}

export enum ControlTypes {
  MASTER = 'master',
  DEFAULT = 'default',
  DISTORTION = 'distortion',
  FLANGER = 'flanger',
  DELAY = 'delay',
  REVERB = 'reverb',
  CHORUS = 'chorus',
  COMPRESSOR = 'compressor',
}

export enum Waves {
  SINE = 'sine',
  TRIANGLE = 'triangle',
  SAWTOOTH = 'sawtooth',
  SQUARE = 'square',
}

export const FILTER_VALUES = [
  'Lowpass',
  'Highpass',
  'Bandpass',
  'Lowshelf',
  'Highshelf',
  'Peaking',
  'Notch',
  'Allpass',
];

export enum FXs {
  BITCRUSHER = 'bitcrusher',
  DELAY = 'delay',
  DISTORTION = 'distortion',
  FILTER = 'filter',
  FLANGER = 'flanger',
  REVERB = 'reverb',
  CHORUS = 'chorus',
  COMPRESSOR = 'compressor',
}

export enum DistortionType {
  SOFT = 'soft clip',
  HARD = 'hard clip',
  BITCRUSHER = 'bitcrusher',
}

export const TIME_CONSTANT = 0.01;
