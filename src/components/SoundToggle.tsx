import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { soundManager } from '../lib/sound'

export default function SoundToggle() {
  const [muted, setMuted] = useState(() => soundManager.isMuted())

  const handleToggle = () => {
    const next = soundManager.toggleMuted()
    setMuted(next)
  }

  return (
    <button
      type="button"
      data-cursor="interactive"
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover()}
      aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
      className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
    >
      {/* Dynamic Soundwave Equalizer Bars */}
      <div className="flex h-3 items-end gap-0.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={`w-0.5 rounded-full ${
              muted
                ? 'h-1 bg-slate-500/40'
                : 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
            }`}
            animate={
              muted
                ? { height: 3 }
                : {
                    height: [4, 12, 6, 14, 4][i % 5],
                    transition: {
                      duration: 0.6 + i * 0.15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    },
                  }
            }
          />
        ))}
      </div>

      <span className="text-[11px] font-medium tracking-wider uppercase text-muted group-hover:text-cyan-300">
        {muted ? 'Audio Off' : 'Audio On'}
      </span>

      {muted ? (
        <VolumeX className="h-3.5 w-3.5 text-muted transition group-hover:text-cyan-300" />
      ) : (
        <Volume2 className="h-3.5 w-3.5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
      )}
    </button>
  )
}
