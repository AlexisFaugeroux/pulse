import { FC, PropsWithChildren, useEffect } from 'react';
import {
  analyser,
  audioContextOutput,
  bitcrusherDistortion,
  brownNoiseGain,
  chorus,
  clippingDistortion,
  compressor,
  delay,
  filter,
  lfo,
  limiter,
  masterGain,
  oscAGain,
  oscBGain,
  phaser,
  pinkNoiseGain,
  reverb,
  subGain,
  whiteNoiseGain,
} from '../nodesConfig';

export const AudioNodesConnect: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    // Oscillators
    oscAGain.connect(filter.dryGain);
    oscBGain.connect(filter.dryGain);
    subGain.connect(filter.dryGain);
    whiteNoiseGain.connect(filter.dryGain);
    pinkNoiseGain.connect(filter.dryGain);
    brownNoiseGain.connect(filter.dryGain);
    oscAGain.connect(filter.node);
    oscBGain.connect(filter.node);
    subGain.connect(filter.node);
    whiteNoiseGain.connect(filter.node);
    pinkNoiseGain.connect(filter.node);
    brownNoiseGain.connect(filter.node);

    // LFO
    lfo.connect(oscAGain.gain);
    lfo.connect(oscBGain.gain);
    lfo.connect(subGain.gain);
    lfo.connect(whiteNoiseGain.gain);
    lfo.connect(pinkNoiseGain.gain);
    lfo.connect(brownNoiseGain.gain);

    // Filter
    filter.connect(clippingDistortion.dryGain);
    filter.connect(clippingDistortion.node);

    // Distortion
    clippingDistortion.connect(bitcrusherDistortion.dryGain);
    if (bitcrusherDistortion.node) {
      clippingDistortion.connect(bitcrusherDistortion.node);
    } else {
      console.error('Bitcrusher node is null');
    }

    bitcrusherDistortion.connect(phaser.dryGain);
    bitcrusherDistortion.connect(phaser.node);

    // Phaser
    phaser.connect(chorus.dryGain);
    phaser.connect(chorus.node);

    // Chorus
    chorus.connect(delay.dryGain);
    chorus.connect(delay.node);

    // Delay
    delay.connect(reverb.dryGain);
    delay.connect(reverb.node);

    // Reverb
    reverb.connect(compressor.dryGain);
    reverb.connect(compressor.node);

    // Compressor
    compressor.connect(limiter.node);

    // Limiter
    limiter.connect(masterGain);

    // Master
    masterGain.connect(analyser.node);

    // Analyser
    analyser.connect(audioContextOutput);
  }, []);

  return <>{children}</>;
};
