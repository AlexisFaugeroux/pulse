import { FC } from 'react';
import './FXRack.scss';
import { ChorusRack } from './Racks/ChorusRack';
import { CompressorRack } from './Racks/CompressorRack';
import { DelayRack } from './Racks/DelayRack';
import { PhaserRack } from './Racks/PhaserRack';
import { ReverbRack } from './Racks/ReverbRack';
import { DistortionRack } from './Racks/distortion/DistortionRack';

export const FXRack: FC = () => {
  return (
    <div className="fxrack">
      <div className="rack header">
        <span>FX</span>
        <div className="line" />
      </div>
      <DistortionRack />
      <PhaserRack />
      <ChorusRack />
      <DelayRack />
      <ReverbRack />
      <CompressorRack />
    </div>
  );
};
