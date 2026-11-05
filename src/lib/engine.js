import { CHAPTERS } from '../data/chapters.js'
import { STYLES, STYLE_ORDER } from '../data/styles.js'
import { ARCHETYPES } from '../data/styles.js'

export const START = { rapport: 70, energy: 60 }
export const CAST_IDS = ['alex', 'sam', 'taylor', 'jordan']
export const HESITATION_SECONDS = 45

export const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)))

export function newRun({ name, avatar, archetype }) {
  const arch = ARCHETYPES.find((a) => a.id === archetype) || ARCHETYPES[0]
  return {
    id: `run-${Date.now()}`,
    name: name?.trim() || 'You',
    avatar: avatar || arch.emoji,
    archetype: arch.id,
    rapport: clamp(START.rapport + (arch.bonus?.rapport || 0)),
    energy: clamp(START.energy + (arch.bonus?.energy || 0)),
    trust: { alex: 5, sam: 5, taylor: 5, jordan: 5 },
    index: 0,
    act: 1,
    log: [],
    outcome: 'active',
    startedAt: new Date().toISOString(),
    finishedAt: null,
  }
}

/* ------------------------------------------------------------------ */
/* Custom "type your own action" evaluation                            */
/* ------------------------------------------------------------------ */

const KEYWORDS = {
  coaching: {
    words: ['coach', 'teach', 'mentor', 'help', 'learn', 'develop', 'guide', 'train', 'practice', 'pair up', 'skill', 'grow', 'ask them', 'support', 'checklist', 'rebuild', 'walk through', 'figure out', 'co-create'],
    base: { rapport: 9, energy: -7 },
  },
  commanding: {
    words: ['tell', 'order', 'must', 'demand', 'require', 'enforce', 'rule', 'immediately', 'deadline', 'decide', 'direct', 'no exceptions', 'ban', 'hand over'],
    base: { rapport: -8, energy: 0 },
  },
  democratic: {
    words: ['vote', 'everyone', 'consensus', 'input', 'together', 'discuss', 'poll', 'we decide', 'collect', 'round', 'ask the team', 'whiteboard', 'brainstorm'],
    base: { rapport: 8, energy: -8 },
  },
  affiliative: {
    words: ['care', 'feel', 'coffee', 'listen', 'relationship', 'wellbeing', 'kind', 'reassure', 'trust', 'check in', 'empathy', 'apolog', 'support'],
    base: { rapport: 5, energy: -8 },
  },
  pacesetting: {
    words: ['myself', 'i will do', 'take over', 'fast', 'sprint', 'push', 'standard', 'fix it', 'faster', 'ship', 'overnight', 'hustle', 'high performer'],
    base: { rapport: -8, energy: -14 },
  },
  visionary: {
    words: ['vision', 'why', 'bigger', 'future', 'inspire', 'story', 'mission', 'purpose', 'showcase', 'meaning', 'picture', 'semester', 'next time'],
    base: { rapport: 7, energy: -9 },
  },
}

/**
 * Local, deterministic read of a free-text action.
 * Not an LLM: it scores style-signalling language and picks the strongest match.
 */
