import { FC, PropsWithChildren, useEffect } from 'react';
import {
  audioContextOutput,
  delay,
  delayDryGain,
  delayMixGain,
  delayWetGain,
  feedback,
  masterGain,
  oscAGain,
  oscBGain,
  oscLFOGain,
} from '../nodesConfig';

const AudioNodesConnect: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    // Oscillators
    oscAGain.connect(delayDryGain);
    oscBGain.connect(delayDryGain);
    oscAGain.connect(delay);
    oscBGain.connect(delay);

    // LFO
    oscLFOGain.connect(oscAGain.gain);
    oscLFOGain.connect(oscBGain.gain);

    // Delay
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayWetGain);
    delayDryGain.connect(delayMixGain);
    delayWetGain.connect(delayMixGain);
    delayMixGain.connect(masterGain);

    // Output
    masterGain.connect(audioContextOutput);
  }, []);

  return <>{children}</>;
};

export default AudioNodesConnect;
