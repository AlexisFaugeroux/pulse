import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context';
import { OscillatorA_ActionTypes } from '../../context/type';
import { ALLOWED_KEYS, NOTES, NOTE_TO_KEYS } from '../../utils/constants';
import './Keyboard.scss';
import {
  getFrequencyFromNote,
  getKeyGroupOnKeyboard,
  getNoteFromKeyPressed,
  isNoteInKeyboardOctaveRange,
} from './helpers';

const Keyboard: FC = () => {
  const { dispatch } = useContext(Context);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.repeat) return;

      if (!pressedKeys.includes(e.key) && ALLOWED_KEYS.includes(e.key)) {
        setPressedKeys([...pressedKeys, e.key]);

        const keyGroup = getKeyGroupOnKeyboard(e.key);
        const note = getNoteFromKeyPressed(keyGroup, e.key, offset);
        const frequency = getFrequencyFromNote(note);
        dispatch({
          type: OscillatorA_ActionTypes.Create,
          payload: {
            note,
            frequency,
          },
        });
      }
    },
    [pressedKeys, setPressedKeys, offset, dispatch],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const index = pressedKeys.indexOf(e.key);
      if (index > -1) {
        setPressedKeys(pressedKeys.filter((_, i) => i !== index));

        const keyGroup = getKeyGroupOnKeyboard(e.key);
        const note = getNoteFromKeyPressed(keyGroup, e.key, offset);
        const frequency = getFrequencyFromNote(note);
        dispatch({
          type: OscillatorA_ActionTypes.Kill,
          payload: {
            note,
            frequency,
          },
        });
      }
    },
    [pressedKeys, setPressedKeys, offset, dispatch],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="keyboard-layout">
      <div className="octave-selector">
        <div className="label">OCTAVE</div>
        <div className="arrows">
          <input
            type="number"
            value={offset}
            min={-2}
            max={7}
            onChange={(e) => {
              setOffset(parseInt(e.currentTarget.value, 10));
            }}
          />
        </div>
      </div>
      <div className="keys">
        {NOTES.map(
          ({ note, frequency }, index) =>
            isNoteInKeyboardOctaveRange(index, offset) && (
              <div
                id={NOTE_TO_KEYS[note][offset % 2 === 0 ? 0 : 1]}
                className={`key 
                ${note.length === 3 ? 'flat' : ''}
                ${
                  pressedKeys.includes(
                    NOTE_TO_KEYS[note][offset % 2 === 0 ? 0 : 1],
                  )
                    ? 'pressed'
                    : ''
                }
                `}
                onMouseDown={(e) => {
                  if (
                    !pressedKeys.includes(e.currentTarget.id) &&
                    ALLOWED_KEYS.includes(e.currentTarget.id)
                  ) {
                    setPressedKeys([...pressedKeys, e.currentTarget.id]);
                    dispatch({
                      type: OscillatorA_ActionTypes.Create,
                      payload: {
                        note,
                        frequency,
                      },
                    });
                  }
                }}
                onMouseUp={(e) => {
                  const index = pressedKeys.indexOf(e.currentTarget.id);

                  if (index > -1) {
                    setPressedKeys(pressedKeys.filter((_, i) => i !== index));
                    dispatch({
                      type: OscillatorA_ActionTypes.Kill,
                      payload: {
                        note,
                        frequency,
                      },
                    });
                  }
                }}
                onMouseOut={(e) => {
                  const index = pressedKeys.indexOf(e.currentTarget.id);

                  if (index > -1) {
                    setPressedKeys(pressedKeys.filter((_, i) => i !== index));
                    dispatch({
                      type: OscillatorA_ActionTypes.Kill,
                      payload: {
                        note,
                        frequency,
                      },
                    });
                  }
                }}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Keyboard;
