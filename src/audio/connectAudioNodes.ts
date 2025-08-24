import type { AudioNodes } from "./types";

export async function connectAudioNodes(nodes: AudioNodes): Promise<void> {
  const {
    masterGain,
    oscAGain,
    oscBGain,
    subGain,
    whiteNoiseGain,
    pinkNoiseGain,
    brownNoiseGain,
    analyser,
    bitcrusher,
    chorus,
    clipping,
    compressor,
    delay,
    destination,
    filter,
    lfo,
    limiter,
    phaser,
    reverb,
  } = nodes;

  oscAGain.connect(filter.dryGain);
  oscBGain.connect(filter.dryGain);
  subGain.connect(filter.dryGain);
  whiteNoiseGain.connect(filter.dryGain);
  pinkNoiseGain.connect(filter.dryGain);
  brownNoiseGain.connect(filter.dryGain);
  oscAGain.connect(filter.node);
  oscBGain.connect(filter.node);
  subGain.connect(filter.node);
  whiteNoiseGain.connect(filter.node);
  pinkNoiseGain.connect(filter.node);
  brownNoiseGain.connect(filter.node);

  lfo.connect(oscAGain.gain);
  lfo.connect(oscBGain.gain);
  lfo.connect(subGain.gain);
  lfo.connect(whiteNoiseGain.gain);
  lfo.connect(pinkNoiseGain.gain);
  lfo.connect(brownNoiseGain.gain);

  filter.connect(clipping.dryGain);
  filter.connect(clipping.node);

  await bitcrusher.init();
  clipping.connect(bitcrusher.dryGain);
  if (bitcrusher.node) {
    clipping.connect(bitcrusher.node);
  } else {
    console.error('Bitcrusher node is null');
  }

  bitcrusher.connect(phaser.dryGain);
  bitcrusher.connect(phaser.node);

  phaser.connect(chorus.dryGain);
  phaser.connect(chorus.node);

  chorus.connect(delay.dryGain);
  chorus.connect(delay.node);

  delay.connect(reverb.dryGain);
  delay.connect(reverb.node);

  reverb.connect(compressor.dryGain);
  reverb.connect(compressor.node);

  compressor.connect(limiter.node);

  limiter.connect(masterGain);

  masterGain.connect(analyser.node);

  analyser.connect(destination);
}
