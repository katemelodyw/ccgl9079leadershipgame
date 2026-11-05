// Nine chapters, one continuous semester.
// Every option is secretly mapped to a Goleman style; the UI reveals it only after the choice.

export const CHAPTERS = [
  {
    id: 1,
    week: 'Week 2',
    act: 'Act I · Kickoff',
    title: 'The Missed Commitment',
    focus: 'alex',
    location: 'Club room · 9:40 PM',
    scene:
      'The sponsor deck gates Friday\'s funding review. Alex has been "almost done" for three days. The club room smells like burnt coffee and panic.',
    beats: [
      {
        speaker: 'Alex',
        line:
          "I'm so sorry… I know the sponsor deck was due tonight, but with my midterms and family stuff, I just couldn't finish it.",
      },
      {
        speaker: 'You',
        line: 'Alex, the funding review is Friday. What do we do?',
      },
    ],
    prompt: 'The clock is not going to move. What do you do?',
    bestFit: ['coaching'],
    hesitationPrompt:
      'Why did choosing between an Affiliative check-in and a Pacesetting takeover feel so difficult here?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text:
          "Take over Alex's tasks quietly so they don't feel stressed, and offer to talk over coffee later.",
        effect: { rapport: 5, energy: -25 },
        trust: { alex: 3, sam: 0, taylor: -1, jordan: 0 },
        reaction: {
          speaker: 'Alex',
          line: "You'd… actually do that? I owe you. I'll make it up to you, I promise.",
        },
        insight:
          'You bought Alex a night and bought yourself a second job. Care without a boundary becomes a private rescue mission.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text:
          'Reassign their tasks to yourself or another high-performer immediately so the schedule holds.',
        effect: { rapport: -15, energy: -10 },
        trust: { alex: -3, sam: 0, taylor: 2, jordan: 0 },
        reaction: {
          speaker: 'Alex',
          line: 'Right. Of course. I\'ll just… send over the files, then.',
        },
        insight:
          'The deck ships. Alex learns that being unreliable gets their work taken away — and that you trust them slightly less each time.',
      },
      {
        id: 'c',
        style: 'coaching',
        text:
          'Sit down with Alex for 15 minutes to co-create a smaller checkpoint they can actually hit.',
        effect: { rapport: 10, energy: -5 },
        trust: { alex: 2, sam: 0, taylor: 1, jordan: 0 },
        reaction: {
          speaker: 'Alex',
          line:
            'Okay. Smaller. Three slides by midnight, then the budget table tomorrow. I can do smaller.',
        },
        insight:
          'You shrank the task instead of the person. The checkpoint is real, and so is the trust.',
      },
      {
        id: 'd',
        style: 'commanding',
        text:
          'Set a firm boundary: uncompleted tasks must be handed over today, no exceptions.',
        effect: { rapport: -10, energy: 0 },
        trust: { alex: -2, sam: 0, taylor: 2, jordan: 0 },
        reaction: {
          speaker: 'Alex',
          line: "Fine. Handed over. Are we done here?",
        },
        insight:
          'The boundary is clear and the work is safe. The relationship is now a transaction, and Alex knows it.',
      },
    ],
  },
  {
    id: 2,
    week: 'Week 4',
    act: 'Act I · Kickoff',
    title: 'The Ideation Stalemate',
    focus: 'sam',
    location: 'Design lab · 2:15 PM',
    scene:
      'Two whiteboards, three product ideas, zero decisions. The prototype deadline is today and the room has stopped being polite.',
    beats: [
      {
        speaker: 'Sam',
        line:
          "An eco-tracker app is pointless! Nobody downloads another carbon app. We pivot to the campus food-sharing marketplace — today.",
      },
      {
        speaker: 'Taylor',
        line:
          "Are you kidding, Sam? We spent three weeks researching health tech. You can't pivot on a feeling.",
      },
      { speaker: 'Sam', line: "You're the lead. Make a call right now." },
    ],
    prompt: 'Three weeks of work, one afternoon to decide. Make the call.',
    bestFit: ['coaching', 'democratic'],
    hesitationPrompt:
      'What were you actually afraid of losing — the research, the team, or the right to be the one who decides?',
    options: [
      {
        id: 'a',
        style: 'democratic',
        text:
          'Facilitate a compromise combining elements of everyone\'s ideas so nobody leaves the room unheard.',
        effect: { rapport: 10, energy: -10 },
        trust: { sam: 1, taylor: 1, alex: 1, jordan: -1 },
        reaction: {
          speaker: 'Taylor',
          line: "It's a franken-product. But it's our franken-product, I guess.",
        },
        insight:
          'Everyone owns a piece. Nobody owns the whole. Inclusive process is not the same as a sharp product.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text:
          'Pick the strongest option yourself right now so the team can start building.',
        effect: { rapport: -10, energy: -15 },
        trust: { sam: -1, taylor: -2, alex: -1, jordan: 1 },
        reaction: {
          speaker: 'Taylor',
          line: 'Noted. I\'ll log that three weeks of research was a vibe check.',
        },
        insight:
          'Speed arrived immediately. So did the quiet resentment of two people who were not consulted.',
      },
      {
        id: 'c',
        style: 'coaching',
        text:
          'Guide the team through a quick matrix evaluation against your core criteria, and let them land the choice.',
        effect: { rapport: 15, energy: -5 },
        trust: { sam: 2, taylor: 2, alex: 1, jordan: 1 },
        reaction: {
          speaker: 'Sam',
          line:
            "…Fine. The marketplace scores higher on retention. I hate that the matrix is right.",
        },
        insight:
          'They argued, scored, and decided in nineteen minutes. The matrix is a tool; ownership is the real output.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Call an end to the debate and select the final design direction yourself.',
        effect: { rapport: -5, energy: 0 },
        trust: { sam: -2, taylor: -1, alex: 0, jordan: 0 },
        reaction: {
          speaker: 'Taylor',
          line: 'Great. Direction set. Can someone tell me what the direction actually is?',
        },
        insight:
          'The stalemate broke. The ambiguity you skipped is now sitting inside the build.',
      },
    ],
  },
  {
    id: 3,
    week: 'Week 6',
    act: 'Act I · Kickoff',
    title: 'The Yes-Man Meeting',
    focus: 'jordan',
    location: 'Club room · 6:00 PM',
    scene:
      'You just presented a bold timeline acceleration: two features cut, one big sprint added. The room agreed instantly. That is the problem.',
    beats: [
      { speaker: 'You', line: "So… that's the plan for the next sprint. Any objections?" },
      {
        speaker: 'Narrator',
        line:
          'Complete, heavy silence. Sam and Alex exchange an uneasy glance. Jordan is drawing a rectangle on their notebook. Nobody speaks.',
      },
    ],
    prompt: 'Nine seconds of silence. Do you take the win or dig into it?',
    bestFit: ['coaching', 'visionary'],
    hesitationPrompt:
      'Why is a room of nodding people harder to trust than a room of arguing people?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Accept the easy agreement and move on to keep morale peaceful.',
        effect: { rapport: 5, energy: 0 },
        trust: { alex: 1, sam: 1, taylor: -1, jordan: 1 },
        reaction: {
          speaker: 'Sam',
          line: 'Great! Love a short meeting. (Sam is already three steps out the door.)',
        },
        insight:
          'Pleasant, efficient, and wrong. The risks were in the room — they just did not survive the group mood.',
      },
      {
        id: 'b',
        style: 'visionary',
        text:
          'Re-anchor everyone in why this sprint matters, then ask each person to claim the piece they are signing up for.',
        effect: { rapport: 10, energy: -10 },
        trust: { alex: 1, sam: 1, taylor: 2, jordan: 1 },
        reaction: {
          speaker: 'Jordan',
          line:
            "(Looks up.) If we're actually doing the live demo, I want the API. Not the slides.",
        },
        insight:
          'A shared why turned a silent room into a claimed room. Vision is only real when someone volunteers for the hard part.',
      },
      {
        id: 'c',
        style: 'coaching',
        text:
          'Sit in the silence and explicitly ask the quieter members what risks they see.',
        effect: { rapport: 10, energy: -10 },
        trust: { alex: 1, sam: 0, taylor: 2, jordan: 3 },
        reaction: {
          speaker: 'Taylor',
          line:
            "Since you asked: there is no way one sprint covers the integration AND the venue kit. Someone's going to notice on week nine.",
        },
        insight:
          'You paid for that answer with twelve uncomfortable seconds. It was the cheapest thing you bought all semester.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Dictate the next steps decisively to break the awkward silence.',
        effect: { rapport: -10, energy: 0 },
        trust: { alex: 0, sam: -1, taylor: -1, jordan: -3 },
        reaction: {
          speaker: 'Jordan',
          line: '(Puts their headphones back on mid-sentence.)',
        },
        insight:
          'You filled the silence. The silence was information, and now it has filed itself away.',
      },
    ],
  },
  {
    id: 4,
    week: 'Week 8',
    act: 'Act II · The Grind',
    title: 'The Disengaged Teammate',
    focus: 'jordan',
    location: 'Study room 2B · 4:30 PM',
    scene:
      'Full-team check-in. Jordan is slouched so low they are almost horizontal, phone in hand, while the backend review runs on the projector.',
    beats: [
      { speaker: 'You', line: 'Jordan, did you catch the milestone update for the database integration?' },
      {
        speaker: 'Jordan',
        line:
          'Oh, yeah, totally. Whatever the group decides is fine by me.',
      },
      { speaker: 'Narrator', line: 'The rest of the team groans softly. Sam mouths a word at you.' },
    ],
    prompt: 'Jordan just excused themselves from their own project. Respond.',
    bestFit: ['coaching'],
    hesitationPrompt:
      'Were you avoiding the conversation, or avoiding finding out what Jordan really thinks of the project?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Check in with Jordan privately over coffee after the meeting.',
        effect: { rapport: 10, energy: -10 },
        trust: { alex: 0, sam: 0, taylor: 0, jordan: 3 },
        reaction: {
          speaker: 'Jordan',
          line:
            'Nobody has asked me what I think since week three. It\'s… honestly not about the phone.',
        },
        insight:
          'You found the real blocker in eleven minutes. It was never technical.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text: 'Take over their portion of work to guarantee quality control.',
        effect: { rapport: -15, energy: -20 },
        trust: { alex: -1, sam: -1, taylor: -2, jordan: 1 },
        reaction: {
          speaker: 'Jordan',
          line: "Cool. Less for me, then. Ping me when it's done.",
        },
        insight:
          'You shipped Jordan\'s work and taught them that disengaging is a valid workload strategy.',
      },
      {
        id: 'c',
        style: 'coaching',
        text:
          'Re-engage them by asking for their technical expertise on the core architecture problem.',
        effect: { rapport: 15, energy: -5 },
        trust: { alex: 0, sam: 1, taylor: 0, jordan: 4 },
        reaction: {
          speaker: 'Jordan',
          line:
            "(Sits up.) The cache layer is wrong. I can fix it in an hour — I just wasn't sure anyone wanted my opinion.",
        },
        insight:
          'Competence is a door. You knocked with a real problem instead of a lecture about phones.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Publicly call out their phone use and demand immediate focus.',
        effect: { rapport: -20, energy: 0 },
        trust: { alex: -1, sam: -2, taylor: -1, jordan: -5 },
        reaction: {
          speaker: 'Jordan',
          line: '(Stands up, walks out, closes the door very quietly. Somehow the quiet is worse.)',
        },
        insight:
          'The room got the message: be visibly busy, or be embarrassed. That is a performance, not a team.',
      },
    ],
  },
  {
    id: 5,
    week: 'Week 10',
    act: 'Act II · The Grind',
    title: 'The Bottleneck Subteam',
    focus: 'taylor',
    location: 'Sprint review · 11:00 AM',
    scene:
      'Subteam A is drowning in database bugs. Subteam B finished early and has been "waiting for input" for four days. Both leads are looking at you.',
    beats: [
      {
        speaker: 'Subteam A lead',
        line: "We're completely overwhelmed by the database bugs. We won't hit Thursday's test target.",
      },
      {
        speaker: 'Subteam B lead',
        line: 'Well, our design part finished weeks ago, so we\'re just… waiting around.',
      },
    ],
    prompt: 'One team is drowning and one is bored. Fix the imbalance.',
    bestFit: ['coaching', 'democratic'],
    hesitationPrompt:
      'Was the fastest fix actually a fix, or did it just make the problem your problem for a night?',
    options: [
      {
        id: 'a',
        style: 'democratic',
        text: 'Ask the team whether anyone has voluntary capacity to help Subteam A.',
        effect: { rapport: 10, energy: -5 },
        trust: { alex: 1, sam: 1, taylor: 1, jordan: 0 },
        reaction: {
          speaker: 'Sam',
          line: 'I can take the bug triage if someone else handles the pitch slides.',
        },
        insight:
          'Volunteers showed up. The person who did not raise a hand also told you something.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text: "Step in and fix Subteam A's bugs yourself through the night.",
        effect: { rapport: -10, energy: -25 },
        trust: { alex: 0, sam: -1, taylor: -1, jordan: 0 },
        reaction: {
          speaker: 'Subteam A lead',
          line: "…Okay. We'll just watch, I guess.",
        },
        insight:
          'You saved Thursday. You also proved that Subteam A does not need to learn to unblock itself.',
      },
      {
        id: 'c',
        style: 'coaching',
        text: 'Restructure the workflow and set up cross-subteam peer pairing sessions.',
        effect: { rapport: 15, energy: -10 },
        trust: { alex: 1, sam: 1, taylor: 3, jordan: 1 },
        reaction: {
          speaker: 'Taylor',
          line:
            "Pairing worked. Turns out Subteam B's test harness would have caught half of these bugs in week eight.",
        },
        insight:
          'You fixed the pipe, not just the leak. Slower this sprint, faster for every sprint after.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Order Subteam B to switch and assist Subteam A immediately.',
        effect: { rapport: -10, energy: 0 },
        trust: { alex: 0, sam: -1, taylor: -1, jordan: -1 },
        reaction: {
          speaker: 'Subteam B lead',
          line: '(Nods.) Sure. Nothing says "help" like a direct order.',
        },
        insight:
          'The bottleneck cleared. Two people did the work while resenting both you and each other.',
      },
    ],
  },
  {
    id: 6,
    week: 'Week 11',
    act: 'Act II · The Grind',
    title: 'The Peer Accountability Slip',
    focus: 'taylor',
    location: 'Science building hallway · 1:20 PM',
    scene:
      'Taylor catches you between classes, holding a tablet with a very red integration test screen.',
    beats: [
      {
        speaker: 'Taylor',
        line:
          "I couldn't finish my integration because Alex missed their component deadline again. But I didn't want to nag them or start drama.",
      },
      { speaker: 'You', line: 'Did you talk to Alex?' },
      { speaker: 'Taylor', line: "No, it's too awkward. That's your job as lead." },
    ],
    prompt: 'The third time this pattern has reached your desk instead of theirs.',
    bestFit: ['coaching'],
    hesitationPrompt:
      'Every time you absorb a peer conversation, whose job are you quietly taking over?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Smooth things over and absorb the drama yourself to protect the friendship.',
        effect: { rapport: 5, energy: -15 },
        trust: { alex: 2, sam: 0, taylor: 1, jordan: 0 },
        reaction: {
          speaker: 'Taylor',
          line: 'Thanks. I knew you would handle it. You always handle it.',
        },
        insight:
          'Peace restored. The pattern intact. Both of you just agreed to meet here again next week.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text: 'Bypass Alex and finish the integration yourself to guarantee it is perfect.',
        effect: { rapport: -15, energy: -20 },
        trust: { alex: -2, sam: -1, taylor: 1, jordan: -1 },
        reaction: {
          speaker: 'Alex',
          line: "So I'm not even in the loop on my own component now?",
        },
        insight:
          'You became the single point of failure for the thing you were trying to save.',
      },
      {
        id: 'c',
        style: 'coaching',
        text: 'Coach Taylor on how to run a constructive peer conversation with Alex.',
        effect: { rapport: 15, energy: -10 },
        trust: { alex: 1, sam: 0, taylor: 3, jordan: 1 },
        reaction: {
          speaker: 'Taylor',
          line:
            'Situation, behaviour, impact. Okay. I can say that without it being a whole thing.',
        },
        insight:
          'You handed Taylor a script instead of a rescue. The team got one more adult relationship in it.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Step in as lead and enforce strict penalties for missed deadlines.',
        effect: { rapport: -15, energy: 0 },
        trust: { alex: -4, sam: -1, taylor: 0, jordan: -1 },
        reaction: {
          speaker: 'Taylor',
          line: 'That was… a lot. He missed one deadline. Well. Four. Still.',
        },
        insight:
          'The rule is clear. The room is now scared of the rule more than committed to the project.',
      },
    ],
  },
  {
    id: 7,
    week: 'Week 12',
    act: 'Act III · The Push',
    title: 'Scope Creep',
    focus: 'sam',
    location: 'Pre-showcase rehearsal · 5:45 PM',
    scene:
      'A campus partner corners you ten minutes before the final preview. Behind them, your team is slumped at their desks.',
    beats: [
      {
        speaker: 'Campus partner',
        line:
          "Hey! Since your project is looking so great, could you also add a live Q&A panel and a printed digital brochure to the showcase event?",
      },
      {
        speaker: 'Narrator',
        line: 'You look back at four tired faces. Sam is holding a marker like it weighs ten kilograms.',
      },
    ],
    prompt: 'Two days out. Two new deliverables. Everyone is watching you.',
    bestFit: ['coaching', 'commanding'],
    hesitationPrompt:
      'Were you more afraid of disappointing the partner, or of being seen as the leader who said no?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Say yes to keep the partner happy, even though the team is exhausted.',
        effect: { rapport: 5, energy: -20 },
        trust: { alex: -1, sam: -1, taylor: -1, jordan: -1 },
        reaction: {
          speaker: 'Sam',
          line: "(Forced smile.) Great. Love it. Can't wait to design a brochure at 2 AM.",
        },
        insight:
          'The partner is delighted. Four people just learned that their exhaustion is not part of your math.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text: 'Accept the extra work and demand a heavy hustle sprint from the team.',
        effect: { rapport: -15, energy: -25 },
        trust: { alex: -2, sam: -2, taylor: -1, jordan: -2 },
        reaction: {
          speaker: 'Jordan',
          line: "I'll do it. But I'm telling you now: something else is going to break.",
        },
        insight:
          'Everything got promised because you said it faster than anyone could object.',
      },
      {
        id: 'c',
        style: 'coaching',
        text: 'Negotiate a scaled-down trade with the partner, based on what the team can actually sustain.',
        effect: { rapport: 10, energy: -5 },
        trust: { alex: 1, sam: 1, taylor: 1, jordan: 1 },
        reaction: {
          speaker: 'Campus partner',
          line:
            'A printed one-pager and a five-minute Q&A at the booth? …Honestly, that might work better anyway.',
        },
        insight:
          'You protected the team without a fight, by turning a yes/no into a trade.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Firmly decline the extra deliverables with a hard no.',
        effect: { rapport: -5, energy: 0 },
        trust: { alex: 2, sam: 2, taylor: 1, jordan: 2 },
        reaction: {
          speaker: 'Alex',
          line: '(Whispers.) Thank you. Genuinely.',
        },
        insight:
          'The team exhaled. The partner filed away a small note about how you are to work with.',
      },
    ],
  },
  {
    id: 8,
    week: 'Finale Eve',
    act: 'Act III · The Push',
    title: 'The Rushed Crisis',
    focus: 'sam',
    location: '24 hours before launch · 8:02 PM',
    scene:
      'Your phone buzzes with an emergency alert. Then Sam bursts through the door, out of breath.',
    beats: [
      {
        speaker: 'Sam',
        line:
          'The venue coordinator just emailed — main hall has a total power failure. We have to move everything to the outdoor courtyard and restructure the live hardware demo right now.',
      },
      {
        speaker: 'Narrator',
        line:
          'Four faces turn to you. The whole semester is now a single night of logistics.',
      },
    ],
    prompt: 'One night. One courtyard. No rehearsal. Lead.',
    bestFit: ['democratic', 'commanding'],
    hesitationPrompt:
      'Under real pressure, did your default style show up — or did you choose it?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Panic together and try to accommodate every chaotic request from the venue.',
        effect: { rapport: 5, energy: -20 },
        trust: { alex: 1, sam: 1, taylor: -1, jordan: 0 },
        reaction: {
          speaker: 'Taylor',
          line: "We now have four plans and none of them have a power source.",
        },
        insight:
          'Shared feeling is not shared direction. Comfort without a plan becomes its own kind of chaos.',
      },
      {
        id: 'b',
        style: 'pacesetting',
        text: 'Rush to move all the equipment yourself to save time while the team watches.',
        effect: { rapport: -10, energy: -25 },
        trust: { alex: 0, sam: -1, taylor: -1, jordan: -2 },
        reaction: {
          speaker: 'Jordan',
          line: 'I could have carried that. You literally walked past me.',
        },
        insight:
          'You were the fastest pair of hands in the room and the slowest possible way to move a team.',
      },
      {
        id: 'c',
        style: 'democratic',
        text: 'Rapidly huddle the team to co-create an emergency migration plan.',
        effect: { rapport: 15, energy: -10 },
        trust: { alex: 1, sam: 2, taylor: 2, jordan: 2 },
        reaction: {
          speaker: 'Jordan',
          line: 'I have a battery bank and a hotspot. Two minutes to set up.',
        },
        insight:
          'In seven minutes the team produced a plan you could not have written alone.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Take absolute command and bark direct moving instructions to everyone.',
        effect: { rapport: -5, energy: 0 },
        trust: { alex: 1, sam: 0, taylor: 0, jordan: -1 },
        reaction: {
          speaker: 'Sam',
          line: '(Already moving.) Cables, courtyard, go. See? This is what we needed.',
        },
        insight:
          'Under a hard deadline, clarity is a gift — and it comes with a bill you settle after the showcase.',
      },
    ],
  },
  {
    id: 9,
    week: 'Post-Event',
    act: 'Act III · The Push',
    title: 'The Post-Mortem Blame Game',
    focus: 'taylor',
    location: 'Club room · 3:00 PM',
    scene:
      'The showcase is over. Grades are in. The club room is quieter than you have ever heard it.',
    beats: [
      {
        speaker: 'Sam',
        line:
          'We would have gotten a perfect score if the outdoor setup had not eaten twenty minutes of the demo.',
      },
      {
        speaker: 'Subteam A lead',
        line: 'Hey — we worked just as hard as everyone else, under terrible conditions!',
      },
      { speaker: 'Narrator', line: 'Dead silence. All eyes turn to you for the final verdict.' },
    ],
    prompt: 'This is the last thing the team will remember. Choose it.',
    bestFit: ['coaching'],
    hesitationPrompt:
      'What would you have had to admit about your own decisions to run a truly blameless retrospective?',
    options: [
      {
        id: 'a',
        style: 'affiliative',
        text: 'Defuse the tension with praise and sweep the blame under the rug.',
        effect: { rapport: 10, energy: -5 },
        trust: { alex: 2, sam: 1, taylor: -1, jordan: 0 },
        reaction: {
          speaker: 'Sam',
          line: 'Right! We did great. (Nobody looks like they believe it.)',
        },
        insight:
          'Feelings protected, root causes intact. The same failure is now scheduled for next semester.',
      },
      {
        id: 'b',
        style: 'visionary',
        text:
          'Pull the lens back: name what this team actually became, and challenge everyone to set the standard for next semester.',
        effect: { rapport: 10, energy: -5 },
        trust: { alex: 2, sam: 1, taylor: 1, jordan: 2 },
        reaction: {
          speaker: 'Taylor',
          line:
            "We built something that worked outdoors, at night, with no rehearsal. That's not nothing. But I still want the retro.",
        },
        insight:
          'A bigger story lifted the room. It becomes a deflection if you never come back down to the details.',
      },
      {
        id: 'c',
        style: 'coaching',
        text: 'Lead a structured, blameless retrospective focused on what the system failed.',
        effect: { rapport: 15, energy: -5 },
        trust: { alex: 1, sam: 2, taylor: 3, jordan: 2 },
        reaction: {
          speaker: 'Jordan',
          line:
            'The real bug was that only one person knew the venue connector. That is a documentation failure, not a heroism failure.',
        },
        insight:
          'You turned a fight into a finding. That is the single highest-leverage thing a leader does all semester.',
      },
      {
        id: 'd',
        style: 'commanding',
        text: 'Immediately stop the finger-pointing and forbid any arguing.',
        effect: { rapport: -10, energy: 0 },
        trust: { alex: 0, sam: -2, taylor: -1, jordan: -2 },
        reaction: {
          speaker: 'Sam',
          line: 'Cool. Meeting over. Same time next semester, presumably.',
        },
        insight:
          'The argument stopped. So did the reflection. The team leaves with the same system it arrived with.',
      },
    ],
  },
]

export const INTERLUDES = {
  3: {
    title: 'Reading Week breather',
    kicker: 'Between Act I and Act II',
    body: {
      low:
        'Nobody stays after the meeting. Alex leaves first, hood up. You sit in the empty club room counting the chairs, then go home and sleep for eleven hours.',
      mid:
        'Alex brings bubble tea to the next session without being asked. It is the first time in weeks nobody has flinched at your calendar.',
      high:
        'Sam organises a two-hour "no work, just ramen" evening. Jordan shows up, which surprises everyone including Jordan. The team laughs about the whiteboard war.',
    },
    energy: 12,
  },
  6: {
    title: 'The hallway conversation that stuck',
    kicker: 'Between Act II and the final push',
    body: {
      low:
        'You overhear Taylor say "I\'ll just ask the lead, it\'s faster" — and realise you have become the team\'s single point of failure. You take a long walk instead of going back inside.',
      mid:
        'Alex sends a checkpoint update before you ask for it. Small, specific, on time. You reply with one line: "This is exactly what I needed."',
      high:
        'For the first time, the team solves a problem without you in the room. Jordan suggests the pairing schedule. Taylor runs the standup. You sit at the back and let it happen.',
    },
    energy: 12,
  },
}
