import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Flanger_ActionTypes } from '../../../contexts/types';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const FlangerRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    flanger: { delay, depth, speed, feedback, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Flanger_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Flanger_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.FLANGER} isActive={isActive} setIsActive={setIsActive}>
      <Knob
        initialValue={delay}
        label="delay"
        type={ControlTypes.FLANGER}
        parent={FXs.FLANGER}
      />
      <Knob
        initialValue={depth}
        label="depth"
        type={ControlTypes.FLANGER}
        parent={FXs.FLANGER}
      />
      <Knob
        initialValue={speed}
        label="speed"
        type={ControlTypes.FLANGER}
        parent={FXs.FLANGER}
      />
      <Knob
        initialValue={feedback}
        label="feedback"
        type={ControlTypes.FLANGER}
        parent={FXs.FLANGER}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.FLANGER}
        parent={FXs.FLANGER}
      />
    </Rack>
  );
};

export default FlangerRack;
