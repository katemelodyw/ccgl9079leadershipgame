import { AnimatePresence, motion } from 'framer-motion'
import { HeartHandshake, Zap, AlertTriangle } from 'lucide-react'

const CONFIG = {
  rapport: {
    label: 'Rapport',
    hint: 'Team trust',
    Icon: HeartHandshake,
    from: 'from-pink-500',
    to: 'to-rose-400',
    track: 'bg-rose-100',
  },
  energy: {
    label: 'Energy',
    hint: 'Your stamina',
    Icon: Zap,
    from: 'from-amber-500',
    to: 'to-yellow-400',
    track: 'bg-amber-100',
  },
}

function Meter({ kind, value, delta }) {
  const c = CONFIG[kind]
  const danger = value <= 25
  return (
    <div className={`relative rounded-2xl bg-white/95 p-3 shadow-sm ring-1 ring-black/5 ${danger ? 'animate-danger' : ''}`}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          <c.Icon size={13} className={danger ? 'text-red-500' : 'text-slate-400'} />
          {c.label}
        </span>
        <span className={`text-sm font-extrabold tabular-nums ${danger ? 'text-red-600' : 'text-ink'}`}>
          {value}%
        </span>
      </div>
      <div className={`h-2.5 w-full overflow-hidden rounded-full ${c.track}`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${c.from} ${c.to}`}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-400">{c.hint}</span>
        {danger && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-500">
            <AlertTriangle size={10} /> critical
          </span>
        )}
      </div>
      <AnimatePresence>
        {typeof delta === 'number' && delta !== 0 && (
          <motion.span
            key={`${kind}-${value}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: -14 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7 }}
            className={`pointer-events-none absolute -top-1 right-2 text-xs font-extrabold ${
              delta > 0 ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {delta > 0 ? '+' : ''}
            {delta}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export function StatusBars({ rapport, energy, lastDelta }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <Meter kind="rapport" value={rapport} delta={lastDelta?.rapport} />
      <Meter kind="energy" value={energy} delta={lastDelta?.energy} />
    </div>
  )
}

export function TrustRow({ trust }) {
  const names = { alex: 'Alex', sam: 'Sam', taylor: 'Taylor', jordan: 'Jordan' }
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {Object.entries(trust).map(([id, v]) => (
        <div key={id} className="flex items-center gap-1.5" title={`${names[id]} trust ${v}/10`}>
          <span className="text-[10px] font-semibold text-white/60">{names[id]}</span>
          <span className="flex gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  v / 2 > i ? (v >= 8 ? 'bg-emerald-300' : v >= 5 ? 'bg-indigo-200' : 'bg-orange-300') : 'bg-white/20'
                }`}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
