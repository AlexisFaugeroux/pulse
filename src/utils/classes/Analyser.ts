import { theme } from '../../styles/_variables';

export default class Analyser {
  node: AnalyserNode;
  bufferLength;
  dataArray;

  constructor(audioContext: AudioContext) {
    this.node = audioContext.createAnalyser();
    this.node.fftSize = 2048;
    this.node.minDecibels = -60;
    this.node.smoothingTimeConstant = 0.9;

    this.bufferLength = this.node.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  connect(destination: AudioNode) {
    this.node.connect(destination);
  }

  drawFrequencyVisualiser(
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
  ) {
    this.node.getByteFrequencyData(this.dataArray);

    let barHeight = 0;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = (this.dataArray[i] * 100) / 255;

      // Display frequencies on a log scale
      x = (Math.log(i) / Math.log(this.bufferLength)) * canvas.width;
      const barWidth =
        (Math.log(i + 1) / Math.log(this.bufferLength)) * canvas.width - x;

      let barColor = `rgb(
        ${((barHeight + 50) * 217) / 255},
        ${((barHeight + 50) * 251) / 255},
        ${((barHeight + 50) * 255) / 255}
        )`;

      if (barHeight > 50) {
        barColor = theme.textColor;
      }
      if (barHeight === 100) {
        barColor = theme.darkPink;
      }

      canvasCtx.fillStyle = barColor;
      canvasCtx.fillRect(
        x,
        canvas.height - barHeight,
        // Adapt bar width according to log scale
        barWidth,
        barHeight,
      );
    }
  }

  drawWaveformVisualiser(
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
  ) {
    this.node.getByteTimeDomainData(this.dataArray);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = theme.textColor;
    canvasCtx.beginPath();

    const sliceWidth = canvas.width / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128;
      const y = v * (canvas.height / 2);

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
}
