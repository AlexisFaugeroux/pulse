import {
  audioContext,
  brownNoiseGain,
  filter,
  pinkNoiseGain,
  whiteNoiseGain,
} from '../../nodesConfig';
import { NoiseSettings } from '../../types/types';
import { Noise_Types, TIME_CONSTANT } from '../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../utils/helpers';
import {
  Noise_SettingsActionTypes,
  Noise_SettingsActions,
} from '../types/noises';

const noisesReducer = (
  state: {
    whiteNoise: NoiseSettings;
    pinkNoise: NoiseSettings;
    brownNoise: NoiseSettings;
  },
  action: Noise_SettingsActions,
): typeof state => {
  const { whiteNoise, pinkNoise, brownNoise } = state;
  const { id, value: newValue } = action.payload;

  switch (action.type) {
    case Noise_SettingsActionTypes.Activate:
      if (!id) {
        console.error('Activate noise: no id provided');
        return { ...state };
      }
      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: true },
      };
    case Noise_SettingsActionTypes.Deactivate:
      if (!id) {
        console.error('Deactivate noise: no id provided');
        return { ...state };
      }
      return {
        ...state,
        [id]: { ...state[id as keyof typeof state], isActive: false },
      };
    case Noise_SettingsActionTypes.UpdateSettings: {
      if (newValue === undefined) {
        console.error('Update noise settings: no value provided');
        return { ...state };
      }

      // Noise is too loud compared with oscillators volume
      const reducedGainValue =
        roundTwoDigitsNonFinite(newValue) -
        roundTwoDigitsNonFinite(newValue) * 0.7;

      whiteNoiseGain.gain.setTargetAtTime(
        reducedGainValue,
        audioContext.currentTime,
        TIME_CONSTANT,
      );
      pinkNoiseGain.gain.setTargetAtTime(
        reducedGainValue,
        audioContext.currentTime,
        TIME_CONSTANT,
      );
      brownNoiseGain.gain.setTargetAtTime(
        reducedGainValue,
        audioContext.currentTime,
        TIME_CONSTANT,
      );

      return {
        ...state,
        whiteNoise: {
          ...whiteNoise,
          gain: newValue,
        },
        pinkNoise: {
          ...pinkNoise,
          gain: newValue,
        },
        brownNoise: {
          ...brownNoise,
          gain: newValue,
        },
      };
    }

    case Noise_SettingsActionTypes.UpdateType:
      if (!id) {
        console.error('Update noise type: no id provided');
        return { ...state };
      }
      if (id === Noise_Types.WHITE) {
        pinkNoiseGain.disconnect();
        brownNoiseGain.disconnect();

        whiteNoiseGain.connect(filter.dryGain);
        whiteNoiseGain.connect(filter.node);

        return {
          ...state,
          pinkNoise: { ...state.pinkNoise, isActive: false },
          brownNoise: { ...state.brownNoise, isActive: false },
        };
      } else if (id === Noise_Types.PINK) {
        whiteNoiseGain.disconnect();
        brownNoiseGain.disconnect();

        pinkNoiseGain.connect(filter.dryGain);
        pinkNoiseGain.connect(filter.node);

        return {
          ...state,
          whiteNoise: { ...state.whiteNoise, isActive: false },
          brownNoise: { ...state.brownNoise, isActive: false },
        };
      } else if (id === Noise_Types.BROWN) {
        whiteNoiseGain.disconnect();
        pinkNoiseGain.disconnect();

        brownNoiseGain.connect(filter.dryGain);
        brownNoiseGain.connect(filter.node);

        return {
          ...state,
          whiteNoise: { ...state.whiteNoise, isActive: false },
          pinkNoise: { ...state.pinkNoise, isActive: false },
        };
      }
      return { ...state };
    default:
      return { ...state };
  }
};

export default noisesReducer;
