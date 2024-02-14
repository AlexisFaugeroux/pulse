import { FC, PropsWithChildren, useEffect } from 'react';
import {
  audioContextOutput,
  delay,
  filter,
  lfo,
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

    // Filter
    filter.connect(delay.dryGain);
    filter.connect(delay.node);

    // LFO
    lfo.connect(oscAGain.gain);
    lfo.connect(oscBGain.gain);

    // Delay
    delay.connect(reverb.dryGain);
    delay.connect(reverb.node);

    // Reverb
    reverb.connect(masterGain);

    // Output
    masterGain.connect(audioContextOutput);
  }, []);

  return <>{children}</>;
};

export default AudioNodesConnect;
