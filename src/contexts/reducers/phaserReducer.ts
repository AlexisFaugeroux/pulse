import { phaser } from '../../nodesConfig';
import { PhaserSettings } from '../../types/types';
import { Phaser_ActionTypes, Phaser_SettingsActions } from '../types';

const phaserReducer = (
  state: PhaserSettings,
  action: Phaser_SettingsActions,
): PhaserSettings => {
  switch (action.type) {
    case Phaser_ActionTypes.Activate:
      phaser.activate({ dryValue: 1 - state.wetGain, wetValue: state.wetGain });
      return { ...state, dryGain: 1 - state.wetGain, isActive: true };

    case Phaser_ActionTypes.Deactivate:
      phaser.deactivate();
      return { ...state, dryGain: 1 - state.wetGain, isActive: false };

    case Phaser_ActionTypes.UpdateSettings:
      {
        const { id, value } = action.payload;
        if (!id || !value) return { ...state };
        if (id === 'base.freq') {
          phaser.setBaseFrequency(value);
          return { ...state, baseFrequency: value };
        }
        if (id === 'rate') {
          phaser.setRate(value);
          return { ...state, rate: value };
        }
        if (id === 'depth') {
          phaser.setDepth(value);
          return { ...state, depth: value };
        }
        if (id === 'Q') {
          phaser.setQ(value);
          return { ...state, q: value };
        }
        if (id === 'mix' && state.isActive) {
          const newDryValue = 1 - value;
          phaser.setDryGain(newDryValue);
          phaser.setWetGain(value);

          return {
            ...state,
            dryGain: newDryValue,
            wetGain: value,
          };
        }
      }
      return { ...state };
    default:
      console.log('Reducer error action', action);
      return { ...state };
  }
};

export default phaserReducer;
