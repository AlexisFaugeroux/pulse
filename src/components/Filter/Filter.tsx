import { FC } from 'react';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WordSelector from '../utils/WordSelector/WordSelector';
import Knob from '../utils/Knob/Knob';
import { FILTER_VALUES } from '../../utils/constants';
import './Filter.scss';

const Filter: FC = () => {
  return (
    <div className="filter">
      <div className="filter-background">
        <BlocTitle label="filter" />
        <WordSelector values={FILTER_VALUES} />
        <div className="knobs">
          <Knob label="frequency" type="default" />
          <Knob label="q" type="default" />
          <Knob label="mix" type="default" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
