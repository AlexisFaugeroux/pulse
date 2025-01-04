import { FC, useContext } from 'react';
import { ControlTypes, FXs } from '../../../../utils/constants';
import { Knob } from '../../../utils/Knob/Knob';
import { SettingsContext } from '../../../../contexts/Context';

export const ClippingKnobs: FC = () => {
  const {
    state: {
      distortion: { clipping },
    },
  } = useContext(SettingsContext);

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
