import { FC } from 'react';
import './FXRack.scss';
import DelayRack from './Racks/DelayRack';

const FXRack: FC = () => {
  return (
    <div className="fxrack">
      <div className="rack header">
        <span>FX</span>
        <div className="line" />
      </div>
      <DelayRack />
    </div>
  );
};

export default FXRack;
