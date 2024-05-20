import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SettingsContext } from '../../../contexts/Context';
import { Filter_ActionTypes } from '../../../contexts/types';
import { Noise_SettingsActionTypes } from '../../../contexts/types/noises';
import { Noise_Types } from '../../../utils/constants';
import './WordSelector.scss';

interface WordSelectorProps {
  parent: string;
  values: string[];
  currentType: string | Noise_Types;
  setCurrentType: Dispatch<SetStateAction<string>>;
}

const WordSelector: FC<WordSelectorProps> = ({
  parent,
  values,
  currentType,
  setCurrentType,
}) => {
  const { dispatch } = useContext(SettingsContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lastIndex = values.length - 1;

  const handleLeftClick = () => {
    setCurrentIndex(currentIndex === 0 ? lastIndex : currentIndex - 1);
  };

  const handleRightClick = () => {
    setCurrentIndex(currentIndex === lastIndex ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    setCurrentType(values[currentIndex]);
  }, [currentIndex, currentType, values, setCurrentType]);

  useEffect(() => {
    if (parent === 'filter') {
      dispatch({
        type: Filter_ActionTypes.UpdateType,
        payload: { id: currentType.toLowerCase() },
      });
    }
    if (parent === 'noiseOsc') {
      dispatch({
        type: Noise_SettingsActionTypes.UpdateType,
        payload: { id: Noise_Types[currentType as keyof typeof Noise_Types] },
      });
    }
  }, [currentType, dispatch, parent]);

  return (
    <div className="word-selector">
      <div className="word-selector-image">
        <button className="arrow-left-button" onClick={handleLeftClick}>
          <i className="arrow-left"></i>
        </button>
        <div className="word-selector-sreen">{currentType}</div>
        <button className="arrow-right-button" onClick={handleRightClick}>
          <i className="arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default WordSelector;
