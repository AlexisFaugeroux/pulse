import { FC, useState } from 'react';
import { ControlTypes } from '../../utils/constants';
import { FILTER_VALUES } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import './Filter.scss';

const Filter: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const kobs = [
    {
      label: 'cutoff',
      initialValue: 50,
    },
    {
      label: 'q',
      initialValue: 0,
    },
    {
      label: 'mix',
      initialValue: 100,
    },
  ];

  return (
    <div className="filter">
      <InactivePanel isActive={isActive} />
      <div className="filter-background">
        <BlocTitle
          label="filter"
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <WordSelector values={FILTER_VALUES} />
        <div className="knobs">
          {kobs.map(({ initialValue, label }) => (
            <Knob
              key={`${label}`}
              initialValue={initialValue}
              label={label}
              type={ControlTypes.DEFAULT}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
