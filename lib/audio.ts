/**
 * Pyrium's sound, on the Web Audio API. Two layers:
 *
 * - Music: a slow, warm ambient bed synthesized live — four extended chords in D major
 *   (Dmaj9 → Bm9 → Gmaj7♯11 → A6/9), each voice a sine with two softly detuned triangles
 *   through a low-pass filter, swelling over four seconds and overlapping into the next chord,
 *   with a sparse bell melody from the D major pentatonic. Everything runs through a generated
 *   hall reverb. Synthesized, so there is no file to license or download.
 * - Interface sounds: short samples from Kenney's "Interface Sounds" (CC0, public/sound/),
 *   decoded once and played through the same hall at a low send — on press only, never on hover.
 *
 * Browsers decide when audio may start. The engine tries to start immediately (allowed when the
 * browser trusts the site), and otherwise on the visitor's first press or key.
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

const CHORD_SECONDS = 10;

/**
 * Where the music was, kept for the tab session. A full page load (a new deployment, a dev
 * reload) then picks the progression up at the same chord with a short fade instead of
 * starting over with the long swell.
 */
const RESUME_KEY = "pyrium-music";
const RESUME_WINDOW_MS = 60_000;

function readResume(): number | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(RESUME_KEY) ?? "null") as {
      chord: number;
      at: number;
    } | null;
    return saved && Date.now() - saved.at < RESUME_WINDOW_MS ? saved.chord : null;
  } catch {
    return null;
  }
}

function writeResume(chord: number) {
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify({ chord, at: Date.now() }));
  } catch {
    // Storage blocked: the music simply starts from the top next time.
  }
}

const SAMPLES = {
  press: "/sound/press.m4a",
  toggleOn: "/sound/toggle-on.m4a",
  toggleOff: "/sound/toggle-off.m4a",
  open: "/sound/open.m4a",
  close: "/sound/close.m4a",
} as const;

type SampleName = keyof typeof SAMPLES;

/** Per-sample level, balanced by ear against the music bed. */
const LEVEL: Record<SampleName, number> = {
  press: 0.42,
  toggleOn: 0.45,
  toggleOff: 0.45,
  open: 0.38,
  close: 0.34,
};

class Engine {
  private ctx: AudioContext | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private buffers = new Map<SampleName, AudioBuffer>();
  private musicTimer = 0;
  private melodyTimer = 0;
  private chordIndex = 0;
  private playing = false;
  private volume = 0.5;

