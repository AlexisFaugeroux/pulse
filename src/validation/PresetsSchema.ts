import { z } from 'zod';
import { DistortionType, LFOMode } from '../utils/constants';

const OscillatorTypeSchema = z.enum(['sine', 'square', 'sawtooth', 'triangle']);

const OscSettingsSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  type: OscillatorTypeSchema,
  octaveOffset: z.number(),
  detune: z.number(),
  gain: z.number(),
});

const SubOscSettingsSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  type: OscillatorTypeSchema,
  octaveOffset: z.number(),
  gain: z.number(),
});

const NoiseSettingsSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  gain: z.number(),
});

const EnvelopeSettingsSchema = z.object({
  isActive: z.boolean(),
  attack: z.number(),
  decay: z.number(),
  sustain: z.number(),
  release: z.number(),
});

const BaseFxSettingsSchema = z.object({
  isActive: z.boolean(),
  dryGain: z.number(),
  wetGain: z.number(),
  mixGain: z.number(),
});

const BiquadFilterTypeSchema = z.enum([
  'lowpass',
  'highpass',
  'bandpass',
  'lowshelf',
  'highshelf',
  'peaking',
  'notch',
  'allpass',
]);

const FilterSettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    frequency: z.number(),
    gain: z.number(),
    Q: z.number(),
    type: BiquadFilterTypeSchema,
  }),
);

const DistortionSettingsSchema = z.object({
  isActive: z.boolean(),
  clipping: z.intersection(
    BaseFxSettingsSchema,
    z.object({
      type: z.nativeEnum(DistortionType),
      drive: z.number(),
    }),
  ),
  bitcrusher: z.intersection(
    BaseFxSettingsSchema,
    z.object({
      type: z.nativeEnum(DistortionType),
      bitDepth: z.number(),
      downsampling: z.number(),
    }),
  ),
});

const PhaserSettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    depth: z.number(),
    rate: z.number(),
    frequencyOffset: z.number(),
    q: z.number(),
    baseFrequency: z.number(),
    stereoPhase: z.number(),
  }),
);

const ChorusSettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    time: z.number(),
    depth: z.number(),
    feedback: z.number(),
    rate: z.number(),
    stereoPhase: z.number(),
  }),
);

const DelaySettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    time: z.number(),
    feedback: z.number(),
  }),
);

const ReverbSettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    time: z.number(),
    decay: z.number(),
  }),
);

const CompressorSettingsSchema = z.intersection(
  BaseFxSettingsSchema,
  z.object({
    threshold: z.number(),
    knee: z.number(),
    ratio: z.number(),
    attack: z.number(),
    release: z.number(),
  }),
);

const SettingsSchema = z.object({
  oscillators: z.object({
    oscillatorA: OscSettingsSchema,
    oscillatorB: OscSettingsSchema,
    subOscillator: SubOscSettingsSchema,
  }),
  noises: z.object({
    whiteNoise: NoiseSettingsSchema,
    pinkNoise: NoiseSettingsSchema,
    brownNoise: NoiseSettingsSchema,
  }),
  envelope: EnvelopeSettingsSchema,
  lfo: z.object({
    isActive: z.boolean(),
    mode: z.nativeEnum(LFOMode),
    type: OscillatorTypeSchema,
    frequency: z.number(),
    gain: z.number(),
  }),
  filter: FilterSettingsSchema,
  distortion: DistortionSettingsSchema,
  phaser: PhaserSettingsSchema,
  chorus: ChorusSettingsSchema,
  delay: DelaySettingsSchema,
  reverb: ReverbSettingsSchema,
  compressor: CompressorSettingsSchema,
  master: z.object({
    gain: z.number(),
  }),
  keyboardOffset: z.object({
    offset: z.number(),
  }),
});

const PresetSchema = z.object({
	name: z.string(),
  settings: SettingsSchema,
})

export const PresetsSchema = z.array(PresetSchema);
