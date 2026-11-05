# Team Quest: The Semester

A 12-minute leadership simulator. Nine weeks, one Campus Innovation Showcase, four teammates who
remember everything you do. Built with React + Vite + Tailwind CSS, Framer Motion and Recharts.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## What's in it

**One continuous semester.** Chapters 1–9 run in order, each with a scene, dialogue, four written
options and one "type your own action" field. The four options are tagged to Goleman styles but the
tag is hidden until you commit.

**Persistent meters.** Rapport starts at 70%, Energy at 60% (an archetype shifts them slightly).
Every choice moves both. Rapport at 0 ends in *Team Revolt*, Energy at 0 in *Leader Burnout* — each
with its own ending text. Two interludes (after chapters 3 and 6) restore 12 Energy, which is what
keeps a careful player alive to the finale.

**Shadow Decision Timer.** Time-to-decision is recorded silently. Anything over 45 seconds becomes a
"Hesitation Point" in the results, paired with a scenario-specific reflection question.

**Consequences that speak.** Each choice has an in-character reaction and a one-line teaching note,
plus a per-character trust score that changes the interlude text and the results screen.

**Endgame analytics.** Goleman radar chart, style breakdown, blind spot with habits, hesitation
points, situational-fit score, final team relationships and badges.

**Try This Next + Campus Castle.** Six real-world habits generated from your blind spot and your
strength. Ticking them off upgrades a hand-drawn SVG castle through seven stages. State persists in
`localStorage`.

**Team Debrief Room.** Add yourself from your last run, paste a teammate's JSON export, simulate a
profile with sliders, or load the demo cast. The room overlays every member's radar, detects style
clashes with specific advice, flags a team blind spot, and writes a copyable collaboration guide.

**Badges.** The Lone Wolf, The Dictator, The Diplomat, Goleman Master, plus The Anchor and Comeback
Kid.

## Structure

```
src/
  App.jsx                 screen flow, run lifecycle, persistence
  lib/engine.js           scoring, custom-action reading, analysis, badges, castle, export/import
  data/chapters.js        9 chapters: scenes, dialogue, options, reactions
  data/styles.js          the six Goleman styles, archetypes, cast profiles
  components/
    GameScreen.jsx        scene, choices, timer, consequence reveal
    Results.jsx           radar, breakdown, blind spot, hesitation, badges
    Debrief.jsx           overlay radar, clash detection, collaboration guide
    Castle.jsx            habit checklist + upgrade SVG
    TitleScreen.jsx / SetupScreen.jsx / Interlude.jsx / GameOver.jsx
    Avatar.jsx / Meter.jsx / RadarPanel.jsx
```

## Deliberate decisions

- **Six styles, four options per chapter.** The source script only used four styles, which would
  have left two radar axes permanently at 0%. Chapters 3 and 9 now offer a Visionary option and
  chapters 2, 5 and 8 a Democratic one, so all six are reachable and each chapter still offers
  Commanding.
- **"Type your own action" is scored locally.** There is no API key and no backend, so free text is
  read by a deterministic keyword model in `lib/engine.js` (style signal + confidence), then given
  scaled effects. It is a fallback scorer, not an LLM.
- **The Debrief Room is local by design.** No server, so teammates merge via pasted export JSON,
  manual sliders, or the demo cast. Nothing leaves the browser.
- **Progress is local.** `localStorage` holds your profile, badge shelf, castle ticks and last run;
  clear site data to start completely fresh.
