/**
 * Pyrium's sound, synthesized live with the Web Audio API — no audio files, so nothing to
 * license and nothing to download. Two layers:
 *
 * - Music: a slow, warm ambient bed. Four extended chords in D major (Dmaj9 → Bm9 → Gmaj7♯11 →
 *   A6/9), each voice a sine and a softly detuned triangle through a low-pass filter, swelling
 *   over three seconds and overlapping into the next chord. A sparse "glass" melody from the D
 *   major pentatonic drifts over it. Everything runs through a generated hall reverb.
 * - Interface sounds: a soft wooden "tock" on press, a near-silent tick on hover, a rising or
 *   falling pair of notes for toggles, and an airy sweep when a panel opens.
 *
 * Browsers only allow audio after a user gesture, so the context starts on the first press.
 */

type Note = number;

const hz = (midi: Note) => 440 * 2 ** ((midi - 69) / 12);

// Chord voicings as MIDI notes (D3 = 50).
const CHORDS: Note[][] = [
  [50, 57, 61, 64, 66], // Dmaj9: D A C♯ E F♯
  [47, 54, 57, 61, 62], // Bm9:   B F♯ A C♯ D
  [43, 50, 54, 59, 61], // Gmaj7♯11 voicing: G D F♯ B C♯
  [45, 52, 59, 61, 66], // A6/9:  A E B C♯ F♯
];
const PENTATONIC: Note[] = [74, 76, 78, 81, 83, 86]; // D5 E5 F♯5 A5 B5 D6

const CHORD_SECONDS = 9;

class Engine {
  private ctx: AudioContext | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private musicTimer = 0;
  private melodyTimer = 0;
  private chordIndex = 0;
  private playing = false;
  private volume = 0.55;

