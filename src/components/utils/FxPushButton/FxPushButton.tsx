import { useContext, type FC } from 'react';
import { DistortionType, FXs } from '../../../utils/constants';
import './FxPushButton.scss';
import { SettingsContext } from '../../../contexts/Context';
import { Distortion_ActionTypes } from '../../../contexts/types';

interface FxPushButtonProps {
  label: DistortionType;
  parent: FXs;
  isRackActive: boolean;
  activePush: DistortionType;
}

export const FxPushButton: FC<FxPushButtonProps> = ({
  label,
  parent,
  isRackActive,
  activePush,
}) => {
  const { dispatch } = useContext(SettingsContext);

  const handleOnClick = () => {
    if (isRackActive) {
      if (label === DistortionType.BITCRUSHER) {
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
            id: label,
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
  };

  return (
    <div className="fx-push-button">
      <div
        className={`fx-button-wrapper ${`fx-button-wrapper__${parent}`} ${
          isRackActive && activePush === label
            ? `fx-button-wrapper__active fx-button-wrapper__${parent}__active`
            : ''
        }`}
      >
        <button
          className={`fx-button-light ${`fx-button-light__${parent}`} ${
            isRackActive && activePush === label
              ? `fx-button-light__active fx-button-light__${parent}__active`
              : ''
          }`}
          onClick={handleOnClick}
        />
      </div>
      <h2 className="fx-push-button-label">{label.toUpperCase()}</h2>
    </div>
  );
};
