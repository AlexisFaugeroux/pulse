import type { NoiseSettings } from "../../../types/types";

export interface NoisesState {
  [key: string]: NoiseSettings;
  whiteNoise: NoiseSettings;
  pinkNoise: NoiseSettings;
  brownNoise: NoiseSettings;
}
