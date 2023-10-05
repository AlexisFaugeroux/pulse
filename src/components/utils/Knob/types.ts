export type KnobProps = {
  type: string;
  label: string;
};

export enum ControlTypes {
  MASTER = 'master',
  DEFAULT = 'default',
  DISTORTION = 'distortion',
  FLANGER = 'flanger',
  DELAY = 'delay',
  REVERB = 'reverb',
  CHORUS = 'chorus',
  COMPRESSOR = 'compress',
}
