import { FC } from 'react';
import { initialSettings } from '../../../../nodesConfig';
import { ControlTypes, FXs } from '../../../../utils/constants';
import Knob from '../../../utils/Knob/Knob';

const ClippingKnobs: FC = () => {
  const {
    distortion: { clipping },
  } = initialSettings;

  return (
    <>
      <Knob
        initialValue={clipping.drive}
        label="drive"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
      <Knob
        initialValue={clipping.wetGain}
        label="mix"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
    </>
  );
};

export default ClippingKnobs;
