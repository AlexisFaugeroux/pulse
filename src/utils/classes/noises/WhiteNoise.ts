import { EnvelopeSettings } from '../../../types/types';
import { Noise_Types } from '../../constants';
import Noise from './Noise';

export default class WhiteNoise extends Noise {
  constructor(
    public audioContext: AudioContext,
    public destination: GainNode,
    public envelope: EnvelopeSettings,
    public refFrequency: number, // used as an unique 'key' to identify between several noises
  ) {
    super(audioContext, destination, envelope, refFrequency, Noise_Types.WHITE);
  }
}
