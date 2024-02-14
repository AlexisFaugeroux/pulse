import { distortion } from '../../nodesConfig';
import { DistortionSettings } from '../../types/types';
import { DistortionType } from '../../utils/constants';
import {
  Distortion_ActionTypes,
  Distortion_SettingsActions,
} from '../types/distortion';

const distortionReducer = (
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings => {
  switch (action.type) {
    case Distortion_ActionTypes.Activate:
      distortion.activate({
        dryValue: 1 - state.wetGain,
        wetValue: state.wetGain,
      });

      return {
        ...state,
        dryGain: 1 - state.wetGain,
        isActive: true,
      };

    case Distortion_ActionTypes.Deactivate:
      distortion.deactivate();

      return { ...state, dryGain: 1, isActive: false };

    case Distortion_ActionTypes.UpdateSettings: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'drive') {
        distortion.setDrive(value);

        return { ...state, drive: value };
      }

      if (id === 'mix') {
        const newDryValue = 1 - value;

        if (state.isActive) {
          distortion.setDryGain(newDryValue);
          distortion.setWetGain(value);
        }

        return {
          ...state,
          dryGain: newDryValue,
          wetGain: value,
        };
      }
      return { ...state };
    }

    case Distortion_ActionTypes.UpdateType: {
      distortion.setType(action.payload.id as DistortionType);

      return { ...state, type: action.payload.id as DistortionType };
    }

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default distortionReducer;
