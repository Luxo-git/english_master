/* ============================================================
   English B2→C1 — Content Data
   Everything is in English by design (immersion method).
   ============================================================ */

/* ----------------------------------------------------------
   1. THE 12 ENGLISH TENSES
   Each tense: form, usage, examples, signal words.
   Learners can select/deselect which tenses to be quizzed on.
---------------------------------------------------------- */
const TENSES = [
  {
    id: "pres_simple",
    group: "Present",
    name: "Present Simple",
    form: "Subject + base verb (+ -s/-es for he/she/it). Negative: do/does + not + base verb. Question: Do/Does + subject + base verb?",
    usage: "Permanent facts and general truths, habits and routines, timetables and fixed schedules, and states (feelings, opinions, possession, senses).",
    examples: [
      "Light travels faster than sound.",
      "She commutes to work by bike three times a week.",
      "The last train leaves at 23:40.",
      "I don't really see the point of that argument."
    ],
    signalWords: "always, usually, often, sometimes, rarely, never, every day, on Mondays, once a week"
  },
  {
    id: "pres_cont",
    group: "Present",
    name: "Present Continuous",
    form: "Subject + am/is/are + verb-ing.",
    usage: "Actions happening right now or around the present period, temporary situations, fixed future arrangements, and (with 'always') recurring habits that annoy the speaker.",
    examples: [
      "I'm currently reading a novel about post-war Berlin.",
      "She's working from home this month.",
      "We're meeting the client at 9 tomorrow.",
      "He's always interrupting people in meetings."
    ],
    signalWords: "now, at the moment, currently, these days, right now, this week"
  },
  {
    id: "pres_perfect",
    group: "Present",
    name: "Present Perfect",
    form: "Subject + have/has + past participle.",
    usage: "Past actions with a present result or relevance, life experiences (unspecified time), and situations that started in the past and continue now.",
    examples: [
      "I've finished the report, so we can send it now.",
      "Have you ever negotiated a contract in another language?",
      "She has lived in Lisbon for six years.",
      "They still haven't replied to our proposal."
    ],
    signalWords: "already, yet, just, ever, never, since, for, so far, up to now"
  },
  {
    id: "pres_perfect_cont",
    group: "Present",
    name: "Present Perfect Continuous",
    form: "Subject + have/has + been + verb-ing.",
    usage: "Emphasises the duration of an activity that started in the past and continues (or has just stopped), often with visible results in the present.",
    examples: [
      "I've been working on this proposal all morning.",
      "Her eyes are red — she's been crying.",
      "How long have you been learning English?",
      "We haven't been talking much lately."
    ],
    signalWords: "all day, lately, recently, for the past hour, since this morning"
  },
  {
    id: "past_simple",
    group: "Past",
    name: "Past Simple",
    form: "Subject + past form of the verb (regular: -ed). Negative: did + not + base verb. Question: Did + subject + base verb?",
    usage: "Completed actions or states at a specific, finished time in the past, often in a sequence of events (narrative).",
    examples: [
      "We signed the contract last Friday.",
      "She didn't attend the conference last year.",
      "He walked in, sat down and opened his laptop.",
      "Did you speak to the manager yesterday?"
    ],
    signalWords: "yesterday, last week, in 2019, two days ago, when I was young"
  },
  {
    id: "past_cont",
    group: "Past",
    name: "Past Continuous",
    form: "Subject + was/were + verb-ing.",
    usage: "An action in progress at a specific moment in the past, background action interrupted by another (shorter) action, or two parallel past actions.",
    examples: [
      "I was drafting the email when the power went out.",
      "At 8 p.m. they were still discussing the budget.",
      "While she was presenting, the projector froze.",
      "We were living in Paris at that time."
    ],
    signalWords: "while, when, at that moment, all evening"
  },
  {
    id: "past_perfect",
    group: "Past",
    name: "Past Perfect",
    form: "Subject + had + past participle.",
    usage: "An action completed before another past action or point in time ('the past of the past'); clarifies the order of past events.",
    examples: [
      "By the time we arrived, the meeting had already started.",
      "She realised she had forgotten her passport.",
      "Had you ever visited Japan before that trip?",
      "They hadn't finished the audit when the news broke."
    ],
    signalWords: "by the time, already, before, after, never (before then), just"
  },
  {
    id: "past_perfect_cont",
    group: "Past",
    name: "Past Perfect Continuous",
    form: "Subject + had + been + verb-ing.",
    usage: "Emphasises the duration of an action that was ongoing before another past event, often explaining its cause or result.",
    examples: [
      "He was exhausted because he had been travelling all day.",
      "They had been negotiating for months before the deal fell through.",
      "How long had she been working there when the company was sold?",
      "The ground was wet — it had been raining all night."
    ],
    signalWords: "for, since, before, all week (before that point)"
  },
  {
    id: "fut_simple",
    group: "Future",
    name: "Future Simple (will)",
    form: "Subject + will + base verb.",
    usage: "Spontaneous decisions made at the moment of speaking, predictions based on opinion, promises, offers, and general future facts.",
    examples: [
      "I'll call the supplier right now.",
      "I think the market will recover next quarter.",
      "We won't let you down.",
      "Don't worry, I'll help you carry that."
    ],
    signalWords: "tomorrow, next year, soon, in the future, I think/suppose/expect"
  },
  {
    id: "fut_cont",
    group: "Future",
    name: "Future Continuous",
    form: "Subject + will be + verb-ing.",
    usage: "An action that will be in progress at a specific point in the future, or a routine/planned future event stated politely.",
    examples: [
      "This time next week I'll be presenting to the board.",
      "She'll be travelling when you call, so leave a message.",
      "Will you be using the conference room this afternoon?",
      "We'll be launching the new product in October."
    ],
    signalWords: "at this time tomorrow, this time next week, by then"
  },
  {
    id: "fut_perfect",
    group: "Future",
    name: "Future Perfect",
    form: "Subject + will have + past participle.",
    usage: "An action that will be completed before a specific point in the future.",
    examples: [
      "By 2027, they will have completed the merger.",
      "She'll have finished her degree by next summer.",
      "We won't have received the results before the deadline.",
      "Will you have submitted the report by Friday?"
    ],
    signalWords: "by then, by the time, by next year, in two months (from now)"
  },
  {
    id: "fut_perfect_cont",
    group: "Future",
    name: "Future Perfect Continuous",
    form: "Subject + will have been + verb-ing.",
    usage: "Emphasises the duration of an activity up to a specific point in the future.",
    examples: [
      "By December, I will have been working here for ten years.",
      "She'll have been studying English for a decade by the time she moves abroad.",
      "They will have been negotiating for five hours by the time they break for dinner.",
      "Won't you have been driving for twelve hours straight by then?"
    ],
    signalWords: "by then, for … by the time, by next month"
  }
];

