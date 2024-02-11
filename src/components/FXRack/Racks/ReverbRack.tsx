import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Reverb_ActionTypes } from '../../../contexts/types/reverb';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const ReverbRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    reverb: { time, decay, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Reverb_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Reverb_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.REVERB} isActive={isActive} setIsActive={setIsActive}>
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

export default ReverbRack;
