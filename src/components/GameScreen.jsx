import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PenLine, Quote, Sparkles, Timer } from 'lucide-react'
import { CAST, STYLES } from '../data/styles.js'
import { CHAPTERS } from '../data/chapters.js'
import { CharacterAvatar, YouAvatar } from './Avatar.jsx'
import { StatusBars, TrustRow } from './Meter.jsx'

const letters = ['A', 'B', 'C', 'D']

export default function GameScreen({ chapter, run, onChoose, onAdvance }) {
  const [phase, setPhase] = useState('choose')
  const [custom, setCustom] = useState('')
  const [hovered, setHovered] = useState({})
  const [showCustom, setShowCustom] = useState(false)
  const [waited, setWaited] = useState(false)

  const startRef = useRef(performance.now())
  const hoverSince = useRef({})
  const hoverTotals = useRef({})

  const entry = useMemo(
    () => run.log.find((e) => e.chapterId === chapter.id) || null,
    [run.log, chapter.id],
  )
  const resolved = Boolean(entry)

  useEffect(() => {
    startRef.current = performance.now()
    hoverSince.current = {}
    hoverTotals.current = {}
    setPhase('choose')
    setCustom('')
    setShowCustom(false)
    setHovered({})
    setWaited(false)
    const t = setTimeout(() => setWaited(true), 22000)
    return () => clearTimeout(t)
  }, [chapter.id])

  const enter = (id) => {
    hoverSince.current[id] = performance.now()
    setHovered((h) => ({ ...h, [id]: true }))
  }
  const leave = (id) => {
    if (hoverSince.current[id]) {
      hoverTotals.current[id] = (hoverTotals.current[id] || 0) + (performance.now() - hoverSince.current[id])
      delete hoverSince.current[id]
    }
    setHovered((h) => ({ ...h, [id]: false }))
  }

  const meta = () => {
    const seconds = (performance.now() - startRef.current) / 1000
    let best = null
    let bestMs = 0
    for (const [id, ms] of Object.entries(hoverTotals.current)) {
      if (ms > bestMs) {
        best = id
        bestMs = ms
      }
    }
    return { seconds, hovered: best }
  }

  const choose = (option) => {
    if (resolved) return
    setPhase('resolve')
    onChoose(option, meta())
  }

  const submitCustom = () => {
    if (!custom.trim() || resolved) return
    setPhase('resolve')
    onChoose({ __custom: true, text: custom.trim() }, meta())
  }

  useEffect(() => {
    if (resolved) setPhase('resolve')
  }, [resolved])

  const focus = CAST[chapter.focus]
  const style = entry ? STYLES[entry.style] : null
  const chapterNumber = chapter.id

  return (
    <div className="mx-auto w-full max-w-4xl px-3 pb-10 sm:px-4">
      {/* sticky status header */}
      <div className="sticky top-0 z-20 -mx-3 mb-4 border-b border-white/10 bg-night/70 px-3 py-3 backdrop-blur-md sm:-mx-4 sm:px-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <YouAvatar avatar={run.avatar} name={run.name} size={36} />
              <div className="leading-tight">
                <p className="text-xs font-bold text-white">{run.name}</p>
                <p className="text-[10px] text-indigo-200/70">{chapter.week}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex">
                {CHAPTERS.map((c) => {
                  const done = run.log.some((e) => e.chapterId === c.id)
                  const active = c.id === chapterNumber
                  return (
                    <span
                      key={c.id}
                      title={c.title}
                      className={`h-1.5 rounded-full transition-all ${
                        active ? 'w-6 bg-white' : done ? 'w-3 bg-emerald-400/80' : 'w-3 bg-white/20'
                      }`}
                    />
                  )
                })}
              </div>
              <span className="chip bg-white/10 text-indigo-100">
                Ch. {chapterNumber}/9
              </span>
            </div>
          </div>
          <StatusBars rapport={entry ? entry.rapportAfter : run.rapport} energy={entry ? entry.energyAfter : run.energy} lastDelta={entry} />
          <TrustRow trust={run.trust} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          {/* scene */}
          <div className="panel overflow-hidden">
            <div className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-5 py-5 sm:px-6">
              <div className="shrink-0">
                <CharacterAvatar id={chapter.focus} size={72} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip bg-indigo-600 text-white">{chapter.act}</span>
                  <span className="chip bg-white text-slate-500 ring-1 ring-slate-200">{chapter.location}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">{chapter.title}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Focus: <span className="font-semibold text-slate-700">{focus.name}</span> — {focus.role}
                </p>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <p className="text-sm leading-relaxed text-slate-600 italic">{chapter.scene}</p>

              <div className="space-y-3">
                {chapter.beats.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.18 }}
                    className={`flex gap-3 ${b.speaker === 'Narrator' ? 'opacity-90' : ''}`}
                  >
                    {b.speaker === 'Narrator' ? (
                      <p className="flex gap-2 text-sm leading-relaxed text-slate-500 italic">
                        <Quote size={14} className="mt-1 shrink-0 text-slate-300" />
                        {b.line}
                      </p>
                    ) : (
                      <>
                        <div className="shrink-0">
                          {b.speaker === 'You' ? (
                            <YouAvatar avatar={run.avatar} name={run.name} size={34} />
                          ) : (
                            <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-slate-100 text-[15px]">
                              {CAST[b.speaker.toLowerCase()]?.emoji || '💬'}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 rounded-2xl rounded-tl-sm bg-slate-50 px-3.5 py-2.5">
                          <p className="text-[11px] font-bold tracking-wide text-indigo-500 uppercase">
                            {b.speaker === 'You' ? run.name : b.speaker}
                          </p>
                          <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{b.line}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* choices / resolution */}
          {!resolved ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-sm font-semibold text-white">{chapter.prompt}</p>
                <span className="hidden items-center gap-1 text-[10px] font-medium tracking-wide text-indigo-200/50 uppercase sm:flex">
                  <Timer size={11} /> the room is waiting
                </span>
              </div>

              <div className="grid gap-2.5">
                {chapter.options.map((opt, i) => {
                  const isHover = hovered[opt.id]
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      onMouseEnter={() => enter(opt.id)}
                      onMouseLeave={() => leave(opt.id)}
                      onFocus={() => enter(opt.id)}
                      onBlur={() => leave(opt.id)}
                      onClick={() => choose(opt)}
                      disabled={phase === 'resolve'}
                      className={`group flex w-full items-start gap-3 rounded-2xl border-2 bg-white/95 p-3.5 text-left shadow-sm transition sm:p-4 ${
                        isHover
                          ? 'border-indigo-500 shadow-lg shadow-indigo-900/10'
                          : 'border-transparent hover:border-indigo-200'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold transition ${
                          isHover ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {letters[i]}
                      </span>
                      <span className="text-sm leading-relaxed text-slate-700">{opt.text}</span>
                      <ArrowRight
                        size={16}
                        className={`ml-auto mt-1 shrink-0 text-indigo-400 transition ${
                          isHover ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                        }`}
                      />
                    </motion.button>
                  )
                })}

                {!showCustom ? (
                  <button
                    onClick={() => setShowCustom(true)}
                    className="flex w-full items-center gap-2 rounded-2xl border-2 border-dashed border-white/25 px-4 py-3 text-sm font-semibold text-indigo-100/80 transition hover:border-violet-300/60 hover:bg-white/5 hover:text-white"
                  >
                    <PenLine size={15} /> Type your own action…
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-2xl border-2 border-violet-300/40 bg-white/95 p-3">
                    <label htmlFor="custom-action" className="mb-2 block text-[11px] font-bold tracking-wider text-violet-600 uppercase">
                      Option E · in your own words
                    </label>
                    <textarea
                      id="custom-action"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value.slice(0, 280))}
                      rows={3}
                      autoFocus
                      placeholder="What exactly do you say or do? Name the behaviour, not the feeling."
                      className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{custom.length}/280 · read by the room, not a chatbot</span>
                      <button onClick={submitCustom} disabled={!custom.trim()} className="btn-primary px-4 py-2 text-xs">
                        Say it <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {waited && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-1 text-center text-[11px] text-indigo-200/50">
                  Twelve seconds of silence in a room of five people is a very long time.
                </motion.p>
              )}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip text-white" style={{ backgroundColor: style.hex }}>
                    {style.label}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    {entry.custom ? (
                      'your own action'
                    ) : (
                      <>
                        option<span className="ml-1 text-slate-500">{entry.optionId.toUpperCase()}</span>
                      </>
                    )}
                  </span>
                  {entry.custom && (
                    <span className="chip bg-violet-50 text-violet-600">
                      <Sparkles size={11} /> {Math.round((entry.confidence || 0.6) * 100)}% read
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-slate-700">&ldquo;{entry.text}&rdquo;</p>
              </div>

              <div className="space-y-4 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap gap-2">
                  <Delta label="Rapport" value={entry.rapportDelta} />
                  <Delta label="Energy" value={entry.energyDelta} />
                  {entry.custom && <span className="chip bg-slate-100 text-slate-500">{entry.note}</span>}
                </div>

                {entry.reaction && (
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <CharacterAvatar id={chapter.focus} size={44} />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-slate-50 px-3.5 py-2.5">
                      <p className="text-[11px] font-bold tracking-wide text-indigo-500 uppercase">{entry.reaction.speaker}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{entry.reaction.line}</p>
                    </div>
                  </div>
                )}

                <div
                  className="rounded-2xl border-l-4 bg-slate-50/80 px-4 py-3"
                  style={{ borderColor: style.hex }}
                >
                  <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">What just happened</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{entry.insight}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className={`chip ${entry.bestFit ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {entry.bestFit ? '✓ situational fit' : `this moment wanted ${chapter.bestFit.map((s) => STYLES[s].label).join(' / ')}`}
                  </span>
                  {entry.seconds >= 45 && (
                    <span className="chip bg-rose-50 text-rose-600">
                      <Timer size={11} /> hesitation point · {entry.seconds}s
                    </span>
                  )}
                </div>

                <button onClick={onAdvance} className="btn-primary w-full sm:w-auto">
                  Continue to {chapterNumber === 9 ? 'the wrap-up' : 'the next week'} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Delta({ label, value }) {
  const good = value > 0
  return (
    <span
      className={`chip ring-1 ${
        value === 0
          ? 'bg-slate-50 text-slate-500 ring-slate-200'
          : good
            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
            : 'bg-rose-50 text-rose-700 ring-rose-200'
      }`}
    >
      {label} {value > 0 ? '+' : ''}
      {value}
    </span>
  )
}
