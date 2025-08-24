import { type FC, useContext } from 'react';
import { SettingsContext } from '../../../../contexts/Context';
import { DistortionType, FXs } from '../../../../utils/constants';
import { FxPushButton } from '../../../utils/FxPushButton/FxPushButton';
import { Rack } from '../Rack';
import '../Racks.scss';
import BitcrusherKnobs from './BitcrusherKnobs';
import { ClippingKnobs } from './ClippingKnobs';

export const DistortionRack: FC = () => {
  const {
    state: { distortion },
  } = useContext(SettingsContext);

  const activePush = distortion.clipping.isActive
    ? distortion.clipping.type
    : distortion.bitcrusher.isActive
      ? distortion.bitcrusher.type
      : distortion.clipping.type;

  return (
    <Rack
      type={FXs.DISTORTION}
      isActive={distortion.isActive}
    >
      <div className="push-buttons">
        <FxPushButton
          label={DistortionType.SOFT}
          parent={FXs.DISTORTION}
          isRackActive={distortion.isActive}
          activePush={activePush}
        />
        <FxPushButton
          label={DistortionType.HARD}
          parent={FXs.DISTORTION}
          isRackActive={distortion.isActive}
          activePush={activePush}
        />
        <FxPushButton
          label={DistortionType.BITCRUSHER}
          parent={FXs.DISTORTION}
          isRackActive={distortion.isActive}
          activePush={activePush}
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
