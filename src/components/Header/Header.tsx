import { FC, useContext } from 'react';
import { ControlTypes } from '../../utils/constants';
import { Knob } from '../utils/Knob/Knob';
import { PresetSelection } from '../PresetSelection/PresetSelection';
import './Header.scss';
import { SettingsContext } from '../../contexts/Context';

export const Header: FC = () => {
  const { state } = useContext(SettingsContext);

  return (
    <div className="header-layout">
      <h1>PULSE</h1>

      <PresetSelection />

      <div className="master-control">
        <span className="master-control-label">MASTER</span>
        <Knob
          initialValue={state.master.gain}
          label="master"
          type={ControlTypes.MASTER}
          parent="master"
        />
      </div>
    </div>
  );
};
