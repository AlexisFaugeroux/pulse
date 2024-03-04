import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Chorus_ActionTypes } from '../../../contexts/types';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const ChorusRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    chorus: { delay, depth, speed, feedback, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Chorus_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Chorus_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.CHORUS} isActive={isActive} setIsActive={setIsActive}>
      <Knob
        initialValue={delay}
        label="delay"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={depth}
        label="depth"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={speed}
        label="speed"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={feedback}
        label="feedback"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.CHORUS}
        parent={FXs.CHORUS}
      />
    </Rack>
  );
};

export default ChorusRack;
