import { bitcrusherDistortion, clippingDistortion } from '../../nodesConfig';
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
  const { clipping, bitcrusher } = state;

  switch (action.type) {
    case Distortion_ActionTypes.ActivateClipping:
      clippingDistortion.activate({
        dryValue: 1 - clipping.wetGain,
        wetValue: clipping.wetGain,
      });
      return {
        ...state,
        clipping: {
          ...clipping,
          isActive: true,
          dryGain: 1 - clipping.wetGain,
        },
        isActive: true,
      };

    case Distortion_ActionTypes.ActivateBitcrusher:
      bitcrusherDistortion.activate({
        dryValue: 1 - bitcrusher.wetGain,
        wetValue: bitcrusher.wetGain,
      });
      return {
        ...state,
        bitcrusher: {
          ...bitcrusher,
          isActive: true,
          dryGain: 1 - bitcrusher.wetGain,
        },
        isActive: true,
      };

    case Distortion_ActionTypes.DeactivateClipping:
      clippingDistortion.deactivate();
      return {
        ...state,
        clipping: { ...clipping, isActive: false, dryGain: 1 },
        isActive: false,
      };

    case Distortion_ActionTypes.DeactivateBitcrusher:
      bitcrusherDistortion.deactivate();
      return {
        ...state,
        bitcrusher: { ...bitcrusher, isActive: false, dryGain: 1 },
        isActive: false,
      };

    case Distortion_ActionTypes.UpdateSettingsClipping: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'drive') {
        const newDriveValue = clippingDistortion.setDrive(value);
        clippingDistortion.makeDistortionCurve(
          newDriveValue,
          state.clipping.type,
        );
        return { ...state, clipping: { ...clipping, drive: value } };
      }
      if (id === 'mix') {
        const newDryValue = 1 - value;
        if (state.isActive && clipping.isActive) {
          clippingDistortion.setDryGain(newDryValue);
          clippingDistortion.setWetGain(value);
        }
        return {
          ...state,
          clipping: { ...clipping, dryGain: newDryValue, wetGain: value },
        };
      }
      return { ...state };
    }

    case Distortion_ActionTypes.UpdateSettingsBitcrusher: {
      const { id, value } = action.payload;
      if (!id || !value) return { ...state };

      if (id === 'depth') {
        bitcrusherDistortion.setBitDepth(value);
        return { ...state, bitcrusher: { ...bitcrusher, bitDepth: value } };
      }
      if (id === 'd.sample') {
        bitcrusherDistortion.setDownsampling(value);
        return { ...state, bitcrusher: { ...bitcrusher, downsampling: value } };
      }
      if (id === 'mix') {
        const newDryValue = 1 - value;
        if (state.isActive && bitcrusher.isActive) {
          bitcrusherDistortion.setDryGain(newDryValue);
          bitcrusherDistortion.setWetGain(value);
        }
        return {
          ...state,
          bitcrusher: { ...bitcrusher, dryGain: newDryValue, wetGain: value },
        };
      }
      return { ...state };
    }

    case Distortion_ActionTypes.UpdateType: {
      if (!action.payload.id) throw new Error('Distortion type is undefined');
      if (action.payload.id === DistortionType.BITCRUSHER) return { ...state };

      clippingDistortion.setType(action.payload.id as DistortionType);
      clippingDistortion.makeDistortionCurve(
        state.clipping.drive,
        action.payload.id as DistortionType,
      );
      return {
        ...state,
        clipping: { ...clipping, type: action.payload.id as DistortionType },
      };
    }

    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default distortionReducer;
