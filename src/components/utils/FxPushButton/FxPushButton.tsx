import React, { FC } from 'react';
import { DistortionType, FXs } from '../../../utils/constants';
import './FxPushButton.scss';

interface FxPushButtonProps {
  label: DistortionType;
  parent: FXs;
  isRackActive: boolean;
  activePush: DistortionType;
  setActivePush: React.Dispatch<React.SetStateAction<DistortionType>>;
}

const FxPushButton: FC<FxPushButtonProps> = ({
  label,
  parent,
  isRackActive,
  activePush,
  setActivePush,
}) => {
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
          onClick={() => setActivePush(label)}
        />
      </div>
      <h2 className="fx-push-button-label">{label.toUpperCase()}</h2>
    </div>
  );
};

export default FxPushButton;
