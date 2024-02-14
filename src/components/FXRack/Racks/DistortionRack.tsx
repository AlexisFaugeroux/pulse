import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Distortion_ActionTypes } from '../../../contexts/types/distortion';
import { initialSettings } from '../../../nodesConfig';
import { ControlTypes, DistortionType, FXs } from '../../../utils/constants';
import FxPushButton from '../../utils/FxPushButton/FxPushButton';
import Knob from '../../utils/Knob/Knob';
import Rack from './Rack';
import './Racks.scss';

const DistortionRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [activePush, setActivePush] = useState<DistortionType>(
    DistortionType.SOFT,
  );

  const {
    distortion: { drive, wetGain },
  } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Distortion_ActionTypes.Activate,
        payload: {},
      });
    } else {
      dispatch({
        type: Distortion_ActionTypes.Deactivate,
        payload: {},
      });
    }
  }, [isActive, dispatch]);

  useEffect(() => {
    dispatch({
      type: Distortion_ActionTypes.UpdateType,
      payload: {
        id: activePush,
      },
    });
  }, [activePush, dispatch]);

  return (
    <Rack type={FXs.DISTORTION} isActive={isActive} setIsActive={setIsActive}>
      <div className="push-buttons">
        <FxPushButton
          label={DistortionType.SOFT}
          parent={FXs.DISTORTION}
          isRackActive={isActive}
          activePush={activePush}
          setActivePush={setActivePush}
        />
        <FxPushButton
          label={DistortionType.HARD}
          parent={FXs.DISTORTION}
          isRackActive={isActive}
          activePush={activePush}
          setActivePush={setActivePush}
        />
        {/* <FxPushButton
          label={DistortionType.BITCRUSHER}
          parent={FXs.DISTORTION}
          isRackActive={isActive}
          activePush={activePush}
          setActivePush={setActivePush}
        /> */}
      </div>
      <Knob
        initialValue={drive}
        label="drive"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
      <Knob
        initialValue={wetGain}
        label="mix"
        type={ControlTypes.DISTORTION}
        parent={FXs.DISTORTION}
      />
    </Rack>
  );
};

export default DistortionRack;
