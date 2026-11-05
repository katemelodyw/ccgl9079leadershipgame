import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { CharacterAvatar } from './Avatar.jsx'

export default function Interlude({ data, run, onContinue }) {
  const tier = run.rapport >= 75 ? 'high' : run.rapport >= 40 ? 'mid' : 'low'
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-6 py-7">
          <p className="text-[11px] font-bold tracking-[0.18em] text-violet-500 uppercase">{data.kicker}</p>
          <h2 className="mt-1 font-display text-3xl text-ink">{data.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.body[tier]}</p>
        </div>

        <div className="grid gap-3 px-6 py-6 sm:grid-cols-3">
          {Object.values(run.trust).length > 0 &&
            Object.entries(run.trust).map(([id, v], i) => {
              const mood = v >= 8 ? 'all in' : v >= 5 ? 'showing up' : v >= 3 ? 'guarded' : 'checked out'
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-2.5 rounded-2xl bg-slate-50 px-3 py-2.5"
                >
                  <CharacterAvatar id={id} size={38} />
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-ink capitalize">{id}</p>
                    <p className={`text-[11px] ${v >= 8 ? 'text-emerald-600' : v >= 5 ? 'text-slate-500' : 'text-amber-600'}`}>
                      {mood}
                    </p>
                  </div>
                </motion.div>
              )
            })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50">
              <Zap size={15} />
            </span>
            A real weekend off · +{data.energy} energy
          </div>
          <button onClick={onContinue} className="btn-primary w-full sm:w-auto">
            Back to it <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
