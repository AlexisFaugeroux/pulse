import React, { FC } from 'react';
import './index.scss';
import Knob from '../utils/Knob';

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
        <Knob label="master" type="master" />
      </div>
    </div>
  );
};

export default Header;
