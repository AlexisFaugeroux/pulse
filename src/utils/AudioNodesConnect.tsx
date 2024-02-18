import { FC, PropsWithChildren, useEffect } from 'react';
import {
  audioContextOutput,
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
    reverb.connect(limiter.node);
    // reverb.connect(masterGain);

    // Limiter
    limiter.connect(masterGain);

    // Output
    masterGain.connect(audioContextOutput);
  }, []);

  return <>{children}</>;
};

export default AudioNodesConnect;
