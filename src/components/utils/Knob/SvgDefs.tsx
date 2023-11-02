import { FC } from 'react';
import { theme } from '../../../styles/_variables';

const SvgDefs: FC = () => {
  return (
    <svg className="defs">
      <defs>
        <radialGradient id="grad-dial-soft-shadow" cx={0.5} cy={0.5} r={0.5}>
          <stop offset="85%" stopColor="#242a2e" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#242a2e" stopOpacity={0} />
        </radialGradient>

        <linearGradient id="grad-dial-base-master" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#52595f" />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-base-default" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#52595f" />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient
          id="grad-dial-base-distortion"
          x1={0}
          y1={0}
          x2={0}
          y2={1}
        >
          <stop offset="85%" stopColor={theme.distortionColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-base-flanger" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="85%" stopColor={theme.flangerColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-base-delay" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="85%" stopColor={theme.delayColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-base-reverb" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="85%" stopColor={theme.reverbColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-base-chorus" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="85%" stopColor={theme.chorusColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient
          id="grad-dial-base-compressor"
          x1={0}
          y1={0}
          x2={0}
          y2={1}
        >
          <stop offset="85%" stopColor={theme.compressorColor} />
          <stop offset="100%" stopColor="#2b3238" />
        </linearGradient>

        <linearGradient id="grad-dial-highlight" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#70777d" stopOpacity={1} />
          <stop offset="40%" stopColor="#70777d" stopOpacity={0} />
          <stop offset="55%" stopColor="#70777d" stopOpacity={0} />
          <stop offset="100%" stopColor="#70777d" stopOpacity={0.5} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={2} />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default SvgDefs;
