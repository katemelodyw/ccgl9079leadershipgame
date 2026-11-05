import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ClipboardPaste,
  Copy,
  Plus,
  Trash2,
  UserPlus,
  Users,
  Wand2,
  X,
} from 'lucide-react'
import { STYLES, STYLE_ORDER } from '../data/styles.js'
import { clamp, parseImport } from '../lib/engine.js'
import RadarPanel from './RadarPanel.jsx'

const COLORS = ['#7c3aed', '#ec4899', '#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6']

const DEMO = [
  {
    name: 'Alex',
    archetype: 'dreamer',
    rapport: 62,
    energy: 40,
    outcome: 'complete',
    pct: { affiliative: 34, coaching: 24, democratic: 14, pacesetting: 10, visionary: 12, commanding: 6 },
  },
  {
    name: 'Sam',
    archetype: 'go-getter',
    rapport: 55,
    energy: 70,
    outcome: 'complete',
    pct: { visionary: 30, pacesetting: 26, commanding: 18, affiliative: 12, democratic: 8, coaching: 6 },
  },
  {
    name: 'Taylor',
    archetype: 'strategist',
    rapport: 68,
    energy: 55,
    outcome: 'complete',
    pct: { democratic: 28, coaching: 24, commanding: 20, pacesetting: 12, affiliative: 8, visionary: 8 },
  },
  {
    name: 'Jordan',
    archetype: 'go-getter',
    rapport: 50,
    energy: 45,
    outcome: 'complete',
    pct: { coaching: 30, pacesetting: 22, commanding: 18, visionary: 12, democratic: 10, affiliative: 8 },
  },
]

const CLASHES = {
  'commanding|democratic': {
    severity: 'friction',
    title: 'Speed vs. voice',
    detail: 'One person wants the call made now; the other needs the room heard first. Both read the other as disrespect.',
    move: 'Agree a decision rule in advance: input by Tuesday 5pm, decision by Tuesday 6pm, one named owner.',
  },
  'affiliative|commanding': {
    severity: 'friction',
    title: 'Directness vs. care',
    detail: 'Blunt feedback lands as a personal attack; soft feedback lands as evasion. Neither is being difficult on purpose.',
    move: 'Use SBI for every hard conversation: Situation, Behaviour, Impact. No adjectives, no diagnosis.',
  },
  'pacesetting|commanding': {
    severity: 'friction',
    title: 'Two engines, one steering wheel',
    detail: 'Both drive hard, neither wants to be the passenger. Work gets duplicated and credit gets contested.',
    move: 'Split domain ownership explicitly. One owner per area, and the other reviews rather than rebuilds.',
  },
  'coaching|commanding': {
    severity: 'friction',
    title: 'Orders vs. development',
    detail: 'One wants people to figure it out; the other wants the answer in the channel in thirty seconds.',
    move: 'Name the mode out loud: "This is a decision, not a development conversation." Switch deliberately.',
  },
  'commanding|visionary': {
    severity: 'watch',
    title: 'Execution vs. direction',
    detail: 'The visionary keeps widening the frame; the commander keeps shrinking it to today.',
    move: 'Put the vision in one sentence at the top of the doc, then only sprint detail below it.',
  },
  'democratic|pacesetting': {
    severity: 'friction',
    title: 'Consensus vs. momentum',
    detail: 'One experiences speed as reckless; the other experiences process as stalling. Both are often right.',
    move: 'Timebox consultation. Two rounds, five minutes each, then the pacesetter executes the agreed scope.',
  },
  'affiliative|pacesetting': {
    severity: 'friction',
    title: 'Comfort vs. standard',
    detail: 'One protects people from pressure; the other thinks pressure is how people grow.',
    move: 'Separate the standard from the delivery: agree the bar together, then let people choose how they hit it.',
  },
  'coaching|pacesetting': {
    severity: 'watch',
    title: 'Build vs. ship',
    detail: 'One invests in capability, the other in output. Under deadline, the investment looks like a luxury.',
    move: 'Ring-fence one learning block per week. Protect it in the plan so it is not the first thing cut.',
  },
  'pacesetting|visionary': {
    severity: 'watch',
    title: 'Big picture vs. next sprint',
    detail: 'The vision keeps expanding while the sprint keeps tightening. Scope creep is the shared symptom.',
    move: 'Attach every new idea to a date. If it has no date, it goes on a parking-lot list, not the sprint.',
  },
  'affiliative|democratic': {
    severity: 'watch',
    title: 'Harmony vs. honesty',
    detail: 'Both avoid conflict, so the real disagreement never reaches the agenda and leaks out in side chats.',
    move: 'Add a standing "disagreement" item to the agenda. Make dissent a role, not a risk.',
  },
  'affiliative|visionary': {
    severity: 'watch',
    title: 'The people vs. the mission',
    detail: 'One optimises for how the team feels, the other for where the team is going.',
    move: 'Tie each person\'s work to the mission in their own words, so the vision includes them.',
  },
  'democratic|visionary': {
    severity: 'watch',
    title: 'Process vs. story',
    detail: 'One gathers input, the other has already decided the ending. Input can feel decorative.',
    move: 'Say what is actually open for input and what is fixed. Then honour the answer.',
  },
  'coaching|democratic': {
    severity: 'watch',
    title: 'Develop vs. decide',
    detail: 'Both love a good discussion. Meetings run long and decisions arrive late.',
    move: 'Every agenda item ends with: decision, owner, date. No item closes without all three.',
  },
  'coaching|visionary': {
    severity: 'watch',
    title: 'Skills vs. story',
    detail: 'One grows people, the other moves them. Development can get lost in the momentum.',
    move: 'Assign one stretch skill per person per project, and mention it in the retros.',
  },
  'affiliative|coaching': {
    severity: 'watch',
    title: 'Kindness vs. challenge',
    detail: 'Both are supportive, but one avoids the hard feedback the other depends on.',
    move: 'Make feedback a scheduled ritual, not a reaction to a problem.',
  },
}

