import './App.scss';
import Analyser from './components/Analyser/Analyser';
import Envelope from './components/Envelope/Envelope';
import FXRack from './components/FXRack/FXRack';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import LFO from './components/LFO/LFO';
import NoiseOsc from './components/NoiseOsc/NoiseOsc';
import Oscillator from './components/Oscillator/Oscillator';
import SubOsc from './components/SubOsc/SubOsc';
import { Provider } from './contexts/Context';
import AudioNodesConnect from './utils/AudioNodesConnect';

function App() {
  return (
    <AudioNodesConnect>
      <Provider>
        <div className="background">
          <Header />
          <div className="main">
            <div className="core">
              <div className="left">
                <Oscillator id="oscillatorA" label="oscillator a" />
                <Oscillator id="oscillatorB" label="oscillator b" />
                <div className="subnoise">
                  <SubOsc id="subOscillator" label="sub" />
                  <NoiseOsc id="noiseOsc" label="noise" />
                </div>
              </div>

              <div className="center ">
                <div className="envelopefilter">
                  <Envelope />
                  <LFO />
                  <Filter />
                </div>
                <Analyser />
              </div>

              <div className="right">
                <FXRack />
              </div>
            </div>

            <Keyboard />
          </div>
        </div>
      </Provider>
    </AudioNodesConnect>
  );
}

export default App;
