import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Castle as CastleIcon, Hammer, Sparkles, RotateCcw, ArrowRight } from 'lucide-react'
import { STYLES } from '../data/styles.js'
import { castleStage } from '../lib/engine.js'

function CastleArt({ stage }) {
  const show = (n) => stage >= n
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label={`Campus castle at stage ${stage}`}>
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#122744" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#a5b4c9" />
        </linearGradient>
        <linearGradient id="stoneDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#8b9cb3" />
        </linearGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {show(6) &&
        [
          [40, 40],
          [330, 30],
          [370, 90],
          [70, 95],
        ].map(([x, y], i) => (
          <g key={`fw-${i}`}>
            <circle cx={x} cy={y} r="22" fill="url(#glow)" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1={x}
                y1={y}
                x2={x + Math.cos((deg * Math.PI) / 180) * 16}
                y2={y + Math.sin((deg * Math.PI) / 180) * 16}
                stroke="#fbbf24"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}

      <ellipse cx="200" cy="196" rx="196" ry="30" fill="#0b1b2e" opacity="0.5" />
      <path d="M0 190c60-16 120-10 200-10s140-8 200 10v30H0z" fill="url(#ground)" />

      {/* stage 0 — tent and campfire */}
      <g opacity={show(0) ? 1 : 0.25}>
        <path d="M52 190l30-58 30 58z" fill="#fcd34d" opacity="0.95" />
        <path d="M82 132l0 58" stroke="#b45309" strokeWidth="2" />
        <path d="M76 190l6-22 6 22z" fill="#7c2d12" opacity="0.4" />
        {show(0) && (
          <g>
            <circle cx="128" cy="181" r="10" fill="url(#glow)" />
            <path d="M128 174c5 5 5 10 0 13-5-3-5-8 0-13z" fill="#fb923c" />
          </g>
        )}
      </g>

      {/* stage 1 — first cottage */}
      {show(1) && (
        <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <rect x="238" y="146" width="82" height="44" fill="url(#stone)" rx="3" />
          <path d="M232 148l47-32 47 32z" fill="url(#roof)" />
          <rect x="268" y="162" width="20" height="28" rx="2" fill="#4c1d95" />
          <rect x="296" y="158" width="14" height="12" rx="2" fill="#fef3c7" />
        </motion.g>
      )}

      {/* stage 2 — keep */}
      {show(2) && (
        <motion.g initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <rect x="150" y="108" width="80" height="82" fill="url(#stone)" />
          {[150, 168, 186, 204, 222].map((x) => (
            <rect key={x} x={x} y="100" width="12" height="10" fill="url(#stone)" />
          ))}
          <rect x="180" y="150" width="20" height="40" rx="9" fill="#3b0764" />
          <rect x="162" y="124" width="12" height="16" rx="5" fill="#fde68a" />
          <rect x="206" y="124" width="12" height="16" rx="5" fill="#fde68a" />
        </motion.g>
      )}

      {/* stage 3 — second turret + wall */}
      {show(3) && (
        <motion.g initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <rect x="96" y="126" width="46" height="64" fill="url(#stoneDark)" />
          {[96, 112, 128].map((x) => (
            <rect key={x} x={x} y="118" width="10" height="10" fill="url(#stoneDark)" />
          ))}
          <path d="M96 128l23-24 23 24z" fill="url(#roof)" />
          <rect x="110" y="150" width="10" height="16" rx="4" fill="#fde68a" />
          <rect x="230" y="150" width="52" height="40" fill="url(#stoneDark)" />
          {[230, 248, 266].map((x) => (
            <rect key={x} x={x} y="143" width="10" height="8" fill="url(#stoneDark)" />
          ))}
        </motion.g>
      )}

      {/* stage 4 — banners */}
      {show(4) && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M200 78v-34" stroke="#475569" strokeWidth="2.5" />
          <motion.path
            d="M200 44l34 8-34 10z"
            fill="#a78bfa"
            animate={{ rotate: [0, 2.5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ originX: '0px', originY: '44px' }}
          />
          <path d="M119 104v-26" stroke="#475569" strokeWidth="2" />
          <path d="M119 78l20 5-20 6z" fill="#f472b6" />
          <path d="M282 104v-26" stroke="#475569" strokeWidth="2" />
          <path d="M282 78l20 5-20 6z" fill="#38bdf8" />
        </motion.g>
      )}

      {/* stage 5 — gate + string lights */}
      {show(5) && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M150 190v-26a26 26 0 0 1 52 0v26z" fill="#1e293b" />
          <path d="M162 190v-22a14 14 0 0 1 28 0v22z" fill="#0f172a" />
          <path d="M60 132q70 30 140 0t140 0" stroke="#fbbf24" strokeWidth="1.6" fill="none" opacity="0.8" />
          {[80, 115, 150, 185, 220, 255, 290, 325].map((x, i) => (
            <circle key={x} cx={x} cy={132 + (i % 2 === 0 ? 8 : 14)} r="2.6" fill="#fde68a" />
          ))}
        </motion.g>
      )}

      {show(6) && (
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <path d="M150 96v-16M250 96v-16" stroke="#475569" strokeWidth="2" />
          <path d="M150 80l22 6-22 6z" fill="#34d399" />
          <path d="M250 80l22 6-22 6z" fill="#fbbf24" />
          {[
            [30, 70],
            [60, 52],
            [340, 66],
            [310, 120],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="1.8"
              fill="#fff"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5 + i * 0.4 }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  )
}

export default function Castle({ habits, checked, onToggle, onReset, onBack, onDebrief, hasResults }) {
  const count = habits.filter((h) => checked[h.id]).length
  const stage = habits.length ? Math.min(6, count) : 0
  const stageInfo = castleStage(stage)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200/70 hover:text-white">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
          <div className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 px-4 pt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="chip bg-white/10 text-indigo-100">
                <CastleIcon size={12} /> {stageInfo.name}
              </span>
              <span className="text-[11px] font-bold text-indigo-200/70">{count}/{habits.length} habits</span>
            </div>
            <CastleArt stage={stage} />
          </div>
          <div className="px-5 py-4">
            <p className="text-sm leading-relaxed text-slate-600">{stageInfo.note}</p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: habits.length }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < count ? 'bg-violet-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              The castle only upgrades when you do the thing in real life. Ticks are saved in this browser.
            </p>
          </div>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-white">Try this next</h1>
              <p className="text-xs text-indigo-200/70">Six small moves, chosen for your blind spot and your strength.</p>
            </div>
            {count > 0 && (
              <button onClick={onReset} className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-200/60 hover:text-white">
                <RotateCcw size={11} /> reset
              </button>
            )}
          </div>

          {habits.map((h, i) => {
            const on = Boolean(checked[h.id])
            const st = STYLES[h.style]
            return (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onToggle(h.id)}
                aria-pressed={on}
                className={`panel relative flex w-full items-start gap-3 p-3.5 text-left transition ${
                  on ? 'ring-2 ring-violet-400' : ''
                }`}
              >
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition ${
                    on ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  <AnimatePresence>
                    {on && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check size={14} strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="chip" style={{ backgroundColor: st.soft, color: st.hex }}>
                      {h.tag || st.label}
                    </span>
                    {h.tag && <span className="text-[10px] font-semibold text-slate-400">{st.label}</span>}
                  </span>
                  <span className={`mt-1 block text-sm leading-relaxed ${on ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {h.text}
                  </span>
                </span>
              </motion.button>
            )
          })}

          <div className="flex flex-col gap-2 pt-1 sm:flex-row">
            <button onClick={onBack} className="btn-soft flex-1 justify-center">
              <ArrowLeft size={14} /> Back to results
            </button>
            {hasResults && (
              <button onClick={onDebrief} className="btn-ghost flex-1 justify-center">
                Debrief room <ArrowRight size={14} />
              </button>
            )}
          </div>

          {count === habits.length && habits.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                <Sparkles size={13} /> Fortress complete
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-emerald-100/80">
                You did all six in the real world. That is a semester of leadership practice nobody can grade you on —
                and the only part that transfers.
              </p>
            </motion.div>
          )}

          {count > 0 && count < habits.length && (
            <p className="flex items-center gap-1.5 text-center text-[11px] text-indigo-200/50">
              <Hammer size={11} /> {habits.length - count} more habit{habits.length - count === 1 ? '' : 's'} to finish the fortress.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
