import { getAudioNode } from '../../../audio/audioGraph';
import type { DistortionSettings } from '../../../types/types';
import { DistortionType } from '../../../utils/constants';
import type { Distortion_SettingsActions } from '../../types';

export function updateType(
  state: DistortionSettings,
  action: Distortion_SettingsActions,
): DistortionSettings {
  const clippingNode = getAudioNode('clipping');
  
  if (!clippingNode) {
    console.error("clipping node is not initialized");
    return state;
  }

  const { clipping } = state;

  if (!action.payload.id) throw new Error('Distortion type is undefined');
  if (action.payload.id === DistortionType.BITCRUSHER) return { ...state };

  clippingNode.setType(action.payload.id as DistortionType);
  clippingNode.makeDistortionCurve(
    state.clipping.drive,
    action.payload.id as DistortionType,
  );
  return {
    ...state,
    clipping: { ...clipping, type: action.payload.id as DistortionType },
  };
}
