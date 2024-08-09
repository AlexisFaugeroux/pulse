import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Phaser_ActionTypes } from '../../../contexts/types';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, FXs } from '../../../utils/constants';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const PhaserRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);

  const {
    phaser: { rate, depth, frequency, feedback, stereo, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Phaser_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Phaser_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  return (
    <Rack type={FXs.PHASER} isActive={isActive} setIsActive={setIsActive}>
      <Knob
        initialValue={rate}
        label="rate"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={depth}
        label="depth"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={frequency}
        label="frequency"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={feedback}
        label="feedback"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={stereo}
        label="stereo"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.PHASER}
        parent={FXs.PHASER}
      />
    </Rack>
  );
};

export default PhaserRack;
