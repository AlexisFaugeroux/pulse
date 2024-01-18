import { FC, useContext, useEffect, useState } from 'react';
import { ControlTypes } from '../../utils/constants';
import { FILTER_VALUES } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import './Filter.scss';
import {
  filter,
  initialSettings,
  masterGain,
  oscAGain,
  oscBGain,
} from '../../nodesConfig';
import { SettingsContext } from '../../contexts/Context';
import { Filter_ActionTypes } from '../../contexts/types';

const Filter: FC = () => {
  const { dispatch } = useContext(SettingsContext);

  const [isActive, setIsActive] = useState(false);
  const { filter: filterSettings } = initialSettings;

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: Filter_ActionTypes.Activate,
        payload: {},
      });
      oscAGain.disconnect();
      oscBGain.disconnect();
      oscBGain.connect(filter);
      oscAGain.connect(filter);
    } else {
      dispatch({
        type: Filter_ActionTypes.Deactivate,
        payload: {},
      });

      oscAGain.disconnect();
      oscBGain.disconnect();
      oscAGain.connect(masterGain);
      oscBGain.connect(masterGain);
    }
  }, [isActive, dispatch]);

  return (
    <div className="filter">
      <InactivePanel isActive={isActive} />
      <div className="filter-background">
        <BlocTitle
          label="filter"
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WordSelector parent="filter" values={FILTER_VALUES} />
        <div className="knobs">
          <Knob
            parent="filter"
            initialValue={filterSettings.frequency}
            label="cutoff"
            type={ControlTypes.DEFAULT}
          />
          <Knob
            parent="filter"
            initialValue={filterSettings.Q}
            label="Q"
            type={ControlTypes.DEFAULT}
          />
          <Knob
            parent="filter"
            initialValue={filterSettings.gain}
            label="mix"
            type={ControlTypes.DEFAULT}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
