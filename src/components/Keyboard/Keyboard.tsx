import { FC, useCallback, useEffect, useState } from 'react';
import { ALLOWED_KEYS, NOTES, NOTE_TO_KEYS } from '../../utils/constants';
import './Keyboard.scss';

interface KeyboardProps {
  offset?: number;
}

const Keyboard: FC<KeyboardProps> = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.repeat) return;
      if (!pressedKeys.includes(e.key) && ALLOWED_KEYS.includes(e.key)) {
        setPressedKeys([...pressedKeys, e.key]);
      }
    },
    [pressedKeys, setPressedKeys],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const index = pressedKeys.indexOf(e.key);
      if (index > -1) {
        setPressedKeys(pressedKeys.filter((_, i) => i !== index));
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

  useEffect(() => {
    console.log(pressedKeys);
  }, [pressedKeys]);

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
              <div
                id={
                  NOTE_TO_KEYS[note as keyof typeof NOTE_TO_KEYS][
                    offset % 2 === 0 ? 0 : 1
                  ]
                }
                className={`key 
                ${note.length === 3 ? 'flat' : ''}
                ${
                  pressedKeys.includes(
                    NOTE_TO_KEYS[note as keyof typeof NOTE_TO_KEYS][
                      offset % 2 === 0 ? 0 : 1
                    ],
                  )
                    ? 'pressed'
                    : ''
                }
                `}
                onMouseDown={(e) => {
                  console.log(e.currentTarget.id);
                  if (
                    !pressedKeys.includes(e.currentTarget.id) &&
                    ALLOWED_KEYS.includes(e.currentTarget.id)
                  ) {
                    setPressedKeys([...pressedKeys, e.currentTarget.id]);
                  }

                  // TODO: dispatch
                }}
                onMouseUp={(e) => {
                  console.log(e);
                  const index = pressedKeys.indexOf(e.currentTarget.id);
                  if (index > -1) {
                    setPressedKeys(pressedKeys.filter((_, i) => i !== index));
                  }
                }}
                onMouseOut={(e) => {
                  console.log(e);
                  const index = pressedKeys.indexOf(e.currentTarget.id);
                  if (index > -1) {
                    setPressedKeys(pressedKeys.filter((_, i) => i !== index));
                  }
                  // TODO: dispatch
                }}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Keyboard;
