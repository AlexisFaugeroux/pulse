import { FC } from 'react';
import { FXs } from '../../utils/constants';
import Rack from './Rack/Rack';
import './FXRack.scss';

const FXRack: FC = () => {
  return (
    <div className="fxrack">
      <div className="rack header">
        <span>FX</span>
        <div className="line" />
      </div>
      {FXs.map((fx) => (
        <Rack type={fx} />
      ))}
    </div>
  );
};

export default FXRack;
