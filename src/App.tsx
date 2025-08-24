import { useState } from 'react';
import { Analyser } from './components/Analyser/Analyser';
import { Envelope } from './components/Envelope/Envelope';
import { FXRack } from './components/FXRack/FXRack';
import { Filter } from './components/Filter/Filter';
import { Header } from './components/Header/Header';
import { Keyboard } from './components/Keyboard/Keyboard';
import { LFO } from './components/LFO/LFO';
import { NoiseOsc } from './components/NoiseOsc/NoiseOsc';
import { Oscillator } from './components/Oscillator/Oscillator';
import { SubOsc } from './components/SubOsc/SubOsc';
import { Provider } from './contexts/Context';
import { startAudio } from './audio/startAudio';
import './App.scss';

function App() {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handleOnClick = async () => {
    await startAudio();
    setIsAudioOn(true);
  }

  return (
    <div className="background">
      {isAudioOn ? (
        <Provider>
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

              <div className="center">
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
        </Provider>
      ) : (
        <div className="enable-audio-container">
          <span>Click the button below to enable audio in the browser</span>
          <button onClick={handleOnClick} />
        </div>
      )}
    </div>
  );
}

export default App;
