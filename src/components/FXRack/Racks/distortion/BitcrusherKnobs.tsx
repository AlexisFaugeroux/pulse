import { FC } from 'react';
import { initialSettings } from '../../../../nodesConfig';
import { ControlTypes, FXs } from '../../../../utils/constants';
import Knob from '../../../utils/Knob/Knob';

const BitcrusherKnobs: FC = () => {
  const {
    distortion: { bitcrusher },
  } = initialSettings;

  return (
    <>
      <Knob
        initialValue={bitcrusher.bitDepth}
        label="depth"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
      <Knob
        initialValue={bitcrusher.downsampling}
        label="d.sample"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
      <Knob
        initialValue={bitcrusher.wetGain}
        label="mix"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
    </>
  );
};

export default BitcrusherKnobs;
