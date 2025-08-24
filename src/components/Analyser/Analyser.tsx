import { FC, useCallback, useEffect, useRef, useState } from 'react';
import inactiveIcon from '../../assets/main-light-switch-off.png';
import activeIcon from '../../assets/main-light-switch-on.png';
import AnalyserClass from '../../utils/classes/Analyser';
import './Analyser.scss';
import { getAudioNode } from '../../audio/audioGraph';

export const Analyser: FC = () => {
  const [analyserMode, setAnalyserMode] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const render = useCallback(
    (analyser: AnalyserClass) => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Analyser canvas is null');

      const canvasCtx = canvas.getContext('2d');

      if (!canvasCtx) throw new Error('Analyser canvas context is null');

      const animate = () => {
        const backgroundRadialGradient = canvasCtx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          10,
          canvas.width / 2,
          canvas.height / 2,
          200,
        );
        backgroundRadialGradient.addColorStop(0, 'rgb(26,26,26)');
        backgroundRadialGradient.addColorStop(1, '#000000');

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = backgroundRadialGradient;
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);

        if (analyserMode === 0) return;

        if (analyserMode === -1) {
          analyser.drawFrequencyVisualiser(canvas, canvasCtx);
        }
        if (analyserMode === 1) {
          analyser.drawWaveformVisualiser(canvas, canvasCtx);
        }
      };

      animate();
    },
    [analyserMode],
  );

  useEffect(() => {
    const analyser = getAudioNode('analyser');
    analyser && render(analyser);
  }, [analyserMode, render]);

  return (
    <div className="analyser">
      <div className="analyser-background">
        <div className="analyser-selector">
          <div className="selector-option">
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  analyserMode === -1 ? activeIcon : inactiveIcon
                })`,
              }}
            />
            <span className="selector-option-label">FREQUENCIES</span>
          </div>
          <input
            type="range"
            min={-1}
            max={1}
            step={1}
            value={analyserMode}
            list="values"
            onChange={(e) => setAnalyserMode(parseInt(e.target.value, 10))}
          />
          <div className="selector-option">
            <span className="selector-option-label">WAVEFORM</span>
            <button
              className="selector-option-light"
              style={{
                backgroundImage: `url(${
                  analyserMode === 1 ? activeIcon : inactiveIcon
                })`,
              }}
            />
          </div>
        </div>
        <div className="canvas-background">
          <canvas ref={canvasRef} className="analyser-canvas" />
        </div>
      </div>
    </div>
  );
};
