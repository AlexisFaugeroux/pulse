import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Delay_ActionTypes } from '../../../contexts/types';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const DelayRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    delay: { time, feedback, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Delay_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Delay_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.DELAY} isActive={isActive} setIsActive={setIsActive}>
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

export default DelayRack;
