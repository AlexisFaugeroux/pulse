import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../../contexts/Context';
import { Distortion_ActionTypes } from '../../../../contexts/types/distortion';
import { DistortionType, FXs } from '../../../../utils/constants';
import FxPushButton from '../../../utils/FxPushButton/FxPushButton';
import Rack from '../Rack';
import '../Racks.scss';
import BitcrusherKnobs from './BitcrusherKnobs';
import ClippingKnobs from './ClippingKnobs';

const DistortionRack: FC = () => {
  const { dispatch } = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [activePush, setActivePush] = useState<DistortionType>(
    DistortionType.SOFT,
  );

  useEffect(() => {
    if (isActive) {
      if (activePush === DistortionType.BITCRUSHER) {
        dispatch({
          type: Distortion_ActionTypes.DeactivateClipping,
          payload: {},
        });
        dispatch({
          type: Distortion_ActionTypes.ActivateBitcrusher,
          payload: {},
        });
      } else {
        dispatch({
          type: Distortion_ActionTypes.DeactivateBitcrusher,
          payload: {},
        });
        dispatch({
          type: Distortion_ActionTypes.ActivateClipping,
          payload: {},
        });
        dispatch({
          type: Distortion_ActionTypes.UpdateType,
          payload: {
            id: activePush,
          },
        });
      }
    } else {
      dispatch({
        type: Distortion_ActionTypes.DeactivateClipping,
        payload: {},
      });
      dispatch({
        type: Distortion_ActionTypes.DeactivateBitcrusher,
        payload: {},
      });
    }
  }, [isActive, dispatch, activePush]);

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
        <FxPushButton
          label={DistortionType.BITCRUSHER}
          parent={FXs.DISTORTION}
          isRackActive={isActive}
          activePush={activePush}
          setActivePush={setActivePush}
        />
      </div>
      {activePush === DistortionType.BITCRUSHER ? (
        <BitcrusherKnobs />
      ) : (
        <ClippingKnobs />
      )}
    </Rack>
  );
};

export default DistortionRack;
