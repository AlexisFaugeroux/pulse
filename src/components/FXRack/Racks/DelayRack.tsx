import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { ControlTypes, FXs } from '../../../utils/constants';
import { Knob } from '../../utils/Knob/Knob';
import { Rack } from './Rack';
import './Racks.scss';

export const DelayRack: FC = () => {
  const {
    state: { delay },
  } = useContext(SettingsContext);

  const {isActive, time, feedback, wetGain } = delay;

  return (
    <Rack type={FXs.DELAY} isActive={isActive}>
      <Knob
        initialValue={time}
        label="time"
        type={ControlTypes.DELAY}
        parent={FXs.DELAY}
      />
      <Knob
        initialValue={feedback}
        label="feedback"
        type={ControlTypes.DELAY}
        parent={FXs.DELAY}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.DELAY}
        parent={FXs.DELAY}
      />
    </Rack>
  );
};
