import { useEffect, useState } from 'react'

/**
 * Sci-Fi Military HUD Decals & Telemetry Overlay.
 * Adds ambient holographic instrument readouts to screen perimeters (desktop only).
 * Fully non-interactive (pointer-events-none), zero performance impact.
 */
export default function HudOverlay() {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      setTimeStr(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`)
    }
    updateTime()
    const id = setInterval(updateTime, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden font-mono text-[9px] uppercase tracking-[0.2em]"
    >
      {/* ─── Top Left Telemetry (below Navbar) ─── */}
      <div className="absolute top-18 left-8 hidden items-center gap-3 text-cyan-400/30 xl:flex">
        <span className="inline-block h-1 w-1 bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
        <span>SYS.LOC: BAGHDAD // 33.3152°N, 44.3661°E</span>
        <span className="text-slate-600">/</span>
        <span className="flex items-center gap-1.5 text-emerald-400/40">
          <span className="inline-block h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          STATUS: OPERATIONAL
        </span>
      </div>

      {/* ─── Top Right Telemetry ─── */}
      <div className="absolute top-18 right-8 hidden items-center gap-3 text-cyan-400/25 xl:flex">
        <span>ENCRYPT: AES-256</span>
        <span className="text-slate-600">/</span>
        <span>PROTOCOL: SECURE_V2.4</span>
      </div>

      {/* ─── Bottom Left Diagnostics (above footer) ─── */}
      <div className="absolute bottom-6 left-8 hidden flex-col gap-1 text-slate-500/35 xl:flex">
        <div className="flex items-center gap-2 text-cyan-400/30 font-semibold">
          <span className="text-cyan-500/50">┌</span>
          <span>TERMINAL TELEMETRY</span>
        </div>
        <div className="pl-2.5 space-y-0.5 text-[8px] tracking-[0.16em]">
          <p>FEED // STABLE [60 FPS]</p>
          <p>NET // 0.0.0.0 HOST ACTIVE</p>
        </div>
      </div>

      {/* ─── Bottom Right Live HUD Clock ─── */}
      <div className="absolute bottom-6 right-8 hidden flex-col items-end gap-1 text-slate-500/35 xl:flex">
        <div className="flex items-center gap-2 text-cyan-400/30 font-semibold">
          <span>SYS.TIME // {timeStr || '00:00:00 UTC'}</span>
          <span className="text-cyan-500/50">┐</span>
        </div>
        <div className="pr-2.5 text-[8px] tracking-[0.16em] text-cyan-400/25">
          <p>LATENCY: 12ms // BUFFER: OK</p>
        </div>
      </div>

      {/* ─── Four Corner Sci-Fi Crosshairs ─── */}
      <span className="absolute top-3 left-3 text-cyan-500/20 text-xs font-bold leading-none">+</span>
      <span className="absolute top-3 right-3 text-cyan-500/20 text-xs font-bold leading-none">+</span>
      <span className="absolute bottom-3 left-3 text-cyan-500/20 text-xs font-bold leading-none">+</span>
      <span className="absolute bottom-3 right-3 text-cyan-500/20 text-xs font-bold leading-none">+</span>
    </div>
  )
}
