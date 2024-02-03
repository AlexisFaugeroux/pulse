import { FC } from 'react';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes } from '../../utils/constants';
import Knob from '../utils/Knob/Knob';
import './Header.scss';

const Header: FC = () => {
  return (
    <div className="header-layout">
      <h1>PULSE</h1>

      <div className="preset-selector">
        <button className="arrow-left-button">
          <i className="arrow-left"></i>
        </button>
        <div className="preset-sreen"> Default </div>
        <button className="arrow-right-button">
          <i className="arrow-right"></i>
        </button>
      </div>

      <div className="master-control">
        <span className="master-control-label">MASTER</span>
        <Knob
          initialValue={initialSettings.master.gain}
          label="master"
          type={ControlTypes.MASTER}
          parent="master"
        />
      </div>
    </div>
  );
};

export default Header;
