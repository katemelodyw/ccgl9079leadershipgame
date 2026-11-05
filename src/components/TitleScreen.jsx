import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Gauge, Trophy, Castle } from 'lucide-react'
import { CAST } from '../data/styles.js'
import { CharacterAvatar } from './Avatar.jsx'
import { BADGES } from '../lib/engine.js'

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d },
})

export default function TitleScreen({ onStart, onDebrief, store }) {
  const earned = BADGES.filter((b) => store?.badges?.includes(b.id))
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-16">
      <motion.div {...fade(0)} className="flex flex-col items-center text-center">
        <span className="chip mb-5 bg-white/10 text-indigo-100 ring-1 ring-white/20">
          <Sparkles size={12} /> A 12-minute leadership simulator
        </span>
        <h1 className="font-display text-[13vw] leading-[0.85] font-bold text-white sm:text-7xl md:text-8xl">
          TEAM QUEST
        </h1>
        <p className="mt-3 font-display text-2xl text-indigo-200 italic sm:text-3xl">The Semester</p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-indigo-100/80 sm:text-base">
          One showcase. Nine weeks of friction. Four teammates who remember everything you do.
          Lead the Campus Innovation Showcase to launch — without losing your team, or yourself.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button onClick={onStart} className="btn-primary group px-8 py-4 text-base">
            Begin Week 2
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </button>
          <button onClick={onDebrief} className="btn-ghost px-6 py-4">
            <Users size={16} /> Team Debrief Room
          </button>
        </div>
        {store?.lastRun && (
          <p className="mt-3 text-xs text-indigo-200/70">
            Last run: {store.lastRun.name} · {store.lastRun.outcome === 'complete' ? 'finished the showcase' : 'did not finish'}{' '}
            · {store.lastRun.log?.length || 0} decisions made
          </p>
        )}
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4">
        {Object.values(CAST).map((c, i) => (
          <motion.div
            key={c.id}
            {...fade(0.15 + i * 0.08)}
            className="panel-dark flex flex-col items-center gap-2 p-4 text-center"
          >
            <div className="animate-floaty" style={{ animationDelay: `${i * 0.6}s` }}>
              <CharacterAvatar id={c.id} size={78} />
            </div>
            <p className="text-sm font-bold text-white">{c.name}</p>
            <p className="text-[11px] leading-tight text-indigo-200/70">{c.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(0.5)} className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { Icon: Gauge, title: 'Two persistent meters', body: 'Rapport and Energy carry across all nine chapters. Either one hitting 0% ends the semester early.' },
          { Icon: Sparkles, title: 'Goleman, scored', body: 'Every choice maps to one of six leadership styles. The endgame radar shows your default and your blind spot.' },
          { Icon: Castle, title: 'Habits, not luck', body: 'Try the habits in real life, tick them off, and watch your Campus Castle upgrade.' },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="panel-dark p-4">
            <Icon size={18} className="mb-2 text-violet-300" />
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-indigo-200/70">{body}</p>
          </div>
        ))}
      </motion.div>

      {earned.length > 0 && (
        <motion.div {...fade(0.6)} className="mt-6 rounded-3xl border border-amber-300/30 bg-amber-400/10 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-200 uppercase">
            <Trophy size={12} /> Your badge shelf
          </p>
          <div className="flex flex-wrap gap-2">
            {earned.map((b) => (
              <span key={b.id} className="chip bg-white/10 text-amber-100 ring-1 ring-amber-200/30">
                {b.emoji} {b.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <p className="mt-10 text-center text-[11px] text-indigo-200/50">
        Fictional students. Real leadership patterns. Built as a single continuous semester.
      </p>
    </div>
  )
}