export function scoreCustomAction(text) {
  const clean = (text || '').toLowerCase().trim()
  const scores = Object.fromEntries(STYLE_ORDER.map((s) => [s, 0]))

  for (const [style, { words }] of Object.entries(KEYWORDS)) {
    for (const w of words) {
      if (clean.includes(w)) scores[style] += w.includes(' ') ? 2 : 1
    }
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [bestStyle, bestScore] = ranked[0]
  const second = ranked[1][1]

  if (bestScore === 0) {
    return {
      style: 'coaching',
      confidence: 0.25,
      effect: { rapport: 2, energy: -5 },
      note: "Your action didn't signal a clear style, so the team read it as a tentative coaching move. Try naming the behaviour you want.",
      matched: [],
    }
  }

  const confidence = Math.min(1, 0.55 + bestScore * 0.12 + (bestScore - second) * 0.1)
  const base = KEYWORDS[bestStyle].base
  const scale = 0.6 + confidence * 0.4

  return {
    style: bestStyle,
    confidence,
    effect: {
      rapport: Math.round(base.rapport * scale),
      energy: Math.round(base.energy * scale),
    },
    note: `The room reads your words as ${STYLES[bestStyle].label.toLowerCase()} leadership.`,
    matched: KEYWORDS[bestStyle].words.filter((w) => clean.includes(w)),
  }
}

/* ------------------------------------------------------------------ */
/* Applying a decision                                                 */
/* ------------------------------------------------------------------ */

export function applyOption(run, chapter, option, meta = {}) {
  const effect = option.effect
  const rapport = clamp(run.rapport + effect.rapport)
  const energy = clamp(run.energy + effect.energy)

  const trust = { ...run.trust }
  for (const [who, delta] of Object.entries(option.trust || {})) {
    if (who in trust) trust[who] = clamp(trust[who] + delta, 0, 10)
  }

  const logEntry = {
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    week: chapter.week,
    optionId: option.id,
    style: option.style,
    text: option.text,
    custom: Boolean(option.custom || meta.custom),
    seconds: Math.round(meta.seconds || 0),
    hovered: meta.hovered || null,
    rapportDelta: effect.rapport,
    energyDelta: effect.energy,
    rapportAfter: rapport,
    energyAfter: energy,
    note: option.note || null,
    reaction: option.reaction || null,
    insight: option.insight || null,
    confidence: option.confidence || null,
    bestFit: chapter.bestFit.includes(option.style),
  }

  let outcome = 'active'
  if (rapport <= 0) outcome = 'revolt'
  else if (energy <= 0) outcome = 'burnout'

  const nextIndex = run.index + 1
  if (outcome === 'active' && nextIndex >= CHAPTERS.length) outcome = 'complete'

  return {
    ...run,
    rapport,
    energy,
    trust,
    log: [...run.log, logEntry],
    index: nextIndex,
    outcome,
    finishedAt: outcome === 'active' ? null : new Date().toISOString(),
  }
}

/* ------------------------------------------------------------------ */
/* Analysis                                                            */
/* ------------------------------------------------------------------ */

export function analyseRun(run) {
  const log = run.log || []
  const counts = Object.fromEntries(STYLE_ORDER.map((s) => [s, 0]))
  for (const entry of log) counts[entry.style] = (counts[entry.style] || 0) + 1

  const total = log.length || 1
  const raw = Object.fromEntries(STYLE_ORDER.map((s) => [s, Math.round((counts[s] / total) * 100)]))
  // keep the radar honest: force the rounded values to sum to 100
  const drift = 100 - Object.values(raw).reduce((a, b) => a + b, 0)
  if (drift !== 0) {
    const top = STYLE_ORDER.reduce((a, b) => (raw[a] >= raw[b] ? a : b))
    raw[top] += drift
  }

  const ranked = [...STYLE_ORDER].sort((a, b) => raw[b] - raw[a])
  const dominant = ranked[0]
  const secondary = ranked[1]
  const zero = STYLE_ORDER.filter((s) => counts[s] === 0)
  const blindSpot = zero.length ? zero.sort((a, b) => raw[a] - raw[b])[0] : ranked[ranked.length - 1]

  const hesitation = log
    .filter((e) => e.seconds >= HESITATION_SECONDS)
    .map((e) => ({
      ...e,
      prompt:
        CHAPTERS.find((c) => c.id === e.chapterId)?.hesitationPrompt ||
        'What made this decision expensive for you?',
    }))

  const fitCount = log.filter((e) => e.bestFit).length
  const avgSeconds = log.length ? Math.round(log.reduce((a, e) => a + e.seconds, 0) / log.length) : 0

  const energySpent = log.length
    ? Math.round(log.reduce((a, e) => a + Math.abs(Math.min(0, e.energyDelta)), 0) / log.length)
    : 0

  const rapportCost = log.length
    ? Math.round(log.reduce((a, e) => a + Math.min(0, e.rapportDelta), 0) / log.length)
    : 0

  return {
    counts,
    pct: raw,
    total: log.length,
    dominant,
    secondary,
    blindSpot,
    hesitation,
    fitCount,
    fitPct: Math.round((fitCount / CHAPTERS.length) * 100),
    avgSeconds,
    energySpent,
    rapportCost,
    balanced: Object.values(raw).filter((v) => v >= 10).length >= 4,
    trust: run.trust,
    survived: run.outcome === 'complete',
  }
}

export function leadershipTitle(analysis) {
  const { dominant, secondary, balanced, fitPct } = analysis
  if (balanced && fitPct >= 60) return 'The Situational Leader'
  const pairs = {
    'coaching-affiliative': 'The Player-Coach',
    'coaching-democratic': 'The Facilitator',
    'coaching-visionary': 'The Mentor with a Map',
    'commanding-pacesetting': 'The Hard Charger',
    'commanding-visionary': 'The Founder',
    'affiliative-democratic': 'The Consensus Heart',
    'pacesetting-visionary': 'The Sprint Architect',
    'pacesetting-coaching': 'The Demanding Developer',
    'visionary-democratic': 'The Coalition Builder',
    'affiliative-commanding': 'The Warm Enforcer',
  }
  return (
    pairs[`${dominant}-${secondary}`] ||
    pairs[`${secondary}-${dominant}`] ||
    `The ${STYLES[dominant].label} Lead`
  )
}

/* ------------------------------------------------------------------ */
/* Badges                                                             */
/* ------------------------------------------------------------------ */

export const BADGES = [
  {
    id: 'lone-wolf',
    name: 'The Lone Wolf',
    emoji: '🐺',
    desc: 'Chose Pacesetting three decisions in a row.',
    test: (run) => {
      let streak = 0
      for (const e of run.log) {
        streak = e.style === 'pacesetting' ? streak + 1 : 0
        if (streak >= 3) return true
      }
      return false
    },
  },
  {
    id: 'dictator',
    name: 'The Dictator',
    emoji: '👑',
    desc: 'Resolved every single situation with pure Commanding energy.',
    test: (run) => run.log.length >= 5 && run.log.every((e) => e.style === 'commanding'),
  },
  {
    id: 'diplomat',
    name: 'The Diplomat',
    emoji: '🕊️',
    desc: 'Six or more Affiliative choices, and never once commanded the room.',
    test: (run) =>
      run.log.filter((e) => e.style === 'affiliative').length >= 6 &&
      !run.log.some((e) => e.style === 'commanding'),
  },
  {
    id: 'goleman-master',
    name: 'Goleman Master',
    emoji: '🏆',
    desc: 'Finished the semester choosing the best-fit style in at least 7 of 9 chapters.',
    test: (run) => {
      const fit = run.log.filter((e) => e.bestFit).length
      return run.outcome === 'complete' && fit >= 7
    },
  },
  {
    id: 'anchored',
    name: 'The Anchor',
    emoji: '⚓',
    desc: 'Finished the showcase with the team at 85% Rapport or better.',
    test: (run) => run.outcome === 'complete' && run.rapport >= 85,
  },
  {
    id: 'comeback',
    name: 'Comeback Kid',
    emoji: '🔥',
    desc: 'Came back after a burnout or a revolt and finished the semester anyway.',
    test: (run, _analysis, context) =>
      run.outcome === 'complete' && (context?.previousFailures || 0) > 0,
  },
]

export function evaluateBadges(run, analysis, context) {
  return BADGES.filter((b) => {
    try {
      return b.test(run, analysis, context)
    } catch {
      return false
    }
  }).map((b) => b.id)
}

/* ------------------------------------------------------------------ */
/* Habit checklist + campus castle                                     */
/* ------------------------------------------------------------------ */

const UNIVERSAL_HABITS = [
  { id: 'u1', text: 'Send one SBI note this week: Situation, Behaviour, Impact — no adjectives.', style: 'coaching' },
  { id: 'u2', text: 'End your next meeting by naming who owns what, out loud.', style: 'democratic' },
  { id: 'u3', text: 'Book a 15-minute capacity check-in with one teammate before they ask.', style: 'affiliative' },
]

export function buildHabits(analysis) {
  const blind = STYLES[analysis?.blindSpot || 'visionary']
  const dom = STYLES[analysis?.dominant || 'coaching']
  const list = [
    ...blind.habits.map((text, i) => ({ id: `${blind.id}-${i}`, text, style: blind.id, tag: 'Blind spot' })),
    ...dom.habits.slice(0, 1).map((text, i) => ({ id: `${dom.id}-${i}`, text, style: dom.id, tag: 'Your strength' })),
    ...UNIVERSAL_HABITS,
  ]
  return list.slice(0, 6)
}

export const CASTLE_STAGES = [
  { min: 0, name: 'Duct-tape tent', note: 'One bad gust from collapse. Very on brand for week two.' },
  { min: 1, name: 'Club-room cottage', note: 'A roof, a desk, and one functioning power strip.' },
  { min: 2, name: 'First-year keep', note: 'Stone walls. A door that closes. People stay longer.' },
  { min: 3, name: 'Walled workshop', note: 'Turrets under construction. The team has a rhythm now.' },
  { min: 4, name: 'Turreted hall', note: 'Banners up. Someone finally wrote the documentation.' },
  { min: 5, name: 'Campus castle', note: 'It has a name, a schedule, and a bench outside for hard conversations.' },
  { min: 6, name: 'Fortress of habits', note: 'Fully upgraded. This is not luck. This is a system.' },
]

export function castleStage(checkedCount) {
  return [...CASTLE_STAGES].reverse().find((s) => checkedCount >= s.min) || CASTLE_STAGES[0]
}

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

const KEY = 'teamquest.v1'

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { profile: null, badges: [], checked: {}, lastRun: null, failures: 0, runs: 0 }
    const parsed = JSON.parse(raw)
    return {
      profile: parsed.profile || null,
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      checked: parsed.checked && typeof parsed.checked === 'object' ? parsed.checked : {},
      lastRun: parsed.lastRun || null,
      failures: Number(parsed.failures) || 0,
      runs: Number(parsed.runs) || 0,
    }
  } catch {
    return { profile: null, badges: [], checked: {}, lastRun: null, failures: 0, runs: 0 }
  }
}

