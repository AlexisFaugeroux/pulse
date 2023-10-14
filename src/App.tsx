import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import './App.scss';

function App() {
  return (
    <div className="background">
      <Header />
      <div className="main">
        <div className="core">
          <div className="left">
            <div className="oscillator A">
              <div className="osc-background">
                <h2>Oscillator A</h2>
                <div className="selector"></div>
                <div className="knobs"></div>
              </div>
            </div>
            <div className="oscillator B">
              <div className="osc-background">
                <h2>Oscillator B</h2>
                <div className="selector"></div>
                <div className="knobs"></div>
              </div>
            </div>
            <div className="subnoise">
              <div className="sub">
                <div className="osc-background"></div>
              </div>
              <div className="noise">
                <div className="osc-background"></div>
              </div>
            </div>
          </div>

          <div className="center ">
            <div className="envelopefilter">
              <div className="envelope"></div>
              <div className="filter"></div>
            </div>
            <div className="lfo"></div>
          </div>

          <div className="right">
            <div className="fx header"></div>
            <div className="fx distortion"></div>
            <div className="fx flanger"></div>
            <div className="fx delay"></div>
            <div className="fx reverb"></div>
            <div className="fx chorus"></div>
            <div className="fx compressor"></div>
          </div>
        </div>

        <Keyboard />
      </div>
    </div>
  );
}

export default App;
