![Alt text](/public/pulse-app-screenshot.png)

# Pulse - Web Synthetizer 🎹
---

## 🌐 Live Demo
Try it online:  
👉 **[pulse-ecru.vercel.app](https://pulse-ecru.vercel.app)**

---

## About the Project
**Pulse** is an audio synthesizer running directly in the browser, spowered by the **Web Audio API**.  

This is the first personal project I developed outside of a school curriculum. As both an audio enthusiast and music producer in my spare time, my goal was to:  
- Understand the inner workings of the Web Audio API.  
- Explore its creative potential for audio synthesis.  
- Progress in **React** and **TypeScript** through a real-world project.  

This application is an attempt to reproduce the **core functionalities** of professional-grade synths like **Serum** or **Vital**, offering a playground for sound design without leaving the browser.  

---

## Tech Stack
- **React** (UI framework)  
- **TypeScript** (typed JavaScript for scalability)  
- **SCSS** (styling)  
- **Web Audio API** (audio synthesis & effects)  
- **Vite** (bundler & dev server)  
- **Deployment**: Vercel  

---

## Features
- **Interactive Keyboard** — play via on-screen keys or your computer keyboard  
- **Multiple Oscillators** — A, B and Sub with selectable waveforms (sine, square, saw, triangle, etc.)  
- **ADSR Envelope** — shape the amplitude with Attack, Decay, Sustain, Release  
- **Filter Section** — low-pass, high-pass, and more  
- **LFO** — modulate parameters for evolving sounds  
- **Audio Effects**:
  - Distortion  
  - Phaser
  - Chorus
  - Delay  
  - Reverb  
  - Compressor
- **Frequency Analyzer** — real-time visual feedback  

All features are now **implemented and fully functional**.

---

## Architecture & Design Choices
- **Component-based React structure**: each synth module (oscillator, filter, LFO, envelope, etc.) is isolated for clarity and reusability.  
- **Web Audio Graph abstraction**: audio nodes are dynamically created and connected based on the current UI state.  
- **Separation of concerns**: UI logic (React) is clearly decoupled from audio logic (Web Audio API engine).  
- **TypeScript**: enforces type safety and maintainability across the codebase.  
- **SCSS**: modular, clean, and scalable styling.  

This design ensures the synth remains extensible and easy to expand with new features.  

---

## User Guide

Pulse is an interactive browser-based synthesizer.  
Here’s how to start making sounds:

### 1. Playing Notes
- Use your **computer keyboard**:  
  - Keys `A, Z, E, R, T, Y, U, I, O, P` map to white notes (like piano keys).  
  - Keys `W, S, D, F, G, H, J, K, L` map to black notes (sharps/flats).  
- Or click directly on the **on-screen keyboard**.

### 2. Choosing Presets
- Select from the available **presets** in the dropdown at the top.  
- Presets automatically configure oscillators, filters, and effects.

### 3. Oscillators
- Two oscillators (**A** and **B**) are available.  
- You can:
  - Change the **waveform** (sine, square, saw, triangle, etc.).  
  - Adjust the **volume** or blend both oscillators.  
  - Detune for richer sound.

### 4. Envelope (ADSR)
- Shape how the sound evolves over time:  
  - **Attack**: how quickly the sound reaches full volume.  
  - **Decay**: how long it takes to settle after the attack.  
  - **Sustain**: the level held while the note is pressed.  
  - **Release**: how long it fades after releasing the note.

### 5. Filter
- Apply a **low-pass, high-pass, or band-pass filter**.  
- Adjust the **cutoff frequency** and **resonance (Q)** to sculpt the tone.

### 6. LFO (Low Frequency Oscillator)
- Use the LFO to **modulate parameters** such as filter cutoff or pitch.  
- Adjust speed (rate) and depth for subtle movement or dramatic wobble effects.

### 7. Audio Effects
- **Distortion**: adds harmonic richness or grit.  
- **Delay**: creates echo and rhythmic repeats.  
- **Reverb**: simulates space and ambience.  
- **Phaser**: shifts certain frequencies in and out of phase to create a sweeping, swirling effect.  
- **Chorus**: duplicates the signal, detunes it slightly, and blends it back to create a fuller, ensemble-like sound.  
- **Compressor**: balances dynamics by reducing the difference between loud and soft parts, making the sound tighter and more controlled.

### 8. Frequency Analyzer
- Visual feedback is displayed in real time, showing the frequency spectrum of your sound.  
- This helps you see how filters, oscillators, and effects shape the audio.

---

## Future Improvements
- MIDI controller support for external hardware integration
- Custom Presets: create, save, and load your own sounds
- Additional FX modules (chorus, phaser, compression, etc.)
- Preset browser with categories and sound previews
- Mobile & tablet support with touch controls
- Export feature: render and download audio output as WAV/MP3

This design ensures the synth remains extensible and easy to expand with new features.  

---

## Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/AlexisFaugeroux/pulse.git

# Enter the project folder
cd pulse

# Install dependencies
npm install

# Start the development server
npm run dev
