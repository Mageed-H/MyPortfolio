/** Shared adaptive glass surfaces.
 * Uses crisp dark background on mobile to ensure locked 60fps scrolling,
 * and adds backdrop-blur on desktop (md+) where GPUs can easily handle it.
 */
export const glassPanel =
  'border border-white/10 bg-[#070b12]/90 md:bg-black/60 md:backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.12)]'

export const glassCard =
  'border border-white/10 bg-[#080e18]/85 md:bg-black/50 md:backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[border-color,box-shadow,background-color,transform] duration-300 hover:border-cyan-300/45 hover:bg-black/80 hover:shadow-[0_0_48px_rgba(6,182,212,0.22)]'

export const glassChip =
  'border border-white/10 bg-white/5 md:backdrop-blur-md'
