import { KEY_TO_NOTES, NOTES } from '../../utils/constants';

export const getKeyGroupOnKeyboard = (
  keyPressed: string,
): 'GROUP1' | 'GROUP2' => {
  return Object.keys(KEY_TO_NOTES.GROUP1).includes(keyPressed)
    ? 'GROUP1'
    : 'GROUP2';
};

export const getNoteFromKeyPressed = (
  keyGroup: 'GROUP1' | 'GROUP2',
  keyPressed: string,
  offset: number,
): string => {
  let note = '';

  if (keyGroup === 'GROUP1') {
    note =
      KEY_TO_NOTES[keyGroup][keyPressed].find((note) =>
        note.includes(`${2 + offset}`),
      ) ?? '';
  } else {
    note =
      KEY_TO_NOTES[keyGroup][keyPressed].find((note) =>
        note.includes(`${3 + offset}`),
      ) ?? '';
  }
  return note;
};

export const getFrequencyFromNote = (note: string) => {
  return NOTES.find((element) => element.note === note)?.frequency ?? 0;
};

export const isNoteInKeyboardOctaveRange = (index: number, offset: number) => {
  return index >= 24 + offset * 12 && index < 48 + offset * 12;
};
