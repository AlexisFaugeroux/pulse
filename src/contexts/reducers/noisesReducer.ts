import { audioContext, filter, whiteNoiseGain } from '../../nodesConfig';
import { Noise_Types, TIME_CONSTANT } from '../../utils/constants';
import { roundTwoDigitsNonFinite } from '../../utils/helpers';
import {
  Noise_SettingsActionTypes,
  Noise_SettingsActions,
} from '../types/noises';

const noisesReducer = (
  state: {
    whiteNoise: {
      id: string;
      isActive: boolean;
      gain: number;
    };
  },
  action: Noise_SettingsActions,
): typeof state => {
  const { whiteNoise } = state;
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
      if (!id || newValue === undefined) {
        console.error('Update noise settings: no id or value provided');
        return { ...state };
      }

      // Noise is too loud compared with oscillators
      const noiseGainValue =
        roundTwoDigitsNonFinite(newValue) -
        roundTwoDigitsNonFinite(newValue) * 0.7;

      whiteNoiseGain.gain.setTargetAtTime(
        noiseGainValue,
        audioContext.currentTime,
        TIME_CONSTANT,
      );
      return {
        ...state,
        whiteNoise: {
          ...whiteNoise,
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
        // disconnect other noises
        whiteNoiseGain.connect(filter.node);
      }
      return { ...state };
    default:
      return { ...state };
  }
};

export default noisesReducer;
