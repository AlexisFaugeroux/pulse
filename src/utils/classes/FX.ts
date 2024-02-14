import { initialSettings } from '../../nodesConfig';
import { InitialSettingsState } from '../../types/types';
import { FXs, TIME_CONSTANT } from '../constants';
import { roundTwoDigits } from '../helpers';

type InitialSettingsStateFXs = Pick<
  InitialSettingsState,
  'delay' | 'filter' | 'reverb'
>;

export default class FX {
  dryGain;
  wetGain;
  mixGain;

  constructor(
    public audioContext: AudioContext,
    fxName: FXs,
  ) {
    const fxInitialSettings: InitialSettingsStateFXs = {
      delay: initialSettings.delay,
      filter: initialSettings.filter,
      reverb: initialSettings.reverb,
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

  connect(destination: AudioNode) {
    this.mixGain.connect(destination);
  }

  disconnect() {
    this.mixGain.disconnect();
  }

  activate({ dryValue, wetValue }: { dryValue: number; wetValue: number }) {
    const { currentTime } = this.audioContext;

    this.dryGain.gain.setValueAtTime(dryValue, currentTime + TIME_CONSTANT);
    this.wetGain.gain.setValueAtTime(wetValue, currentTime + TIME_CONSTANT);
    this.wetGain.connect(this.mixGain);
  }

  deactivate() {
    const { currentTime } = this.audioContext;
    this.dryGain.gain.setValueAtTime(1, currentTime + TIME_CONSTANT);
    this.wetGain.gain.setValueAtTime(0, currentTime + TIME_CONSTANT);
    this.wetGain.disconnect();
  }

  setDryGain(value: number) {
    this.dryGain.gain.setValueAtTime(
      roundTwoDigits(value),
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  setWetGain(value: number) {
    this.wetGain.gain.setValueAtTime(
      // Input value based on mouse drag has precision issue, value is often not 0 when input visually is
      value < 0.03 ? 0 : roundTwoDigits(value),
      this.audioContext.currentTime + TIME_CONSTANT,
    );
  }

  wireUp(node: AudioNode) {
    this.dryGain.connect(this.mixGain);

    if (!node) throw new Error('FX class wireUp: node is null');
    node.connect(this.wetGain);

    this.wetGain.connect(this.mixGain);
  }
}
