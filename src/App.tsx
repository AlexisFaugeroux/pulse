import './App.scss';
import Enveloppe from './components/Envelope/Enveloppe';
import FXRack from './components/FXRack/FXRack';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import LFO from './components/LFO/LFO';
import NoiseOsc from './components/NoiseOsc/NoiseOsc';
import Oscillator from './components/Oscillator/Oscillator';
import SubOsc from './components/SubOsc/SubOsc';
import { Provider } from './context/context';

function App() {
  return (
    <Provider>
      <div className="background">
        <Header />
        <div className="main">
          <div className="core">
            <div className="left">
              <Oscillator label="oscillator a" />
              <Oscillator label="oscillator b" />
              <div className="subnoise">
                <SubOsc />
                <NoiseOsc />
              </div>
            </div>

            <div className="center ">
              <div className="envelopefilter">
                <Enveloppe />
                <Filter />
              </div>
              <LFO />
            </div>

            <div className="right">
              <FXRack />
            </div>
          </div>

          <Keyboard />
        </div>
      </div>
    </Provider>
  );
}

export default App;
