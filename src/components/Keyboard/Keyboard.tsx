import { FC, useCallback, useEffect, useState } from 'react';
import Key from './Key/Key';
import { ALLOWED_KEYS, NOTES, NOTE_TO_KEYS } from '../../utils/constants';
import './Keyboard.scss';
import useCallbackState from '../../utils/hooks/useCallbackState';

interface KeyboardProps {
  offset?: number;
}

const Keyboard: FC<KeyboardProps> = () => {
  const [pressedKeys, setPressedKeys] = useCallbackState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.repeat) return;
      if (!pressedKeys.includes(e.key) && ALLOWED_KEYS.includes(e.key)) {
        setPressedKeys(
          (prevState) => [...prevState, e.key],
          // TODO: dispatch
          () => console.log('Down :', pressedKeys),
        );
      }
    },
    [pressedKeys, setPressedKeys],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const index = pressedKeys.indexOf(e.key);
      if (index > -1) {
        setPressedKeys(
          (prevState) => prevState.filter((_, i) => i !== index),
          // TODO: dispatch
          () => console.log('Up :', pressedKeys),
        );
      }
    },
    [pressedKeys, setPressedKeys],
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
          ({ note, freq }, index) =>
            index >= 24 + offset * 12 &&
            index < 48 + offset * 12 && (
              <Key
                key={index + Date.now()}
                note={note}
                freq={freq}
                position={index}
                isPressed={pressedKeys.includes(
                  NOTE_TO_KEYS[note as keyof typeof NOTE_TO_KEYS][
                    offset % 2 === 0 ? 0 : 1
                  ],
                )}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Keyboard;
