import { FC, PropsWithChildren, useEffect } from 'react';
import {
  analyser,
  audioContextOutput,
  compressor,
  delay,
  distortion,
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
    filter.connect(distortion.dryGain);
    filter.connect(distortion.node);

    // Distortion
    distortion.connect(delay.dryGain);
    distortion.connect(delay.node);

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