  /** Creates (or resumes) the audio graph. Call from a user gesture. */
  start() {
    if (!this.ctx) {
      const Context =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Context) return;
      const ctx = new Context();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.ratio.value = 3;
      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(compressor).connect(ctx.destination);

      const reverb = ctx.createConvolver();
      reverb.buffer = this.impulse(ctx, 3.4, 2.6);
      const wet = ctx.createGain();
      wet.gain.value = 0.55;
      reverb.connect(wet).connect(master);

      const musicBus = ctx.createGain();
      musicBus.gain.value = 0;
      musicBus.connect(master);
      musicBus.connect(reverb);

      const sfxBus = ctx.createGain();
      sfxBus.gain.value = 0.9;
      sfxBus.connect(master);
      const sfxSend = ctx.createGain();
      sfxSend.gain.value = 0.25;
      sfxBus.connect(sfxSend).connect(reverb);

      Object.assign(this, { ctx, musicBus, sfxBus });
    }
    if (this.ctx?.state === "suspended") this.ctx.resume().catch(() => {});
  }

  get ready() {
    return this.ctx !== null;
  }

  /** Stereo noise with an exponential tail: a soft, wide hall. */
  private impulse(ctx: AudioContext, seconds: number, decay: number) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
      }
    }
    return buffer;
  }

  // ---- Music --------------------------------------------------------------------------

  setVolume(volume: number) {
    this.volume = volume;
    if (this.ctx && this.musicBus && this.playing) {
      this.musicBus.gain.setTargetAtTime(this.musicLevel(), this.ctx.currentTime, 0.4);
    }
  }

  private musicLevel() {
    return 0.16 * this.volume;
  }

  playMusic() {
    this.start();
    const { ctx, musicBus } = this;
    if (!ctx || !musicBus || this.playing) return;
    this.playing = true;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(this.musicLevel(), ctx.currentTime + 4);
    this.chord();
    this.musicTimer = window.setInterval(() => this.chord(), CHORD_SECONDS * 1000);
    this.melody();
  }

  stopMusic() {
    const { ctx, musicBus } = this;
    if (!ctx || !musicBus || !this.playing) return;
    this.playing = false;
    window.clearInterval(this.musicTimer);
    window.clearTimeout(this.melodyTimer);
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
  }

  get musicPlaying() {
    return this.playing;
  }

  private chord() {
    const { ctx, musicBus } = this;
    if (!ctx || !musicBus) return;
    const notes = CHORDS[this.chordIndex % CHORDS.length];
    this.chordIndex += 1;
    const now = ctx.currentTime;
    const length = CHORD_SECONDS + 4; // overlap into the next chord
    for (const note of notes) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.linearRampToValueAtTime(1300, now + length * 0.5);
      filter.frequency.linearRampToValueAtTime(800, now + length);
      filter.Q.value = 0.4;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.11, now + 3);
      env.gain.setValueAtTime(0.11, now + length - 4.5);
      env.gain.linearRampToValueAtTime(0, now + length);
      const pan = ctx.createStereoPanner();
      pan.pan.value = (Math.random() - 0.5) * 0.7;
      filter.connect(env).connect(pan).connect(musicBus);
      for (const [type, detune, level] of [
        ["sine", 0, 1],
        ["triangle", 5, 0.35],
        ["triangle", -6, 0.35],
      ] as const) {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = hz(note);
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.value = level;
        osc.connect(g).connect(filter);
        osc.start(now);
        osc.stop(now + length + 0.1);
      }
    }
  }

  /** A soft bell-like note every few seconds, never the same twice in a row. */
  private melody() {
    if (!this.playing) return;
    const { ctx, musicBus } = this;
    if (ctx && musicBus) {
      const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
      this.bell(hz(note), 0.05, 3.2, musicBus);
    }
    this.melodyTimer = window.setTimeout(() => this.melody(), 2600 + Math.random() * 4200);
  }

  private bell(freq: number, level: number, decay: number, bus: AudioNode) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(level, now + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    env.connect(bus);
    for (const [ratio, gain] of [
      [1, 1],
      [2.01, 0.25],
      [3.98, 0.08],
    ]) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq * ratio;
      const g = ctx.createGain();
      g.gain.value = gain;
      osc.connect(g).connect(env);
      osc.start(now);
      osc.stop(now + decay + 0.1);
    }
  }

  // ---- Interface sounds ----------------------------------------------------------------

  /** A soft wooden press: a quick pitch drop with a whisper of air on the attack. */
  press() {
    const { ctx, sfxBus } = this;
    if (!ctx || !sfxBus) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.08);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.11, now + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(env).connect(sfxBus);
    osc.start(now);
    osc.stop(now + 0.2);
    this.air(now, 0.018, 0.025, 4200);
  }

  /** Barely-there tick for hovering a control. */
  hover() {
    const { ctx, sfxBus } = this;
    if (!ctx || !sfxBus) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 1760;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.012, now + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(env).connect(sfxBus);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  /** Two notes up for "on", down for "off". */
  toggle(on: boolean) {
    const { sfxBus } = this;
    if (!sfxBus) return;
    const [a, b] = on ? [hz(74), hz(81)] : [hz(81), hz(74)];
    this.bell(a, 0.05, 0.6, sfxBus);
    window.setTimeout(() => this.bell(b, 0.05, 0.9, sfxBus), 90);
  }

  /** An airy sweep for opening a panel. */
  open() {
    const ctx = this.ctx;
    if (!ctx) return;
    this.air(ctx.currentTime, 0.035, 0.28, 900, 5200);
  }

  private air(at: number, level: number, length: number, from: number, to = from) {
    const { ctx, sfxBus } = this;
    if (!ctx || !sfxBus) return;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(from, at);
    filter.frequency.exponentialRampToValueAtTime(to, at + length);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, at);
    env.gain.linearRampToValueAtTime(level, at + length * 0.3);
    env.gain.exponentialRampToValueAtTime(0.0001, at + length);
    source.connect(filter).connect(env).connect(sfxBus);
    source.start(at);
  }
}

let engine: Engine | null = null;

/** The single shared engine (browser only). */
export function audio(): Engine {
  engine ??= new Engine();
  return engine;
}
