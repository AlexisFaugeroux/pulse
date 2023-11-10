import { EnvelopeSettings } from "../../types/types"

export default class Oscillator {
    constructor(
        public audioContext: AudioContext,
        public destination: AudioDestinationNode,
        public type: OscillatorType,
        public frequency: number,
        public detune: number,
        public adsr: EnvelopeSettings
    ) {
        this.audioContext = audioContext
        this.oscillator = this.audioContext.createOscillator()
        this.oscillator.type = type
        this.oscillator.frequency.value = frequency
        this.oscillator.detune.setValueAtTime(detune, this.audioContext.currentTime)
        
        this.envelope = adsr ? adsr :
            {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.6,
            release: 0.1
            }
        this.easing = 0.006

        this.gateGain = this.audioContext.createGain()
        this.gateGain.gain.value = 0

        this.oscillator.connect(this.gateGain)
        this.gateGain.connect(destination)
        this.oscillator.start()
    }
    oscillator
    envelope
    easing
    gateGain

    start() {
        let { currentTime } = this.audioContext

        this.gateGain.gain.cancelScheduledValues(currentTime);
        this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
        this.gateGain.gain.linearRampToValueAtTime(1, currentTime + this.envelope.attack + this.easing);
        this.gateGain.gain.linearRampToValueAtTime(this.envelope.sustain, currentTime + this.envelope.attack + this.envelope.decay + this.easing);
    }
    
    stop () {
        let { currentTime } = this.audioContext
        
        this.gateGain.gain.cancelScheduledValues(currentTime);
        this.gateGain.gain.setTargetAtTime(0, currentTime, this.envelope.release + this.easing)
        
        setTimeout(() => {
            this.oscillator.disconnect()
        }, 1000)
    }
}