export function saveStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* storage full or blocked — the run still works in memory */
  }
}

/* ------------------------------------------------------------------ */
/* Share / import                                                      */
/* ------------------------------------------------------------------ */

export function exportRun(run, analysis) {
  const payload = {
    v: 1,
    app: 'team-quest',
    name: run.name,
    archetype: run.archetype,
    rapport: run.rapport,
    energy: run.energy,
    outcome: run.outcome,
    pct: analysis.pct,
    dominant: analysis.dominant,
    secondary: analysis.secondary,
    trust: run.trust,
    log: run.log.map((e) => ({ c: e.chapterId, s: e.style, t: e.seconds })),
  }
  return JSON.stringify(payload)
}

export function parseImport(text) {
  const trimmed = (text || '').trim()
  if (!trimmed) throw new Error('Paste a Team Quest export first.')
  let data
  try {
    data = JSON.parse(trimmed)
  } catch {
    throw new Error("That isn't valid JSON. Paste the full exported block, quotes and all.")
  }
  if (data.app !== 'team-quest' || !data.pct) {
    throw new Error("This JSON isn't a Team Quest export.")
  }
  const pct = {}
  for (const style of STYLE_ORDER) pct[style] = clamp(Number(data.pct[style]) || 0)
  return {
    name: String(data.name || 'Teammate').slice(0, 24),
    archetype: data.archetype || 'dreamer',
    pct,
    rapport: clamp(Number(data.rapport) || 0),
    energy: clamp(Number(data.energy) || 0),
    outcome: data.outcome || 'complete',
  }
}
