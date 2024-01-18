import { FC, useContext, useEffect, useState } from 'react';
import './WordSelector.scss';
import { Filter_ActionTypes } from '../../../contexts/types';
import { SettingsContext } from '../../../contexts/Context';

interface WordSelectorProps {
  parent: string;
  values: string[];
}

const WordSelector: FC<WordSelectorProps> = ({ parent, values }) => {
  const { dispatch } = useContext(SettingsContext);
  const [currentWord, setCurrentWord] = useState(values[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lastIndex = values.length - 1;

  const handleLeftClick = () => {
    setCurrentIndex(currentIndex === 0 ? lastIndex : currentIndex - 1);
  };

  const handleRightClick = () => {
    setCurrentIndex(currentIndex === lastIndex ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    setCurrentWord(values[currentIndex]);
  }, [currentIndex, currentWord, values]);

  useEffect(() => {
    if (parent === 'filter') {
      dispatch({
        type: Filter_ActionTypes.UpdateType,
        payload: { id: currentWord.toLowerCase() },
      });
    }
  }, [currentWord]);

  return (
    <div className="word-selector">
      <div className="word-selector-image">
        <button className="arrow-left-button" onClick={handleLeftClick}>
          <i className="arrow-left"></i>
        </button>
        <div className="word-selector-sreen">{currentWord}</div>
        <button className="arrow-right-button" onClick={handleRightClick}>
          <i className="arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default WordSelector;
