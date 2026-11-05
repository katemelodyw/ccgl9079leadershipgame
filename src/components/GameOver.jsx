import { motion } from 'framer-motion'
import { ArrowRight, RotateCcw, Skull, Flame, HeartCrack } from 'lucide-react'
import { CHAPTERS } from '../data/chapters.js'
import { STYLES } from '../data/styles.js'
import { CharacterAvatar } from './Avatar.jsx'

const COPY = {
  revolt: {
    Icon: HeartCrack,
    kicker: 'Game over · Team revolt',
    title: 'The team stops showing up.',
    colour: 'from-rose-500 to-pink-500',
    body:
      'Rapport hit zero. It was not one decision — it was the pattern. Three people quietly moved your project to the bottom of their list, and the fourth sent a very polite email explaining that they are "focusing on other commitments".',
    aftermath: [
      'Alex stops replying in the group chat, but keeps the hoodie you lent them.',
      'Sam takes the deck and rebuilds it for their portfolio. It is, annoyingly, excellent.',
      'Taylor files a beautifully formatted complaint with the module lead. It has appendices.',
      'Jordan switches teams and ships the same feature alone in a weekend.',
    ],
  },
  burnout: {
    Icon: Flame,
    kicker: 'Game over · Leader burnout',
    title: 'You run out of you.',
    colour: 'from-amber-500 to-orange-500',
    body:
      'Energy hit zero. You absorbed one task too many, stayed one night too late, and became the bottleneck you were trying to remove. The showcase continues without you — badly, and without any of the credit.',
    aftermath: [
      'You sleep through the final standup for the first time in your life.',
      'The team ships something. It is fine. Nobody can tell you what it does.',
      'Alex notices you are not okay before you do, which is the worst part.',
      'You learn the phrase "sustainable pace" the way most people learn it: the hard way.',
    ],
  },
}

export default function GameOver({ run, onRetry, onHome }) {
  const copy = COPY[run.outcome] || COPY.burnout
  const survived = run.log.length
  const lean = run.log.length
    ? Object.entries(
        run.log.reduce((acc, e) => ({ ...acc, [e.style]: (acc[e.style] || 0) + 1 }), {}),
      ).sort((a, b) => b[1] - a[1])[0][0]
    : 'coaching'

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="panel overflow-hidden">
        <div className={`bg-gradient-to-br ${copy.colour} px-6 py-8 text-white`}>
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase opacity-90">
            <copy.Icon size={14} /> {copy.kicker}
          </div>
          <h1 className="mt-2 font-display text-4xl leading-tight">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90">{copy.body}</p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          {[
            { label: 'Week reached', value: CHAPTERS[Math.min(survived, 8)].week },
            { label: 'Decisions made', value: `${survived}/9` },
            { label: 'Default style', value: STYLES[lean].label },
          ].map((s) => (
            <div key={s.label} className="px-3 py-4 text-center">
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{s.label}</p>
              <p className="mt-1 text-sm font-bold text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-6">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            <Skull size={12} /> What happens next
          </p>
          <ul className="space-y-2">
            {copy.aftermath.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="flex gap-2 text-sm leading-relaxed text-slate-600"
              >
                <span className="text-slate-300">—</span>
                {line}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="px-6 pb-6">
          <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">The team, in the end</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(run.trust).map(([id, v]) => (
              <div key={id} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-2.5 py-1.5">
                <CharacterAvatar id={id} size={30} />
                <span className="text-[11px] font-semibold text-slate-600 capitalize">
                  {id} · {v >= 8 ? 'loyal' : v >= 5 ? 'neutral' : v >= 3 ? 'wary' : 'gone'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:flex-row sm:justify-end">
          <button onClick={onHome} className="btn-soft justify-center">
            Title screen
          </button>
          <button onClick={onRetry} className="btn-primary justify-center">
            <RotateCcw size={15} /> Run the semester again <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>

      <p className="mt-4 text-center text-xs text-indigo-200/60">
        Both meters start fresh. Your badge shelf and castle habits persist.
      </p>
    </div>
  )
}
