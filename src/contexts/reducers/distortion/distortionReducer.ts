import { bitcrusherDistortion, clippingDistortion } from '../../../nodesConfig';
import { DistortionSettings } from '../../../types/types';
import {
  Distortion_ActionTypes,
  Distortion_SettingsActions,
} from '../../types/distortion';
import { activateBitcrusher } from './activateBitcrusher';
import { activateClipping } from './activateClipping';
import { updateSettingsBitcrusher } from './updateSettingsBitcrusher';
import { updateSettingsClipping } from './updateSettingsClipping';
import { updateType } from './updateType';

const distortionReducer = (
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings => {
  const { clipping, bitcrusher } = state;

  switch (action.type) {
    case Distortion_ActionTypes.ActivateClipping:
      return activateClipping(state);

    case Distortion_ActionTypes.ActivateBitcrusher:
      return activateBitcrusher(state);

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

    case Distortion_ActionTypes.UpdateSettingsClipping:
      return updateSettingsClipping(state, action);

    case Distortion_ActionTypes.UpdateSettingsBitcrusher:
      return updateSettingsBitcrusher(state, action);

    case Distortion_ActionTypes.UpdateType:
      return updateType(state, action);

    default:
      console.error('Reducer error action', action);
      return { ...state };
  }
};

export default distortionReducer;
