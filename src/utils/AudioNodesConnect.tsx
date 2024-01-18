import { FC, PropsWithChildren, useEffect } from 'react';
import {
  audioContextOutput,
  filter,
  masterGain,
  oscAGain,
  oscBGain,
  oscLFOGain,
} from '../nodesConfig';

const AudioNodesConnect: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    oscAGain.connect(masterGain);
    oscBGain.connect(masterGain);

    oscLFOGain.connect(oscAGain.gain);
    oscLFOGain.connect(oscBGain.gain);

    filter.connect(masterGain);
    masterGain.connect(audioContextOutput);
  }, []);

  return <>{children}</>;
};

export default AudioNodesConnect;