/* ----------------------------------------------------------
   2. GRAMMAR / TENSE QUIZ QUESTIONS
   Each question is tagged with a tenseId so the quiz can be
   filtered by the tenses the learner has selected.
---------------------------------------------------------- */
const GRAMMAR_QUESTIONS = [
  // Present Simple
  { id:"g1", tenseId:"pres_simple", question:"The board ___ every second Tuesday of the month.", options:["is meeting","meets","has met","was meeting"], correct:1, explanation:"A fixed, recurring schedule takes the Present Simple." },
  { id:"g2", tenseId:"pres_simple", question:"I'm afraid I ___ with your interpretation of the data.", options:["don't agree","am not agreeing","haven't agreed","didn't agree"], correct:0, explanation:"'Agree' is a stative verb expressing an opinion, so it stays in the Present Simple." },
  { id:"g3", tenseId:"pres_simple", question:"Flight BA212 ___ Heathrow at 14:35 every day.", options:["is leaving","leaves","has left","will leave"], correct:1, explanation:"Timetables and schedules use the Present Simple, even for future events." },
  { id:"g4", tenseId:"pres_simple", question:"Choose the correct question: ___ your manager usually approve expenses this quickly?", options:["Is","Does","Has","Did"], correct:1, explanation:"A habitual action needs 'Does' + base verb in the Present Simple." },

  // Present Continuous
  { id:"g5", tenseId:"pres_cont", question:"Please be patient — the system ___ an update right now.", options:["installs","is installing","has installed","installed"], correct:1, explanation:"An action happening at this exact moment takes the Present Continuous." },
  { id:"g6", tenseId:"pres_cont", question:"He ___ constantly ___ his colleagues' ideas — it's becoming a real issue.", options:["is / dismissing","dismisses / -","has / dismissed","was / dismissing"], correct:0, explanation:"Present Continuous with 'always/constantly' expresses an annoying, repeated habit." },
  { id:"g7", tenseId:"pres_cont", question:"We ___ the new office next Monday, so the address will change.", options:["move","are moving into","have moved into","move into"], correct:1, explanation:"A fixed, arranged future plan is expressed with the Present Continuous." },
  { id:"g8", tenseId:"pres_cont", question:"Sorry for the noise — they ___ the wall next door.", options:["repair","are repairing","have repaired","repaired"], correct:1, explanation:"A temporary action in progress right now needs the Present Continuous." },

  // Present Perfect
  { id:"g9", tenseId:"pres_perfect", question:"___ you ever ___ a negotiation that fell apart at the last minute?", options:["Did / witness","Have / witnessed","Are / witnessing","Were / witnessing"], correct:1, explanation:"Life experience with no specific time uses the Present Perfect ('ever')." },
  { id:"g10", tenseId:"pres_perfect", question:"She ___ in the legal department since 2018.", options:["worked","was working","has worked","works"], correct:2, explanation:"An unfinished period that continues into the present uses the Present Perfect with 'since'." },
  { id:"g11", tenseId:"pres_perfect", question:"We ___ the invoice yet — could you resend it?", options:["didn't receive","haven't received","aren't receiving","hadn't received"], correct:1, explanation:"'Yet' in a negative sentence about an unfinished time period signals the Present Perfect." },
  { id:"g12", tenseId:"pres_perfect", question:"I ___ just ___ off the phone with the client — they're satisfied.", options:["have / got","am / getting","had / got","was / getting"], correct:0, explanation:"'Just' with a very recent completed action needs the Present Perfect." },

  // Present Perfect Continuous
  { id:"g13", tenseId:"pres_perfect_cont", question:"I'm exhausted — I ___ all afternoon on this spreadsheet.", options:["worked","have been working","was working","work"], correct:1, explanation:"Duration up to now, with a visible present result (tiredness), needs the Present Perfect Continuous." },
  { id:"g14", tenseId:"pres_perfect_cont", question:"How long ___ you ___ for this position before you got promoted?", options:["did / apply","have / been applying","were / applying","had / applied"], correct:1, explanation:"Asking about duration of an activity leading up to now uses the Present Perfect Continuous." },
  { id:"g15", tenseId:"pres_perfect_cont", question:"Her voice is hoarse; she ___ on the phone all morning.", options:["has been talking","talks","talked","is talking"], correct:0, explanation:"A recent, ongoing activity explaining a present state uses the Present Perfect Continuous." },
  { id:"g16", tenseId:"pres_perfect_cont", question:"They ___ about a merger for months, but nothing is confirmed yet.", options:["talk","have talked","have been talking","talked"], correct:2, explanation:"An unfinished, ongoing situation over a period of time favours the Present Perfect Continuous." },

  // Past Simple
  { id:"g17", tenseId:"past_simple", question:"The company ___ its headquarters to Dublin in 2015.", options:["has moved","moved","was moving","had moved"], correct:1, explanation:"A completed action at a specific, finished time in the past takes the Past Simple." },
  { id:"g18", tenseId:"past_simple", question:"___ you ___ the results before the announcement?", options:["Did / know","Have / known","Were / knowing","Had / known"], correct:0, explanation:"A simple question about a finished past situation uses the Past Simple." },
  { id:"g19", tenseId:"past_simple", question:"He opened the door, ___ his coat and ___ straight to his desk.", options:["hangs / walks","hung / walked","was hanging / was walking","has hung / has walked"], correct:1, explanation:"A sequence of completed past actions in a narrative uses the Past Simple." },
  { id:"g20", tenseId:"past_simple", question:"We ___ attend the ceremony because our flight was cancelled.", options:["don't","haven't","didn't","hadn't"], correct:2, explanation:"A finished past action, negated, needs 'didn't' + base verb (Past Simple)." },

  // Past Continuous
  { id:"g21", tenseId:"past_cont", question:"I ___ dinner when the fire alarm went off.", options:["cooked","was cooking","had cooked","have cooked"], correct:1, explanation:"A longer background action interrupted by a shorter one (Past Simple) needs the Past Continuous." },
  { id:"g22", tenseId:"past_cont", question:"At this time last year, we ___ for a new investor.", options:["searched","were searching","had searched","have searched"], correct:1, explanation:"An action in progress at a specific past moment uses the Past Continuous." },
  { id:"g23", tenseId:"past_cont", question:"While she ___ the presentation, he ___ notes for the Q&A.", options:["gave / was taking","was giving / was taking","was giving / took","gives / takes"], correct:1, explanation:"Two parallel actions happening at the same time in the past both take the Past Continuous." },
  { id:"g24", tenseId:"past_cont", question:"What ___ you ___ when the CEO walked in?", options:["did / discuss","were / discussing","had / discussed","have / discussed"], correct:1, explanation:"Asking about an action in progress at a precise past moment needs the Past Continuous." },

  // Past Perfect
  { id:"g25", tenseId:"past_perfect", question:"By the time the investors arrived, the team ___ the demo.", options:["finished","had finished","has finished","was finishing"], correct:1, explanation:"An action completed before another past action needs the Past Perfect." },
  { id:"g26", tenseId:"past_perfect", question:"She ___ never ___ such a hostile audience before that pitch.", options:["has / faced","had / faced","was / facing","did / face"], correct:1, explanation:"An experience that happened before a specific past moment ('the past of the past') needs the Past Perfect." },
  { id:"g27", tenseId:"past_perfect", question:"I realised I ___ the wrong file to the client.", options:["sent","had sent","have sent","was sending"], correct:1, explanation:"The mistake (sending) happened before the realisation (Past Simple), so it goes further back: Past Perfect." },
  { id:"g28", tenseId:"past_perfect", question:"___ you ___ the contract before your lawyer reviewed it?", options:["Did / sign","Had / signed","Have / signed","Were / signing"], correct:1, explanation:"Asking whether one past action preceded another needs the Past Perfect." },

  // Past Perfect Continuous
  { id:"g29", tenseId:"past_perfect_cont", question:"He was out of breath because he ___ to catch the train.", options:["ran","was running","had been running","has been running"], correct:2, explanation:"An activity that continued up to a past moment, explaining a result, uses the Past Perfect Continuous." },
  { id:"g30", tenseId:"past_perfect_cont", question:"They ___ for over an hour before the technician finally arrived.", options:["waited","had waited","had been waiting","were waiting"], correct:2, explanation:"Emphasising duration before another past event needs the Past Perfect Continuous." },
  { id:"g31", tenseId:"past_perfect_cont", question:"How long ___ she ___ at the firm when it went bankrupt?", options:["did / work","was / working","had / been working","has / been working"], correct:2, explanation:"Duration leading up to a past point (the bankruptcy) needs the Past Perfect Continuous." },
  { id:"g32", tenseId:"past_perfect_cont", question:"The engine was smoking because it ___ non-stop for days.", options:["ran","was running","had been running","has run"], correct:2, explanation:"A continuous cause leading to a past result needs the Past Perfect Continuous." },

  // Future Simple
  { id:"g33", tenseId:"fut_simple", question:"\"The printer's out of paper.\" \"Oh, ___ get some from the storeroom.\"", options:["I'm going to","I'll","I'm","I was going to"], correct:1, explanation:"A spontaneous decision made at the moment of speaking uses 'will'." },
  { id:"g34", tenseId:"fut_simple", question:"Analysts believe the currency ___ against the dollar next month.", options:["is weakening","weakens","will weaken","weakened"], correct:2, explanation:"A prediction based on opinion/belief typically uses 'will'." },
  { id:"g35", tenseId:"fut_simple", question:"I promise I ___ forget to send the minutes this time.", options:["don't","won't","am not","wasn't going to"], correct:1, explanation:"Promises are conventionally expressed with 'will/won't'." },
  { id:"g36", tenseId:"fut_simple", question:"Don't lift that alone — I ___ you.", options:["help","am helping","will help","helped"], correct:2, explanation:"An offer made spontaneously at the moment of speaking uses 'will'." },

  // Future Continuous
  { id:"g37", tenseId:"fut_cont", question:"This time tomorrow, I ___ to the shareholders.", options:["will present","will be presenting","present","am presenting"], correct:1, explanation:"An action in progress at a specific future moment needs the Future Continuous." },
  { id:"g38", tenseId:"fut_cont", question:"___ you ___ the projector at 3 p.m., or can I use it?", options:["Will / use","Do / use","Are / using","Will / be using"], correct:3, explanation:"A polite question about a planned, ongoing future action uses the Future Continuous." },
  { id:"g39", tenseId:"fut_cont", question:"Don't call after 6 — I ___ on the highway.", options:["will drive","drive","will be driving","am driving"], correct:2, explanation:"An action that will be ongoing at a specific future time needs the Future Continuous." },
  { id:"g40", tenseId:"fut_cont", question:"By next spring, the company ___ operations in three new countries.", options:["will run","will be running","runs","has run"], correct:1, explanation:"A planned, extended activity happening around a future point takes the Future Continuous." },

  // Future Perfect
  { id:"g41", tenseId:"fut_perfect", question:"By the end of the year, we ___ the entire migration.", options:["will complete","will have completed","complete","are completing"], correct:1, explanation:"Completion before a specific future deadline needs the Future Perfect." },
  { id:"g42", tenseId:"fut_perfect", question:"___ she ___ her thesis before the conference in June?", options:["Will / finish","Will / have finished","Does / finish","Is / finishing"], correct:1, explanation:"Asking whether something will be done before a future point needs the Future Perfect." },
  { id:"g43", tenseId:"fut_perfect", question:"He ___ the company for two decades by the time he retires.", options:["will run","will have run","runs","has run"], correct:1, explanation:"A duration completed by a future point of reference needs the Future Perfect." },
  { id:"g44", tenseId:"fut_perfect", question:"If nothing changes, prices ___ by 20% by next year.", options:["will rise","will have risen","rise","are rising"], correct:1, explanation:"A change expected to be complete by a future deadline uses the Future Perfect." },

  // Future Perfect Continuous
  { id:"g45", tenseId:"fut_perfect_cont", question:"By March, I ___ this project for exactly one year.", options:["will manage","will have managed","will have been managing","manage"], correct:2, explanation:"Emphasising duration up to a future point needs the Future Perfect Continuous." },
  { id:"g46", tenseId:"fut_perfect_cont", question:"By the time she's 30, she ___ for the same firm for a decade.", options:["will work","will have worked","will have been working","works"], correct:2, explanation:"Continuous duration leading up to a future milestone favours the Future Perfect Continuous." },
  { id:"g47", tenseId:"fut_perfect_cont", question:"___ you ___ non-stop for six hours by the time we land?", options:["Will / have worked","Will / be working","Will / have been working","Do / work"], correct:2, explanation:"Asking about ongoing duration up to a future point needs the Future Perfect Continuous." },
  { id:"g48", tenseId:"fut_perfect_cont", question:"By December, they ___ on this deal for a full year without a signature.", options:["will negotiate","will have negotiated","will have been negotiating","negotiate"], correct:2, explanation:"Long, ongoing effort leading up to a future point takes the Future Perfect Continuous." }
];

