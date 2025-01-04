import { FC, useContext } from 'react';
import { ControlTypes, FXs } from '../../../../utils/constants';
import { Knob } from '../../../utils/Knob/Knob';
import { SettingsContext } from '../../../../contexts/Context';

export const BitcrusherKnobs: FC = () => {
  const {
    state: {
      distortion: { bitcrusher },
    },
  } = useContext(SettingsContext);

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
