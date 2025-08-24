import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { ControlTypes, FXs } from '../../../utils/constants';
import { Knob } from '../../utils/Knob/Knob';
import { Rack } from './Rack';
import './Racks.scss';

export const CompressorRack: FC = () => {
  const {
    state: { compressor },
  } = useContext(SettingsContext);

  const { isActive, attack, release, knee, ratio, threshold, wetGain } =
    compressor;

  return (
    <Rack type={FXs.COMPRESSOR} isActive={isActive}>
      <Knob
        initialValue={threshold}
        label="thresh."
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={ratio}
        label="ratio"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={knee}
        label="knee"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={attack}
        label="attack"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={release}
        label="release"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.COMPRESSOR}
        parent={FXs.COMPRESSOR}
      />
    </Rack>
  );
};