/* ----------------------------------------------------------
   3. VOCABULARY — B2 → C1 (phrasal verbs, collocations,
   advanced adjectives, academic & discourse vocabulary)
---------------------------------------------------------- */
const VOCABULARY = [
  // Phrasal Verbs
  { id:"v1", word:"bring up", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To mention or introduce a topic in conversation.", example:"I don't want to bring up the budget issue during the party." },
  { id:"v2", word:"carry out", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To perform or complete a task, plan, or experiment.", example:"The team carried out a thorough risk assessment before launch." },
  { id:"v3", word:"come across as", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To give a particular impression to other people.", example:"He came across as overconfident during the interview." },
  { id:"v4", word:"iron out", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To resolve small problems or difficulties in a plan or relationship.", example:"We still need to iron out a few details before signing." },
  { id:"v5", word:"fall through", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To fail to happen; if a plan falls through, it does not succeed.", example:"The acquisition fell through at the last minute." },
  { id:"v6", word:"weigh up", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To consider carefully the pros and cons of a situation before deciding.", example:"Let's weigh up the options before committing to a supplier." },
  { id:"v7", word:"hold off", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To delay an action or decision.", example:"We decided to hold off on hiring until Q3." },
  { id:"v8", word:"get through to", pos:"phrasal verb", category:"Phrasal Verbs", definition:"To succeed in making someone understand or reaching someone by phone.", example:"It took ages to get through to customer support." },

  // Collocations
  { id:"v9", word:"raise concerns", pos:"collocation", category:"Collocations", definition:"To formally express worries about something.", example:"Several employees raised concerns about the new policy." },
  { id:"v10", word:"reach a consensus", pos:"collocation", category:"Collocations", definition:"To arrive at a general agreement among a group.", example:"After hours of debate, the committee reached a consensus." },
  { id:"v11", word:"make a compelling case", pos:"collocation", category:"Collocations", definition:"To argue persuasively and convincingly for something.", example:"She made a compelling case for remote work." },
  { id:"v12", word:"strike a balance", pos:"collocation", category:"Collocations", definition:"To find a satisfactory middle point between two extremes.", example:"It's hard to strike a balance between speed and quality." },
  { id:"v13", word:"draw a conclusion", pos:"collocation", category:"Collocations", definition:"To decide something is true after considering the evidence.", example:"It's too early to draw any conclusions from the pilot data." },
  { id:"v14", word:"pose a threat", pos:"collocation", category:"Collocations", definition:"To represent a possible danger or risk.", example:"Cheap imports pose a threat to local manufacturers." },
  { id:"v15", word:"take something into account", pos:"collocation", category:"Collocations", definition:"To consider a fact or circumstance when making a decision.", example:"We need to take inflation into account when setting prices." },
  { id:"v16", word:"set a precedent", pos:"collocation", category:"Collocations", definition:"To establish an example or standard that others will follow.", example:"The ruling set a precedent for future cases." },

  // Advanced Adjectives
  { id:"v17", word:"meticulous", pos:"adjective", category:"Advanced Adjectives", definition:"Showing great attention to detail; very careful and precise.", example:"Her meticulous planning made the event run flawlessly." },
  { id:"v18", word:"ambivalent", pos:"adjective", category:"Advanced Adjectives", definition:"Having mixed feelings or contradictory ideas about something.", example:"I feel ambivalent about relocating for the promotion." },
  { id:"v19", word:"resilient", pos:"adjective", category:"Advanced Adjectives", definition:"Able to recover quickly from difficulties; tough.", example:"The local economy proved remarkably resilient after the crisis." },
  { id:"v20", word:"tentative", pos:"adjective", category:"Advanced Adjectives", definition:"Not fully certain or fixed; provisional, done with hesitation.", example:"We've reached a tentative agreement, pending legal review." },
  { id:"v21", word:"candid", pos:"adjective", category:"Advanced Adjectives", definition:"Truthful and straightforward; frank.", example:"He gave a candid assessment of the company's weaknesses." },
  { id:"v22", word:"redundant", pos:"adjective", category:"Advanced Adjectives", definition:"No longer needed or useful; also used of employees no longer needed for a job.", example:"Two hundred workers were made redundant after the merger." },
  { id:"v23", word:"plausible", pos:"adjective", category:"Advanced Adjectives", definition:"Seeming reasonable or probable; believable.", example:"That's a plausible explanation for the delay." },
  { id:"v24", word:"pragmatic", pos:"adjective", category:"Advanced Adjectives", definition:"Dealing with problems in a sensible, realistic way rather than idealistically.", example:"We need a pragmatic solution, not a perfect one." },

  // Academic & Formal Vocabulary
  { id:"v25", word:"albeit", pos:"conjunction", category:"Academic Vocabulary", definition:"Although; used to add a qualifying fact to a statement.", example:"The results were positive, albeit modest." },
  { id:"v26", word:"notwithstanding", pos:"preposition", category:"Academic Vocabulary", definition:"Despite; in spite of.", example:"Notwithstanding the delays, the project stayed within budget." },
  { id:"v27", word:"hence", pos:"adverb", category:"Academic Vocabulary", definition:"For this reason; as a result (used to introduce a logical consequence).", example:"Demand has fallen; hence the price cut." },
  { id:"v28", word:"to a great extent", pos:"phrase", category:"Academic Vocabulary", definition:"Largely; mostly (used to qualify how true a statement is).", example:"The outcome depends, to a great extent, on market conditions." },
  { id:"v29", word:"underpin", pos:"verb", category:"Academic Vocabulary", definition:"To support or form the basis of an idea, argument, or system.", example:"Trust underpins every successful partnership." },
  { id:"v30", word:"conducive", pos:"adjective", category:"Academic Vocabulary", definition:"Making a certain outcome likely or possible; favourable.", example:"An open-plan office isn't always conducive to deep focus." },
  { id:"v31", word:"mitigate", pos:"verb", category:"Academic Vocabulary", definition:"To make something less severe, harmful, or serious.", example:"The new policy aims to mitigate the impact of layoffs." },
  { id:"v32", word:"discrepancy", pos:"noun", category:"Academic Vocabulary", definition:"A difference between two things that should be the same.", example:"There's a discrepancy between the two reports' figures." },

  // Discourse Markers
  { id:"v33", word:"that being said", pos:"phrase", category:"Discourse Markers", definition:"Used to introduce a contrasting point after acknowledging something.", example:"The plan has risks. That being said, the potential upside is huge." },
  { id:"v34", word:"as it turns out", pos:"phrase", category:"Discourse Markers", definition:"Used to introduce a surprising fact revealed later.", example:"As it turns out, the competitor had already withdrawn." },
  { id:"v35", word:"for what it's worth", pos:"phrase", category:"Discourse Markers", definition:"Used to offer an opinion while acknowledging it may not carry much weight.", example:"For what it's worth, I'd wait another quarter before investing." },
  { id:"v36", word:"by and large", pos:"phrase", category:"Discourse Markers", definition:"In general; considering everything.", example:"By and large, the feedback has been positive." },
  { id:"v37", word:"on the whole", pos:"phrase", category:"Discourse Markers", definition:"Considering everything; in general.", example:"On the whole, the launch went smoother than expected." },
  { id:"v38", word:"needless to say", pos:"phrase", category:"Discourse Markers", definition:"Used to introduce something that is obvious.", example:"Needless to say, the client was not pleased." },
  { id:"v39", word:"in light of", pos:"phrase", category:"Discourse Markers", definition:"Considering; taking into account.", example:"In light of recent events, we've revised our forecast." },
  { id:"v40", word:"all things considered", pos:"phrase", category:"Discourse Markers", definition:"Taking everything into account before reaching a judgement.", example:"All things considered, it was a successful quarter." }
];

/* ----------------------------------------------------------
   4. PHRASES / IDIOMS OF THE DAY — C1 level
   Rotates deterministically by day-of-year (works offline).
---------------------------------------------------------- */
const PHRASES = [
  { id:"p1", phrase:"to get the ball rolling", meaning:"To start a process or activity.", example:"Let's get the ball rolling by assigning roles for the project." },
  { id:"p2", phrase:"to read between the lines", meaning:"To understand the hidden or implied meaning of something.", example:"He didn't say he disagreed, but if you read between the lines, it's obvious." },
  { id:"p3", phrase:"to cut corners", meaning:"To do something in the cheapest or easiest way, often sacrificing quality.", example:"The contractor cut corners, and the roof started leaking within a year." },
  { id:"p4", phrase:"to be on the same page", meaning:"To have the same understanding or opinion as someone else.", example:"Before we proceed, let's make sure we're all on the same page." },
  { id:"p5", phrase:"to jump on the bandwagon", meaning:"To join others in doing something that has become popular or fashionable.", example:"Every retailer jumped on the bandwagon once sustainability became a selling point." },
  { id:"p6", phrase:"to bite the bullet", meaning:"To force yourself to do something difficult or unpleasant.", example:"We finally bit the bullet and switched to the new software." },
  { id:"p7", phrase:"to go the extra mile", meaning:"To make more effort than is expected.", example:"The support team really went the extra mile to fix the issue overnight." },
  { id:"p8", phrase:"to have a lot on your plate", meaning:"To have many tasks or responsibilities to deal with.", example:"I can't take on a new project — I already have a lot on my plate." },
  { id:"p9", phrase:"to be in the same boat", meaning:"To be in the same difficult situation as someone else.", example:"Don't worry, most of the team is in the same boat with this deadline." },
  { id:"p10", phrase:"to think outside the box", meaning:"To think creatively, beyond conventional or expected solutions.", example:"We need someone who can think outside the box to solve this." },
  { id:"p11", phrase:"to keep someone in the loop", meaning:"To keep someone informed about what is happening.", example:"Please keep me in the loop on any changes to the schedule." },
  { id:"p12", phrase:"to touch base", meaning:"To make brief contact with someone to check progress or exchange information.", example:"Let's touch base again next week once the figures are in." },
  { id:"p13", phrase:"to go back to the drawing board", meaning:"To start planning something again because the previous attempt failed.", example:"The prototype failed the safety test, so it's back to the drawing board." },
  { id:"p14", phrase:"to be a game changer", meaning:"Something that significantly changes a situation or the way things are done.", example:"This new regulation could be a real game changer for the industry." },
  { id:"p15", phrase:"to have the upper hand", meaning:"To be in a position of advantage or control.", example:"With exclusive access to the data, they clearly have the upper hand in negotiations." },
  { id:"p16", phrase:"to be up in the air", meaning:"To be undecided or uncertain.", example:"Our travel plans are still up in the air because of the strike." },
  { id:"p17", phrase:"to hit the nail on the head", meaning:"To describe exactly what is causing a situation or problem.", example:"You hit the nail on the head — the real issue is communication, not budget." },
  { id:"p18", phrase:"to be a double-edged sword", meaning:"Something that has both positive and negative effects.", example:"Remote work is a double-edged sword: more freedom, but less spontaneous collaboration." },
  { id:"p19", phrase:"to take something with a grain of salt", meaning:"To not fully believe something; to treat a claim with some scepticism.", example:"Take the forecast with a grain of salt — it's based on limited data." },
  { id:"p20", phrase:"to leave no stone unturned", meaning:"To try every possible option in order to achieve something or find something.", example:"The investigators left no stone unturned in tracing the funds." },
  { id:"p21", phrase:"to be at a crossroads", meaning:"To be at a point where an important decision must be made.", example:"The company is at a crossroads: expand abroad or consolidate at home." },
  { id:"p22", phrase:"to add fuel to the fire", meaning:"To make a bad situation worse, especially by saying or doing something provocative.", example:"His comment only added fuel to the fire during the dispute." },
  { id:"p23", phrase:"to be under the microscope", meaning:"To be examined or scrutinised very closely.", example:"After the scandal, every decision the board makes is under the microscope." },
  { id:"p24", phrase:"to raise the bar", meaning:"To set a higher standard than before.", example:"Their latest product has really raised the bar for the whole industry." }
];

/* ----------------------------------------------------------
   5. WRITING — Fill in the Blank (advanced structures)
---------------------------------------------------------- */
const WRITING_FILL = [
  { id:"w1", sentence:"Had I known about the delay, I ___ a different supplier.", options:["would choose","would have chosen","chose","will choose"], correct:1, hint:"Third conditional — hypothetical past." },
  { id:"w2", sentence:"No sooner ___ the announcement made than the stock price dropped.", options:["was","had","did","has"], correct:1, hint:"Inversion with 'no sooner... had' (Past Perfect)." },
  { id:"w3", sentence:"The report, ___ was published last week, confirms our projections.", options:["what","which","who","whose"], correct:1, hint:"Non-defining relative clause referring to a thing." },
  { id:"w4", sentence:"I'd rather you ___ the client before making any promises.", options:["consult","consulted","would consult","had consulted"], correct:1, hint:"'I'd rather + subject' takes a past-form verb for present/future preference." },
  { id:"w5", sentence:"It's high time we ___ our approach to remote onboarding.", options:["reconsider","reconsidered","have reconsidered","will reconsider"], correct:1, hint:"'It's (high) time' + subject takes the past simple to express something overdue." },
  { id:"w6", sentence:"Were the funding to fall through, the project ___ postponed.", options:["will be","would be","is","had been"], correct:1, hint:"Inverted second conditional (formal 'were... to')." },
  { id:"w7", sentence:"By the time the auditors finish, we ___ every transaction twice.", options:["will check","will have checked","checked","are checking"], correct:1, hint:"Future Perfect — completion before a future point." },
  { id:"w8", sentence:"Not only ___ the deadline, but the quality also exceeded expectations.", options:["we met","did we meet","we did meet","had we met"], correct:1, hint:"Inversion after a negative adverbial ('Not only')." },
  { id:"w9", sentence:"The proposal is ___ interesting ___ we should discuss it further.", options:["so / that","such / that","too / to","enough / that"], correct:0, hint:"'so + adjective + that' for result." },
  { id:"w10", sentence:"She insisted that the contract ___ reviewed before signing.", options:["is","was","be","will be"], correct:2, hint:"Subjunctive after 'insist that' in formal English." },
  { id:"w11", sentence:"Only after the second warning ___ the team take the issue seriously.", options:["did","had","was","has"], correct:0, hint:"Inversion after the negative-like adverbial 'Only after'." },
  { id:"w12", sentence:"If the merger ___ approved, we would have restructured the entire division.", options:["was","were","had been","would be"], correct:2, hint:"Third conditional — hypothetical unreal past." },
  { id:"w13", sentence:"The findings, far from ___ our theory, actually contradicted it.", options:["supporting","support","supported","to support"], correct:0, hint:"Gerund after the preposition 'from' in 'far from'." },
  { id:"w14", sentence:"Rarely ___ such a compelling case for change.", options:["we have seen","have we seen","we saw","did we saw"], correct:1, hint:"Inversion after the negative adverb 'Rarely' + Present Perfect." },
  { id:"w15", sentence:"I look forward to ___ from you at your earliest convenience.", options:["hear","hearing","heard","have heard"], correct:1, hint:"'look forward to' is followed by a gerund, not the infinitive." },
  { id:"w16", sentence:"If only we ___ this information sooner, we could have avoided the loss.", options:["knew","had known","would know","have known"], correct:1, hint:"'If only' + Past Perfect for regret about the past." }
];

/* ----------------------------------------------------------
   6. WRITING — Sentence Scramble (build the correct sentence)
---------------------------------------------------------- */
const WRITING_SCRAMBLE = [
  { id:"s1", words:["the","market","Had","recovered,","would","we","have","invested","more"], correct:"Had the market recovered, we would have invested more." },
  { id:"s2", words:["so","was","The","feedback","overwhelming","that","extended","launch","we","the"], correct:"The feedback was so overwhelming that we extended the launch." },
  { id:"s3", words:["did","the","No","team","sooner","finish","than","new","project","arrived","a"], correct:"No sooner did the team finish than a new project arrived." },
  { id:"s4", words:["rather","would","meeting","the","I","postpone","you"], correct:"I would rather you postpone the meeting." },
  { id:"s5", words:["light","of","recent","events,","In","postponed","the","launch","we"], correct:"In light of recent events, we postponed the launch." },
  { id:"s6", words:["did","the","board","Not","approve","the","budget,","only","but","also","the","timeline","improved"], correct:"Not only did the board approve the budget, but the timeline also improved." },
  { id:"s7", words:["extent,","a","To","great","depends","success","our","on","timing"], correct:"To a great extent, our success depends on timing." },
  { id:"s8", words:["strike","need","to","We","balance","a","quality","speed","and","between"], correct:"We need to strike a balance between speed and quality." },
  { id:"s9", words:["risen","Prices","by","20%","have","year","this"], correct:"Prices have risen by 20% this year." },
  { id:"s10", words:["considered,","things","was","All","success","a","quarter","the"], correct:"All things considered, the quarter was a success." },
  { id:"s11", words:["ball","Let's","rolling","get","the","assigning","by","roles"], correct:"Let's get the ball rolling by assigning roles." },
  { id:"s12", words:["seen","case","have","such","Rarely","compelling","we","a"], correct:"Rarely have we seen such a compelling case." }
];
