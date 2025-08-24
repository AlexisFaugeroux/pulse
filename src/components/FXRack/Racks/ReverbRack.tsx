import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { ControlTypes, FXs } from '../../../utils/constants';
import { Knob } from '../../utils/Knob/Knob';
import { Rack } from './Rack';
import './Racks.scss';

export const ReverbRack: FC = () => {
	const { state: { reverb } } = useContext(SettingsContext);

  const { isActive, time, decay, wetGain } = reverb;

  return (
    <Rack type={FXs.REVERB} isActive={isActive}>
      <Knob
        initialValue={time}
        label="time"
        type={ControlTypes.REVERB}
        parent={FXs.REVERB}
      />
      <Knob
        initialValue={decay}
        label="decay"
        type={ControlTypes.REVERB}
        parent={FXs.REVERB}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.REVERB}
        parent={FXs.REVERB}
      />
    </Rack>
  );
};