  /** Creates the audio graph (once) and asks the browser to run it. */
  start() {
    if (!this.ctx) {
      const Context =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Context) return;
      const ctx = new Context();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -20;
      compressor.ratio.value = 3;
      const master = ctx.createGain();
      master.gain.value = 0.85;
      master.connect(compressor).connect(ctx.destination);

      const reverb = ctx.createConvolver();
      reverb.buffer = this.impulse(ctx, 3.6, 2.8);
      const wet = ctx.createGain();
      wet.gain.value = 0.5;
      reverb.connect(wet).connect(master);

      const musicBus = ctx.createGain();
      musicBus.gain.value = 0;
      musicBus.connect(master);
      musicBus.connect(reverb);

      const sfxBus = ctx.createGain();
      sfxBus.gain.value = 1;
      sfxBus.connect(master);
      const sfxSend = ctx.createGain();
      sfxSend.gain.value = 0.18;
      sfxBus.connect(sfxSend).connect(reverb);

      Object.assign(this, { ctx, musicBus, sfxBus });
      this.load(ctx);
    }
    if (this.ctx?.state === "suspended") this.ctx.resume().catch(() => {});
  }

  /** True once the browser lets the context run. */
  get running() {
    return this.ctx?.state === "running";
  }

  get ready() {
    return this.ctx !== null;
  }

  /** Resolves when the context is running, or false if the browser keeps it suspended. */
  async unlock(): Promise<boolean> {
    this.start();
    if (!this.ctx) return false;
    if (this.ctx.state === "running") return true;
    try {
      await Promise.race([
        this.ctx.resume(),
        new Promise((resolve) => window.setTimeout(resolve, 300)),
      ]);
    } catch {
      return false;
    }
    // Re-read: resume() may have changed the state since the check above.
    return (this.ctx.state as AudioContextState) === "running";
  }

  private async load(ctx: AudioContext) {
    await Promise.all(
      (Object.keys(SAMPLES) as SampleName[]).map(async (name) => {
        try {
          const response = await fetch(SAMPLES[name]);
          const data = await response.arrayBuffer();
          this.buffers.set(name, await ctx.decodeAudioData(data));
        } catch {
          // A missing sample just stays silent.
        }
      }),
    );
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
    return 0.14 * this.volume;
  }

  playMusic() {
    this.start();
    const { ctx, musicBus } = this;
    if (!ctx || !musicBus || this.playing) return;
    this.playing = true;
    const resume = readResume();
    if (resume !== null) this.chordIndex = resume;
    const fade = resume !== null ? 1.2 : 5;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(this.musicLevel(), ctx.currentTime + fade);
    this.chord();
    this.musicTimer = window.setInterval(() => this.chord(), CHORD_SECONDS * 1000);
    this.melodyTimer = window.setTimeout(() => this.melody(), resume !== null ? 1500 : 4000);
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
    return this.playing && this.running;
  }

  private chord() {
    const { ctx, musicBus } = this;
    if (!ctx || !musicBus) return;
    const notes = CHORDS[this.chordIndex % CHORDS.length];
    this.chordIndex += 1;
    writeResume(this.chordIndex);
    const now = ctx.currentTime;
    const length = CHORD_SECONDS + 4; // overlap into the next chord
    for (const note of notes) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1100, now + length * 0.5);
      filter.frequency.linearRampToValueAtTime(700, now + length);
      filter.Q.value = 0.3;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.1, now + 4);
      env.gain.setValueAtTime(0.1, now + length - 5);
      env.gain.linearRampToValueAtTime(0, now + length);
      const pan = ctx.createStereoPanner();
      pan.pan.value = (Math.random() - 0.5) * 0.7;
      filter.connect(env).connect(pan).connect(musicBus);
      for (const [type, detune, level] of [
        ["sine", 0, 1],
        ["triangle", 5, 0.3],
        ["triangle", -6, 0.3],
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

  /** A soft bell-like note every few seconds. */
  private melody() {
    if (!this.playing) return;
    const { ctx, musicBus } = this;
    if (ctx && musicBus) {
      const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
      this.bell(hz(note), 0.035, 3.6, musicBus);
    }
    this.melodyTimer = window.setTimeout(() => this.melody(), 3200 + Math.random() * 4800);
  }

  private bell(freq: number, level: number, decay: number, bus: AudioNode) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(level, now + 0.03);
    env.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    env.connect(bus);
    for (const [ratio, gain] of [
      [1, 1],
      [2.01, 0.2],
      [3.98, 0.06],
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

  private play(name: SampleName, rate = 1) {
    const { ctx, sfxBus } = this;
    const buffer = this.buffers.get(name);
    if (!ctx || !sfxBus || !buffer || ctx.state !== "running") return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    // A hair of pitch variation keeps repeated clicks from sounding mechanical.
    source.playbackRate.value = rate * (0.97 + Math.random() * 0.06);
    const gain = ctx.createGain();
    gain.gain.value = LEVEL[name];
    source.connect(gain).connect(sfxBus);
    source.start();
  }

  press() {
    this.play("press");
  }

  toggle(on: boolean) {
    this.play(on ? "toggleOn" : "toggleOff");
  }

  open() {
    this.play("open");
  }

  close() {
    this.play("close");
  }
}

let engine: Engine | null = null;

/** The single shared engine (browser only). */
export function audio(): Engine {
  engine ??= new Engine();
  return engine;
}
