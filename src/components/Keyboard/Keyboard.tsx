import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/Context';
import { Oscillator_TriggerActionsTypes } from '../../contexts/types/index';
import { ALLOWED_KEYS, NOTES, NOTE_TO_KEYS } from '../../utils/constants';
import './Keyboard.scss';
import {
  getKeyGroupOnKeyboard,
  getNoteFromKeyPressed,
  getNoteInfo,
  isNoteInKeyboardOctaveRange,
} from './helpers';

const Keyboard: FC = () => {
  const { dispatch } = useContext(SettingsContext);
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
        const noteInfo = getNoteInfo(note);
        dispatch({
          type: Oscillator_TriggerActionsTypes.Create,
          payload: {
            note: noteInfo.note,
            frequency: noteInfo.frequency,
          },
        });
        dispatch({
          type: Oscillator_TriggerActionsTypes.CreateNoise,
          payload: {
            note: noteInfo.note,
            frequency: noteInfo.frequency,
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
        const payload = getNoteInfo(note) ?? {};
        dispatch({
          type: Oscillator_TriggerActionsTypes.Kill,
          payload,
        });
        dispatch({
          type: Oscillator_TriggerActionsTypes.KillNoise,
          payload,
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
            max={5}
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
                key={index + Date.now()}
                onMouseDown={(e) => {
                  if (
                    !pressedKeys.includes(e.currentTarget.id) &&
                    ALLOWED_KEYS.includes(e.currentTarget.id)
                  ) {
                    setPressedKeys([...pressedKeys, e.currentTarget.id]);
                    dispatch({
                      type: Oscillator_TriggerActionsTypes.Create,
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
                      type: Oscillator_TriggerActionsTypes.Kill,
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
                      type: Oscillator_TriggerActionsTypes.Kill,
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
