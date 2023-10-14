import { FC, useState } from 'react';
import './Key.scss';

interface KeyProps {
  note: string;
  freq: number;
  position: number;
  isPressed: boolean;
}

const Key: FC<KeyProps> = ({ note, isPressed }) => {
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(isPressed);

  return (
    <div
      className={`key 
        ${note.length === 3 ? 'flat' : ''}
        ${isPressed || isKeyPressed ? 'pressed' : ''}
        `}
      onMouseDown={(e) => {
        console.log(e);
        setIsKeyPressed(true);

        // TODO: dispatch
      }}
      onMouseUp={(e) => {
        console.log(e);
        setIsKeyPressed(false);
      }}
      onMouseOver={(e) => {
        console.log(e);
        setIsKeyPressed(true);

        // TODO: dispatch
      }}
      onMouseOut={(e) => {
        console.log(e);
        setIsKeyPressed(false);

        // TODO: dispatch
      }}
    />
  );
};

export default Key;
