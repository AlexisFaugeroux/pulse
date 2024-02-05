import { initialSettings } from '../../nodesConfig';
import { InitialSettingsState } from '../../types/types';
import { FXs } from '../constants';

type InitialSettingsStateFXs = Pick<InitialSettingsState, 'delay' | 'filter'>;

export default class FX {
  constructor(
    public audioContext: AudioContext,
    fxName: FXs,
  ) {
    const fxInitialSettings: InitialSettingsStateFXs = {
      delay: initialSettings.delay,
      filter: initialSettings.filter,
    };

    this.audioContext = audioContext;
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();
    this.mixGain = audioContext.createGain();

    this.dryGain.gain.value =
      fxInitialSettings[fxName as keyof InitialSettingsStateFXs].dryGain;
    this.wetGain.gain.value =
      fxInitialSettings[fxName as keyof InitialSettingsStateFXs].wetGain;
  }

  dryGain;
  wetGain;
  mixGain;

  wireUp(node: AudioNode) {
    this.dryGain.connect(this.mixGain);

    if (!node) throw new Error('FX class wireUp: node is null');
    node.connect(this.wetGain);

    this.wetGain.connect(this.mixGain);
  }

  connect(destination: AudioNode) {
    this.mixGain.connect(destination);
  }

  disconnect() {
    this.mixGain.disconnect();
  }
}
