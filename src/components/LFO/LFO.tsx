import { FC } from 'react';
import { ControlTypes, Waves } from '../../utils/constants';
import BlocTitle from '../utils/BlocTitle/BlocTitle';
import WaveSelector from '../utils/WaveSelector/WaveSelector';
import './LFO.scss';
import Knob from '../utils/Knob/Knob';

const LFO: FC = () => {
    const waves = [Waves.SINE, Waves.TRIANGLE, Waves.SAWTOOTH, Waves.SQUARE]
    const knobs = ['rate', 'mix']

    return (
        <div className="lfo">
            <div className="lfo-background">
                <BlocTitle label='lfo'/>
                <WaveSelector waves={waves}/>
                <div className="controls">
                    {knobs.map((label) => <Knob initialValue={50} label={label} type={ControlTypes.DEFAULT}/>)}
                </div>
            </div>
        </div>
    )
};

export default LFO;