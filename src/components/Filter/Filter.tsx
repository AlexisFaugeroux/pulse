import { FC, useContext, useEffect, useState } from 'react';
import { ControlTypes } from '../../utils/constants';
import { FILTER_VALUES } from '../../utils/constants';
import InactivePanel from '../utils/InactivePanel/InactivePanel';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import './Filter.scss';
import { initialSettings } from '../../nodesConfig';
import { Context } from '../../context/context';
import { Filter_ActionTypes } from '../../context/types';

const Filter: FC = () => {
  const { dispatch } = useContext(Context);

  const [isActive, setIsActive] = useState(false);
  const { filter } = initialSettings;

  const knobs = [
    {
      label: 'cutoff',
      initialValue: filter.frequency,
    },
    {
      label: 'Q',
      initialValue: filter.Q,
    },
    {
      label: 'mix',
      initialValue: filter.gain,
    },
  ];

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
          {knobs.map(({ initialValue, label }) => (
            <Knob
              key={`${label}`}
              parent="filter"
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
