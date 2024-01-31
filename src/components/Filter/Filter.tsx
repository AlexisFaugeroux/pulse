import { FC, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Filter_ActionTypes } from '../../contexts/types';
import { initialSettings } from '../../nodesConfig';
import { ControlTypes, FILTER_VALUES } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import Knob from '../utils/Knob/Knob';
import WordSelector from '../utils/WordSelector/WordSelector';
import './Filter.scss';

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
    } else {
      dispatch({
        type: Filter_ActionTypes.Deactivate,
        payload: {},
      });
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
            label="gain"
            type={ControlTypes.DEFAULT}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
