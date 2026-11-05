import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CHAPTERS, INTERLUDES } from './data/chapters.js'
import { STYLES } from './data/styles.js'
import {
  analyseRun,
  applyOption,
  buildHabits,
  clamp,
  evaluateBadges,
  loadStore,
  newRun,
  saveStore,
  scoreCustomAction,
} from './lib/engine.js'
import TitleScreen from './components/TitleScreen.jsx'
import SetupScreen from './components/SetupScreen.jsx'
import GameScreen from './components/GameScreen.jsx'
import Interlude from './components/Interlude.jsx'
import GameOver from './components/GameOver.jsx'
import Results from './components/Results.jsx'
import Castle from './components/Castle.jsx'
import Debrief from './components/Debrief.jsx'

const CUSTOM_LINES = {
  affiliative: 'exhales, and the shoulders in the room drop about an inch. "…Okay. That actually helps."',
  pacesetting: 'nods once, already moving. "Good. I\'ll get it done tonight."',
  coaching: 'pauses, then asks: "Wait — can we actually do it that way?"',
  democratic: 'looks around the room. "So we\'re deciding this one together, then."',
  commanding: 'writes it down without looking up. "Fine. Done."',
  visionary: 'straightens up. "Right. That\'s why we\'re doing any of this."',
}

export default function App() {
  const [store, setStore] = useState(() => loadStore())
  const [screen, setScreen] = useState('title')
  const [run, setRun] = useState(null)
  const [newBadges, setNewBadges] = useState([])
  // Which chapter is on screen. Kept separate from run.index so the consequence
  // reveal stays visible until the player chooses to move on.
  const [viewId, setViewId] = useState(1)

  useEffect(() => {
    saveStore(store)
  }, [store])

  const analysis = useMemo(
    () => (store.lastRun?.analysis ? store.lastRun.analysis : null),
    [store.lastRun],
  )

  const habits = useMemo(() => buildHabits(analysis || { dominant: 'coaching', blindSpot: 'visionary' }), [analysis])

  // Records the run, awards badges, and (unless the caller wants the reaction
  // reveal first) moves to the results or game-over screen.
  const finish = useCallback(
    (finishedRun, { showNow = true } = {}) => {
      const result = analyseRun(finishedRun)
      const earnedNow = evaluateBadges(finishedRun, result, { previousFailures: store.failures })
      setNewBadges(earnedNow.filter((b) => !store.badges.includes(b)))
      setStore((s) => ({
        ...s,
        profile: s.profile || { name: finishedRun.name, avatar: finishedRun.avatar, archetype: finishedRun.archetype },
        badges: Array.from(new Set([...s.badges, ...earnedNow])),
        runs: s.runs + 1,
        failures: s.failures + (finishedRun.outcome === 'complete' ? 0 : 1),
        lastRun: { ...finishedRun, analysis: result },
      }))
      setRun(finishedRun)
      if (showNow) setScreen(finishedRun.outcome === 'complete' ? 'results' : 'gameover')
    },
    [store.badges, store.failures],
  )

  const handleChoose = useCallback(
    (choice, meta) => {
      const chapter = CHAPTERS[Math.min(viewId, CHAPTERS.length) - 1]
      if (!chapter) return

      let option = choice

      if (choice.__custom) {
        const read = scoreCustomAction(choice.text)
        const focusId = chapter.focus
        const focusName = { alex: 'Alex', sam: 'Sam', taylor: 'Taylor', jordan: 'Jordan' }[focusId]
        option = {
          id: 'custom',
          custom: true,
          style: read.style,
          text: choice.text,
          effect: read.effect,
          confidence: read.confidence,
          note: read.note,
          insight: `You wrote your own move — the room read it as ${STYLES[read.style].label}. ${STYLES[read.style].blurb}`,
          reaction: { speaker: focusName, line: `${focusName} ${CUSTOM_LINES[read.style]}` },
          trust: { [focusId]: read.style === 'commanding' ? 0 : 1 },
        }
      }

      const next = applyOption(run, chapter, option, meta)
      setRun(next)
      // A fatal or final choice still gets its reaction reveal on the chapter
      // screen; the screen change happens on Continue.
      if (next.outcome !== 'active') finish(next, { showNow: false })
    },
    [run, finish, viewId],
  )

  const handleAdvance = useCallback(() => {
    if (!run) return
    if (run.outcome !== 'active') {
      if (run.outcome === 'complete') {
        // The results screen needs the analysis that finish() already stored.
        setRun((r) => ({ ...r, analysis: analyseRun(r) }))
        setScreen('results')
      } else {
        setScreen('gameover')
      }
      return
    }

    const completedId = run.index // ids are 1-based, index now points past the chapter
    setViewId(Math.min(completedId + 1, CHAPTERS.length))
    const interlude = INTERLUDES[completedId]
    if (interlude) {
      setRun((r) => ({ ...r, energy: clamp(r.energy + interlude.energy) }))
      setScreen('interlude')
      return
    }
    setScreen('chapter')
  }, [run])

  const begin = (profile) => {
    const fresh = newRun(profile)
    setRun(fresh)
    setNewBadges([])
    setViewId(1)
    setStore((s) => ({ ...s, profile }))
    setScreen('chapter')
  }

  const retry = () => {
    const profile = store.profile || { name: run?.name || 'You', avatar: run?.avatar || '🙂', archetype: run?.archetype || 'dreamer' }
    begin(profile)
  }

  const toggleHabit = (id) => {
    setStore((s) => {
      const checked = { ...s.checked }
      if (checked[id]) delete checked[id]
      else checked[id] = true
      return { ...s, checked }
    })
  }

  const resetHabits = () => setStore((s) => ({ ...s, checked: {} }))

  const chapter = CHAPTERS[Math.min(Math.max(viewId, 1), CHAPTERS.length) - 1]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="min-h-screen"
      >
        {screen === 'title' && (
          <TitleScreen store={store} onStart={() => setScreen('setup')} onDebrief={() => setScreen('debrief')} />
        )}

        {screen === 'setup' && (
          <SetupScreen initial={store.profile} onBack={() => setScreen('title')} onBegin={begin} />
        )}

        {screen === 'chapter' && run && (
          <GameScreen
            chapter={chapter}
            run={run}
            onChoose={handleChoose}
            onAdvance={handleAdvance}
          />
        )}

        {screen === 'interlude' && run && (
          <Interlude data={INTERLUDES[run.index]} run={run} onContinue={() => setScreen('chapter')} />
        )}

        {screen === 'gameover' && run && (
          <GameOver run={run} onRetry={retry} onHome={() => setScreen('title')} />
        )}

        {screen === 'results' && run && (
          <Results
            run={run}
            analysis={run.analysis || analyseRun(run)}
            newBadges={newBadges}
            store={store}
            onCastle={() => setScreen('castle')}
            onDebrief={() => setScreen('debrief')}
            onReplay={retry}
            onHome={() => setScreen('title')}
          />
        )}

        {screen === 'castle' && (
          <Castle
            habits={habits}
            checked={store.checked}
            onToggle={toggleHabit}
            onReset={resetHabits}
            hasResults={Boolean(store.lastRun)}
            onBack={() => setScreen(store.lastRun ? 'results' : 'title')}
            onDebrief={() => setScreen('debrief')}
          />
        )}

        {screen === 'debrief' && (
          <Debrief
            lastRun={store.lastRun}
            lastAnalysis={analysis}
            onBack={() => setScreen(store.lastRun ? 'results' : 'title')}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
