/**
 * Cyber Web Audio Engine — Zero external files, pure procedural Web Audio API synthesis.
 * Generates ultra-lightweight, crisp sci-fi interface feedback tones.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

let isMuted = true

export const soundManager = {
  isMuted: () => isMuted,
  setMuted: (muted: boolean) => {
    isMuted = muted
    if (!muted) {
      getAudioContext()
      soundManager.playPowerOn()
    }
  },
  toggleMuted: () => {
    const next = !isMuted
    soundManager.setMuted(next)
    return next
  },

  /** Soft, crisp high-tech click */
  playClick: () => {
    if (isMuted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const now = ctx.currentTime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {
      // Audio context might be restricted
    }
  },

  /** Micro subtle hover tick */
  playHover: () => {
    if (isMuted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const now = ctx.currentTime
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.025)

      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {
      // Audio context might be restricted
    }
  },

  /** Smooth two-tone chime when power on / sound enabled */
  playPowerOn: () => {
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime

      // Tone 1
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(440, now)
      osc1.frequency.exponentialRampToValueAtTime(660, now + 0.12)
      gain1.gain.setValueAtTime(0.05, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.15)

      // Tone 2
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(880, now + 0.08)
      gain2.gain.setValueAtTime(0.06, now + 0.08)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start(now + 0.08)
      osc2.stop(now + 0.28)
    } catch {
      // Audio context might be restricted
    }
  },

  /** Cyber navigation section switch chime */
  playNav: () => {
    if (isMuted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      const now = ctx.currentTime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(540, now)
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.08)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch {
      // Audio context might be restricted
    }
  },
}
