// Goleman's six leadership styles, styled for the game.
// `hex` is the single source of truth — Tailwind arbitrary values and Recharts both read it.

export const STYLES = {
  affiliative: {
    id: 'affiliative',
    label: 'Affiliative',
    tag: 'People first',
    hex: '#ec4899',
    soft: '#fce7f3',
    blurb: 'Builds harmony and trust. Great in a storm, dangerous as a default.',
    blindSpot: 'Comfort can quietly protect people from the feedback they need.',
    habits: [
      'Check in with one teammate about how they are, not what they shipped.',
      'Say thank you with a specific detail, not a generic "great job".',
    ],
  },
  pacesetting: {
    id: 'pacesetting',
    label: 'Pacesetting',
    tag: 'Do it excellently, now',
    hex: '#f59e0b',
    soft: '#fef3c7',
    blurb: 'Sets a blistering standard and models it. Fast, but it burns people out.',
    blindSpot: 'When you take over, the team learns to wait for you instead of growing.',
    habits: [
      'Ship one thing at 80% instead of 100% and let someone else finish it.',
      'Hand a task back with a clear standard, not a rewrite.',
    ],
  },
  coaching: {
    id: 'coaching',
    label: 'Coaching',
    tag: 'Grow the person',
    hex: '#10b981',
    soft: '#d1fae5',
    blurb: 'Develops capacity for the long game. Slower today, compounding tomorrow.',
    blindSpot: 'Endless development without a decision can look like avoidance.',
    habits: [
      'Ask "what would you do?" before offering your answer.',
      'Turn one correction into a five-minute skill demo.',
    ],
  },
  democratic: {
    id: 'democratic',
    label: 'Democratic',
    tag: 'Everyone has a voice',
    hex: '#3b82f6',
    soft: '#dbeafe',
    blurb: 'Collects input and buys real ownership. Needs a decision at the end.',
    blindSpot: 'Consensus is not the same thing as a decision. Someone still has to call it.',
    habits: [
      'Run a two-minute round-robin: every voice, once, before you decide.',
      'Write the decision down and name who owns it.',
    ],
  },
  commanding: {
    id: 'commanding',
    label: 'Commanding',
    tag: 'Clear, firm, now',
    hex: '#ef4444',
    soft: '#fee2e2',
    blurb: 'Cuts through chaos instantly. Cheap in energy, expensive in trust.',
    blindSpot: 'Compliance is not commitment. Silence after an order is not agreement.',
    habits: [
      'When you must direct, explain the why in one sentence.',
      'Ask "what am I missing?" right after you give a hard instruction.',
    ],
  },
  visionary: {
    id: 'visionary',
    label: 'Visionary',
    tag: 'Here is where we are going',
    hex: '#8b5cf6',
    soft: '#ede9fe',
    blurb: 'Moves people with meaning. Powerful — unless the vision hides the workload.',
    blindSpot: 'Big picture enthusiasm can steamroll the people carrying the details.',
    habits: [
      'Open a meeting with the why, then hand out the who.',
      'Ask each person to name their part of the vision in their own words.',
    ],
  },
}

export const STYLE_ORDER = ['commanding', 'visionary', 'affiliative', 'democratic', 'pacesetting', 'coaching']

export const ARCHETYPES = [
  {
    id: 'dreamer',
    name: 'The Dreamer',
    emoji: '🌙',
    leans: 'affiliative',
    tagline: 'Leads with warmth and possibility.',
    blurb: 'You feel the team before you read the burndown chart. Starts with extra rapport.',
    bonus: { rapport: 8, energy: 0 },
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    emoji: '♟️',
    leans: 'visionary',
    tagline: 'Always three moves ahead.',
    blurb: 'You see the whole semester at once. Starts with extra energy and a little less warmth.',
    bonus: { rapport: -4, energy: 12 },
  },
  {
    id: 'go-getter',
    name: 'The Go-Getter',
    emoji: '⚡',
    leans: 'pacesetting',
    tagline: 'Momentum is a personality.',
    blurb: 'You would rather ship and apologise than wait. Starts with energy, spends rapport.',
    bonus: { rapport: -6, energy: 14 },
  },
  {
    id: 'connector',
    name: 'The Connector',
    emoji: '🫶',
    leans: 'democratic',
    tagline: 'Every room is a network.',
    blurb: 'You collect people and their input. Starts balanced and slightly trusted.',
    bonus: { rapport: 6, energy: 4 },
  },
]

export const CAST = {
  alex: {
    id: 'alex',
    name: 'Alex',
    role: 'Overstretched co-founder',
    emoji: '🧋',
    hex: '#c4b5fd',
    accent: '#7c3aed',
    bio: 'Passionate, loyal, idealistic. Perfectionist who cannot say no, buckling under outside pressure.',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    role: 'Design lead',
    emoji: '✏️',
    hex: '#fca5a5',
    accent: '#ef4444',
    bio: 'High-energy, opinionated, fiercely creative. Loves big pivots, hates slow consensus.',
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor',
    role: 'Methodical researcher',
    emoji: '📊',
    hex: '#7dd3fc',
    accent: '#0284c7',
    bio: 'Analytical and thorough. Protective of process. Demands evidence over gut feelings.',
  },
  jordan: {
    id: 'jordan',
    name: 'Jordan',
    role: 'Disengaged engineer',
    emoji: '🎧',
    hex: '#94a3b8',
    accent: '#334155',
    bio: 'Brilliantly technical, introverted, cynical about meetings. Checks out when the room lacks structure.',
  },
}
