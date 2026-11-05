import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Brain,
  Castle,
  Check,
  Copy,
  Download,
  EyeOff,
  Hourglass,
  RotateCcw,
  Share2,
  Target,
  Users,
} from 'lucide-react'
import { STYLES, STYLE_ORDER, CAST } from '../data/styles.js'
import { BADGES, exportRun, leadershipTitle } from '../lib/engine.js'
import RadarPanel from './RadarPanel.jsx'
import { CharacterAvatar, YouAvatar } from './Avatar.jsx'

const STYLE_STORY = {
  commanding: 'When the room wobbled, you reached for clarity. Direct, fast, unmissable — and expensive in trust.',
  visionary: 'You led with the shape of the thing: what it could become, and why anyone should care.',
  affiliative: 'You protected the people first and trusted the work to follow. Warm, human, occasionally too soft.',
  democratic: 'You believed the room knew more than any one person in it, and you kept asking until it showed.',
  pacesetting: 'You set the bar and then jumped over it yourself, sometimes while everyone else was still stretching.',
  coaching: 'You kept handing people the tools instead of the answers, even when it would have been faster not to.',
}

const trustLabel = (v) =>
  v >= 9 ? 'ride or die' : v >= 7 ? 'solid' : v >= 5 ? 'steady' : v >= 3 ? 'careful' : 'distant'

export default function Results({ run, analysis, newBadges, onCastle, onDebrief, onReplay, onHome, store }) {
  const [copied, setCopied] = useState(false)
  const title = leadershipTitle(analysis)
  const json = useMemo(() => exportRun(run, analysis), [run, analysis])
  const earned = new Set([...(newBadges || []), ...(store?.badges || [])])
  const sortedStyles = [...STYLE_ORDER].sort((a, b) => analysis.pct[b] - analysis.pct[a])
  const dominantStyle = STYLES[analysis.dominant]
  const blindStyle = STYLES[analysis.blindSpot]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `team-quest-${(run.name || 'lead').toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel mt-6 overflow-hidden"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-8 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">Semester complete · Post-showcase</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90">
            {STYLE_STORY[analysis.dominant]}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="chip bg-white/15 text-white ring-1 ring-white/25">
              Dominant · {dominantStyle.label} {analysis.pct[analysis.dominant]}%
            </span>
            <span className="chip bg-white/15 text-white ring-1 ring-white/25">
              Secondary · {STYLES[analysis.secondary].label} {analysis.pct[analysis.secondary]}%
            </span>
            <span className="chip bg-white/15 text-white ring-1 ring-white/25">
              Blind spot · {blindStyle.label}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <YouAvatar avatar={run.avatar} name={run.name} size={24} /> {run.name}
            </span>
            <span className="rounded-full bg-white/15 px-2.5 py-1">Rapport {run.rapport}%</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1">Energy {run.energy}%</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1">Situational fit {analysis.fitPct}%</span>
          </div>
        </div>
      </motion.header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="panel p-5"
        >
          <div className="mb-1 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
              <Target size={14} /> Your Goleman profile
            </h2>
            <span className="text-[10px] font-semibold text-slate-400">{analysis.total} decisions</span>
          </div>
          <RadarPanel series={[{ key: 'you', name: run.name, pct: analysis.pct, hex: '#7c3aed' }]} height={300} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="panel p-5"
        >
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            <Brain size={14} /> Style breakdown
          </h2>
          <div className="space-y-2.5">
            {sortedStyles.map((s) => {
              const st = STYLES[s]
              return (
                <div key={s}>
                  <div className="mb-1 flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-slate-700">{st.label}</span>
                    <span className="font-bold tabular-nums text-slate-500">{analysis.pct[s]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: st.hex }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.pct[s]}%` }}
                      transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-500">
            Styles are situational tools, not personality types. A 0% is not a weakness — it is a move you never made
            when this team needed it.
          </p>
        </motion.section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            <EyeOff size={14} /> Blind spot · {blindStyle.label}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">{blindStyle.blindSpot}</p>
          <div className="mt-3 space-y-2">
            {blindStyle.habits.map((h) => (
              <p key={h} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: blindStyle.hex }} />
                {h}
              </p>
            ))}
          </div>
          <button onClick={onCastle} className="btn-soft mt-4 w-full">
            <Castle size={15} /> Turn this into a habit
          </button>
        </section>

        <section className="panel p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            <Hourglass size={14} /> Hesitation points
          </h2>
          {analysis.hesitation.length === 0 ? (
            <p className="text-sm leading-relaxed text-slate-600">
              You never sat on a decision for more than 45 seconds. Fast is not automatically wise — but there is
              nothing hidden here to work through.
            </p>
          ) : (
            <div className="space-y-3">
              {analysis.hesitation.map((h) => (
                <div key={`${h.chapterId}-${h.optionId}`} className="rounded-xl border border-rose-100 bg-rose-50/60 p-3">
                  <p className="text-[11px] font-bold tracking-wide text-rose-500 uppercase">
                    {h.week} · {h.chapterTitle} · {h.seconds}s
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700 italic">{h.prompt}</p>
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    You eventually chose <span className="font-semibold">{STYLES[h.style].label}</span>.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            <Users size={14} /> Where the team landed
          </h2>
          <div className="space-y-2">
            {Object.entries(run.trust).map(([id, v]) => {
              const c = CAST[id]
              return (
                <div key={id} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
                  <CharacterAvatar id={id} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-ink">
                      {c.name} <span className="font-medium text-slate-400">· {c.role}</span>
                    </p>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-indigo-400" style={{ width: `${v * 10}%` }} />
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-slate-500">{trustLabel(v)}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            <Award size={14} /> Badges
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {BADGES.map((b) => {
              const has = earned.has(b.id)
              const isNew = (newBadges || []).includes(b.id)
              return (
                <div
                  key={b.id}
                  className={`relative rounded-xl border p-3 transition ${
                    has ? 'border-amber-200 bg-amber-50/70' : 'border-slate-100 bg-slate-50/60 opacity-60'
                  }`}
                >
                  {isNew && (
                    <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      NEW
                    </span>
                  )}
                  <p className="text-lg leading-none">{b.emoji}</p>
                  <p className="mt-1 text-xs font-bold text-ink">{b.name}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <section className="panel mt-4 p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
          <Share2 size={14} /> Take this to your team
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Export your profile and paste it into the Team Debrief Room, or send it to your real teammates. The room
          will overlay everyone&apos;s radar and flag the style clashes before they become week-nine problems.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={copy} className="btn-soft">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy export'}
          </button>
          <button onClick={download} className="btn-soft">
            <Download size={14} /> Download .json
          </button>
          <button onClick={onDebrief} className="btn-primary">
            <Users size={14} /> Open Team Debrief Room <ArrowRight size={14} />
          </button>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-[11px] font-semibold text-slate-400 hover:text-slate-600">
            View raw export
          </summary>
          <pre className="scroll-thin mt-2 max-h-40 overflow-auto rounded-xl bg-slate-900 p-3 text-[10px] leading-relaxed text-emerald-200">
            {json}
          </pre>
        </details>
      </section>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <button onClick={onReplay} className="btn-ghost flex-1 sm:flex-none">
            <RotateCcw size={14} /> New semester
          </button>
          <button onClick={onHome} className="btn-ghost flex-1 sm:flex-none">
            Title screen
          </button>
        </div>
        <button onClick={onCastle} className="btn-primary">
          <Castle size={15} /> Build your Campus Castle <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
