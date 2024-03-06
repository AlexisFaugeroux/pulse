import { FC, PropsWithChildren, useEffect } from 'react';
import {
  analyser,
  audioContextOutput,
  bitcrusherDistortion,
  clippingDistortion,
  compressor,
  delay,
  filter,
  lfo,
  limiter,
  masterGain,
  oscAGain,
  oscBGain,
  reverb,
} from '../nodesConfig';

const AudioNodesConnect: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    // Oscillators
    oscAGain.connect(filter.dryGain);
    oscBGain.connect(filter.dryGain);
    oscAGain.connect(filter.node);
    oscBGain.connect(filter.node);

    // LFO
    lfo.connect(oscAGain.gain);
    lfo.connect(oscBGain.gain);

    // Filter
    filter.connect(clippingDistortion.dryGain);
    filter.connect(clippingDistortion.node);

    // Distortion
    clippingDistortion.connect(bitcrusherDistortion.dryGain);
    if (bitcrusherDistortion.node) {
      clippingDistortion.connect(bitcrusherDistortion.node);
    } else {
      console.log('Bitcrusher node is null');
    }

    bitcrusherDistortion.connect(delay.dryGain);
    bitcrusherDistortion.connect(delay.node);

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

export default AudioNodesConnect;
