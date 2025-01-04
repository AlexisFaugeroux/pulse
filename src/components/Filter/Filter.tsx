import { type FC, useContext, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { ControlTypes, FILTER_TYPES } from '../../utils/constants';
import { BlocTitle } from '../utils/BlocTitle/BlocTitle';
import { InactivePanel } from '../utils/InactivePanel/InactivePanel';
import { Knob } from '../utils/Knob/Knob';
import { WordSelector } from '../utils/WordSelector/WordSelector';
import './Filter.scss';

export const Filter: FC = () => {
  const {
    state: { filter: filterSettings },
  } = useContext(SettingsContext);
  const [currentType, setCurrentType] = useState(FILTER_TYPES[0]);

  return (
    <div className="filter">
      <InactivePanel isActive={filterSettings.isActive} />
      <div className="filter-background">
        <BlocTitle
          label="filter"
          isActive={filterSettings.isActive}
          parent="filter"
        />
        <WordSelector
          parent="filter"
          values={FILTER_TYPES}
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
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
