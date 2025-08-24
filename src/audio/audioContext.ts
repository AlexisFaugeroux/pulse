let ctx: AudioContext | null = null;

export function getAudioContext() {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
}
