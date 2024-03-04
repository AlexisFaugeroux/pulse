import { FC } from 'react';
import './FXRack.scss';
import DelayRack from './Racks/DelayRack';
import DistortionRack from './Racks/DistortionRack';
import ReverbRack from './Racks/ReverbRack';
import CompressorRack from './Racks/CompressorRack';

const FXRack: FC = () => {
  return (
    <div className="fxrack">
      <div className="rack header">
        <span>FX</span>
        <div className="line" />
      </div>
      <DistortionRack />
      <DelayRack />
      <ReverbRack />
      <CompressorRack />
    </div>
  );
};

export default FXRack;
