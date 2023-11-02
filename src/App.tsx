import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import Oscillator from './components/Oscillator/Oscillator';
import Enveloppe from './components/Envelope/Enveloppe';
import Filter from './components/Filter/Filter';
import SubOsc from './components/SubOsc/SubOsc';
import NoiseOsc from './components/NoiseOsc/NoiseOsc';
import FXRack from './components/FXRack/FXRack';
import './App.scss';

function App() {
  return (
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
            <div className="lfo"></div>
          </div>

          <div className="right">
            <FXRack />
          </div>
        </div>

        <Keyboard />
      </div>
    </div>
  );
}

export default App;
