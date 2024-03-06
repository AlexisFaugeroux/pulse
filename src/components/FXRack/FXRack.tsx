import { FC } from 'react';
import './FXRack.scss';
import ChorusRack from './Racks/ChorusRack';
import CompressorRack from './Racks/CompressorRack';
import DelayRack from './Racks/DelayRack';
import FlangerRack from './Racks/FlangerRack';
import ReverbRack from './Racks/ReverbRack';
import DistortionRack from './Racks/distortion/DistortionRack';

const FXRack: FC = () => {
  return (
    <div className="fxrack">
      <div className="rack header">
        <span>FX</span>
        <div className="line" />
      </div>
      <DistortionRack />
      <FlangerRack />
      <ChorusRack />
      <DelayRack />
      <ReverbRack />
      <CompressorRack />
    </div>
  );
};

export default FXRack;
