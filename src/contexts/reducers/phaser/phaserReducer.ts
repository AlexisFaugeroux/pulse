import { getAudioNode } from '../../../audio/audioGraph';
import { PhaserSettings } from '../../../types/types';
import { Phaser_ActionTypes, Phaser_SettingsActions } from '../../types';
import { updateSettings } from './updateSettings';

const phaserReducer = (
  state: PhaserSettings,
  action: Phaser_SettingsActions,
): PhaserSettings => {
  const phaser = getAudioNode('phaser');
  if (!phaser) {
    console.error("phaser node is not initialized");
    return state;
  }

  switch (action.type) {
    case Phaser_ActionTypes.Activate:
      phaser.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });
      return { ...state, dryGain: 1 - state.wetGain, isActive: true };

    case Phaser_ActionTypes.Deactivate:
      phaser.deactivate();
      return { ...state, dryGain: 1 - state.wetGain, isActive: false };

    case Phaser_ActionTypes.UpdateSettings:
      return updateSettings(state, action);
    default:
      console.error('Reducer error action', action);
      return state;
  }
};

export default phaserReducer;