function clashFor(a, b) {
  const key = [a, b].sort().join('|')
  return (
    CLASHES[key] || {
      severity: 'watch',
      title: `${STYLES[a].label} meets ${STYLES[b].label}`,
      detail: 'Different defaults, same project. Naming the difference is most of the fix.',
      move: 'Write down who owns what, and how each of you prefers to be told bad news.',
    }
  )
}

export default function Debrief({ lastRun, lastAnalysis, onBack }) {
  const [members, setMembers] = useState([])
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [manual, setManual] = useState({ name: '', pct: { commanding: 15, visionary: 15, affiliative: 15, democratic: 15, pacesetting: 20, coaching: 20 } })

  const addMember = (data) => {
    setMembers((m) => {
      if (m.length >= 6) return m
      const base = { ...data }
      delete base.archetype
      return [...m, { ...base, id: `${base.name}-${Date.now()}`, hex: COLORS[m.length % COLORS.length] }]
    })
    setError('')
  }

  const addSelf = () => {
    if (!lastRun || !lastAnalysis) {
      setError('Play a full semester first — or add the demo team below.')
      return
    }
    if (members.some((m) => m.isYou)) return
    addMember({
      name: lastRun.name,
      pct: lastAnalysis.pct,
      rapport: lastRun.rapport,
      energy: lastRun.energy,
      outcome: lastRun.outcome,
      isYou: true,
    })
  }

  const importOne = () => {
    try {
      const parsed = parseImport(importText)
      addMember({ ...parsed, pct: parsed.pct })
      setImportText('')
      setShowImport(false)
    } catch (e) {
      setError(e.message)
    }
  }

  const dominantOf = (m) => [...STYLE_ORDER].sort((a, b) => m.pct[b] - m.pct[a])[0]

  const clashes = useMemo(() => {
    const out = []
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const a = dominantOf(members[i])
        const b = dominantOf(members[j])
        const c = clashFor(a, b)
        out.push({ ...c, a: members[i].name, b: members[j].name, aStyle: a, bStyle: b, key: `${members[i].id}-${members[j].id}` })
      }
    }
    return out.sort((x, y) => (x.severity === y.severity ? 0 : x.severity === 'friction' ? -1 : 1))
  }, [members])

  const teamBlindSpot = useMemo(() => {
    if (members.length < 2) return null
    const avg = Object.fromEntries(
      STYLE_ORDER.map((s) => [s, Math.round(members.reduce((acc, m) => acc + (m.pct[s] || 0), 0) / members.length)]),
    )
    const lowest = [...STYLE_ORDER].sort((a, b) => avg[a] - avg[b])[0]
    return avg[lowest] <= 12 ? { style: lowest, avg: avg[lowest] } : null
  }, [members])

  const guide = useMemo(() => {
    if (members.length < 2) return ''
    const lines = [
      'TEAM QUEST · COLLABORATION GUIDE',
      `Team: ${members.map((m) => `${m.name} (${STYLES[dominantOf(m)].label})`).join(', ')}`,
      '',
    ]
    if (teamBlindSpot) {
      lines.push(
        `TEAM BLIND SPOT — ${STYLES[teamBlindSpot.style].label} (avg ${teamBlindSpot.avg}%)`,
        `Nobody on this team defaults to ${STYLES[teamBlindSpot.style].label.toLowerCase()} leadership. Assign it as a role in your next meeting so it stops being nobody's job.`,
        '',
      )
    }
    if (clashes.length === 0) {
      lines.push('No strong style clashes detected. Keep naming the mode out loud and you will stay aligned.')
    } else {
      lines.push('WHERE YOU WILL CLASH')
      clashes.slice(0, 4).forEach((c, i) => {
        lines.push(`${i + 1}. ${c.a} (${STYLES[c.aStyle].label}) + ${c.b} (${STYLES[c.bStyle].label}) — ${c.title}`)
        lines.push(`   Why: ${c.detail}`)
        lines.push(`   Try: ${c.move}`)
      })
    }
    lines.push('', 'THREE TEAM NORMS THAT PREVENT MOST OF THIS')
    lines.push('1. Every decision gets an owner, a date, and a written one-liner.')
    lines.push('2. Disagreement is an agenda item, not a private message.')
    lines.push('3. Feedback uses SBI: Situation, Behaviour, Impact.')
    return lines.join('\n')
  }, [members, clashes, teamBlindSpot])

  const copyGuide = async () => {
    try {
      await navigator.clipboard.writeText(guide)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200/70 hover:text-white">
        <ArrowLeft size={14} /> Back
      </button>

      <header className="mb-4">
        <h1 className="font-display text-3xl text-white">Team Debrief Room</h1>
        <p className="mt-1 max-w-2xl text-sm text-indigo-200/80">
          Overlay everyone&apos;s Goleman profile on one radar. The room flags where your defaults will collide — and
          writes the collaboration guide your team never had time to write.
        </p>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-4">
          {members.length === 0 ? (
            <div className="grid h-[320px] place-items-center px-6 text-center">
              <div>
                <Users size={28} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">No profiles yet</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Add yourself from your last run, import a teammate&apos;s export, or load the cast to see how it works.
                </p>
              </div>
            </div>
          ) : (
            <RadarPanel
              series={members.map((m) => ({ key: m.id, name: m.name, pct: m.pct, hex: m.hex }))}
              height={420}
            />
          )}
        </div>

        <div className="space-y-3">
          <div className="panel p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase">
              <Users size={13} /> Members ({members.length}/6)
            </h2>
            <div className="space-y-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.hex }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-ink">
                      {m.name} {m.isYou && <span className="font-medium text-indigo-500">(you)</span>}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {STYLES[dominantOf(m)].label} · rapport {m.rapport}%
                    </span>
                  </span>
                  <button
                    onClick={() => setMembers((list) => list.filter((x) => x.id !== m.id))}
                    className="rounded-lg p-1 text-slate-300 transition hover:bg-white hover:text-rose-500"
                    aria-label={`Remove ${m.name}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              {members.length === 0 && <p className="py-2 text-xs text-slate-400">Empty room. Add someone below.</p>}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button onClick={addSelf} className="btn-soft justify-center text-xs">
                <UserPlus size={13} /> Add yourself
              </button>
              <button
                onClick={() => DEMO.forEach((d) => members.length < 6 && addMember(d))}
                className="btn-soft justify-center text-xs"
              >
                <Wand2 size={13} /> Load demo team
              </button>
              <button onClick={() => setShowImport((v) => !v)} className="btn-soft justify-center text-xs">
                <ClipboardPaste size={13} /> Paste export
              </button>
              <button
                onClick={() => {
                  setManual((m) => ({ ...m }))
                  document.getElementById('manual-name')?.focus()
                }}
                className="btn-soft justify-center text-xs"
              >
                <Plus size={13} /> Add manually
              </button>
            </div>

            {showImport && (
              <div className="mt-3 rounded-xl border border-slate-200 p-3">
                <label htmlFor="import-json" className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Teammate export JSON
                </label>
                <textarea
                  id="import-json"
                  rows={3}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder='{"app":"team-quest", …}'
                  className="w-full resize-none rounded-lg border border-slate-200 px-2.5 py-2 font-mono text-[11px] outline-none focus:border-indigo-400"
                />
                <button onClick={importOne} className="btn-primary mt-2 w-full justify-center text-xs">
                  Add profile
                </button>
              </div>
            )}

            <div className="mt-3 rounded-xl border border-slate-200 p-3">
              <label htmlFor="manual-name" className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Simulate a teammate
              </label>
              <input
                id="manual-name"
                value={manual.name}
                onChange={(e) => setManual((m) => ({ ...m, name: e.target.value.slice(0, 20) }))}
                placeholder="Name"
                className="mb-2 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-indigo-400"
              />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {STYLE_ORDER.map((s) => (
                  <label key={s} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-16 shrink-0 font-semibold" style={{ color: STYLES[s].hex }}>
                      {STYLES[s].label}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={manual.pct[s]}
                      onChange={(e) => setManual((m) => ({ ...m, pct: { ...m.pct, [s]: Number(e.target.value) } }))}
                      className="h-1 w-full accent-indigo-600"
                      aria-label={`${STYLES[s].label} score`}
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={() => {
                  const total = STYLE_ORDER.reduce((a, s) => a + manual.pct[s], 0) || 1
                  const pct = Object.fromEntries(
                    STYLE_ORDER.map((s) => [s, clamp(Math.round((manual.pct[s] / total) * 100))]),
                  )
                  addMember({ name: manual.name.trim() || 'Teammate', pct, rapport: 60, energy: 55, outcome: 'complete' })
                  setManual((m) => ({ ...m, name: '' }))
                }}
                className="btn-primary mt-2 w-full justify-center text-xs"
              >
                Add to room
              </button>
            </div>

            {error && (
              <p className="mt-2 flex items-start gap-1.5 text-[11px] font-medium text-rose-600">
                <X size={12} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}
          </div>

          {teamBlindSpot && (
            <div className="rounded-2xl border border-amber-300/40 bg-amber-400/10 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold text-amber-200">
                <AlertTriangle size={13} /> Team blind spot: {STYLES[teamBlindSpot.style].label} ({teamBlindSpot.avg}%)
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-amber-100/80">
                Nobody here defaults to {STYLES[teamBlindSpot.style].label.toLowerCase()}. Assign it as a role for
                one meeting — otherwise it stays nobody&apos;s job.
              </p>
            </div>
          )}
        </div>
      </div>

      {members.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 grid items-start gap-4 lg:grid-cols-[1.2fr_1fr]">
          <section className="panel p-5">
            <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold tracking-wider text-slate-500 uppercase">
              <AlertTriangle size={14} /> Detected clashes
            </h2>
            {clashes.length === 0 ? (
              <p className="text-sm text-slate-600">No pairs with conflicting defaults. Rare and worth protecting.</p>
            ) : (
              <div className="space-y-2.5">
                {clashes.slice(0, 4).map((c) => (
                  <div
                    key={c.key}
                    className={`rounded-xl border p-3 ${
                      c.severity === 'friction' ? 'border-rose-200 bg-rose-50/60' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="chip text-white" style={{ backgroundColor: STYLES[c.aStyle].hex }}>
                        {c.a} · {STYLES[c.aStyle].label}
                      </span>
                      <span className="text-xs font-bold text-slate-400">×</span>
                      <span className="chip text-white" style={{ backgroundColor: STYLES[c.bStyle].hex }}>
                        {c.b} · {STYLES[c.bStyle].label}
                      </span>
                      {c.severity === 'friction' && (
                        <span className="chip bg-rose-100 text-rose-600">likely friction</span>
                      )}
                    </div>
                    <p className="mt-2 text-xs font-bold text-ink">{c.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{c.detail}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-emerald-700">
                      <span className="font-bold">Try:</span> {c.move}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="panel flex flex-col p-5">
            <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold tracking-wider text-slate-500 uppercase">
              <Wand2 size={14} /> Collaboration guide
            </h2>
            <pre className="scroll-thin max-h-72 flex-1 overflow-auto rounded-xl bg-slate-900 p-3 text-[11px] leading-relaxed whitespace-pre-wrap text-emerald-100">
              {guide}
            </pre>
            <button onClick={copyGuide} className="btn-soft mt-3 justify-center">
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy the guide'}
            </button>
          </section>
        </motion.div>
      )}
    </div>
  )
}
