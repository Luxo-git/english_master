/* ============================================================
   EnglishMaster — App logic
   Vanilla JS, no dependencies. State persisted in localStorage.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "em_state_v2";

  /* ---------------- State ---------------- */
  function defaultState() {
    return {
      streak: { count: 0, lastDate: null },
      vocab: { boxes: {}, category: "all", index: 0 },
      tenses: { selected: TENSES.map(t => t.id) },
      quiz: { history: {} }, // tenseId -> {correct,total}
      writing: {
        fillIndex: 0, fillCorrect: 0, fillTotal: 0,
        scrambleIndex: 0, scrambleCorrect: 0, scrambleTotal: 0
      },
      phrasesRead: []
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      // merge with defaults to survive future field additions
      const d = defaultState();
      return Object.assign(d, parsed, {
        streak: Object.assign(d.streak, parsed.streak),
        vocab: Object.assign(d.vocab, parsed.vocab),
        tenses: Object.assign(d.tenses, parsed.tenses),
        quiz: Object.assign(d.quiz, parsed.quiz),
        writing: Object.assign(d.writing, parsed.writing)
      });
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { /* storage unavailable — app still works, just not persisted */ }
  }

  /* ---------------- Streak ---------------- */
  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function bumpStreak() {
    const today = todayISO();
    if (state.streak.lastDate === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
    state.streak.count = (state.streak.lastDate === yesterday) ? state.streak.count + 1 : 1;
    state.streak.lastDate = today;
    saveState();
  }
  function renderStreak() {
    document.getElementById("streak-count").textContent = state.streak.count;
  }

  /* ---------------- Navigation ---------------- */
  const VIEWS = ["home", "vocab", "tenses", "phrases", "writing", "progress"];
  function goto(view) {
    VIEWS.forEach(v => {
      document.getElementById("view-" + v).hidden = (v !== view);
    });
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.goto === view);
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (view === "vocab") renderVocab();
    if (view === "tenses") renderTenses();
    if (view === "phrases") renderPhrases();
    if (view === "writing") renderWriting();
    if (view === "progress") renderProgress();
    if (view === "home") renderHome();
  }

  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => goto(el.dataset.goto));
  });
  document.getElementById("btn-home").addEventListener("click", () => goto("home"));

  /* ---------------- Utilities ---------------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function dayOfYearIndex(length) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 86400000;
    const doy = Math.floor(diff / oneDay);
    return doy % length;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* ============================================================
     HOME
     ============================================================ */
  function renderHome() {
    const masteredWords = Object.values(state.vocab.boxes).filter(b => b >= 5).length;
    document.getElementById("stat-words").textContent = masteredWords;

    let correct = 0, total = 0;
    Object.values(state.quiz.history).forEach(h => { correct += h.correct; total += h.total; });
    document.getElementById("stat-accuracy").textContent = total ? Math.round((correct / total) * 100) + "%" : "–";

    document.getElementById("stat-tenses").textContent = state.tenses.selected.length + "/" + TENSES.length;

    renderPhrasePreview(document.getElementById("home-phrase-preview"));
  }

  function renderPhrasePreview(container) {
    const p = PHRASES[dayOfYearIndex(PHRASES.length)];
    container.innerHTML = "";
    container.appendChild(el("span", "ph-phrase", "“" + p.phrase + "”"));
    container.appendChild(el("span", "ph-meaning", p.meaning));
    container.appendChild(el("span", "ph-example", p.example));
  }

  /* ============================================================
     VOCABULARY
     ============================================================ */
  const CATEGORIES = ["all", ...Array.from(new Set(VOCABULARY.map(v => v.category)))];

  function currentVocabList() {
    return state.vocab.category === "all"
      ? VOCABULARY
      : VOCABULARY.filter(v => v.category === state.vocab.category);
  }

  function renderVocabCategoryChips() {
    const row = document.getElementById("vocab-categories");
    row.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const chip = el("button", "chip" + (state.vocab.category === cat ? " chip-active" : ""), cat === "all" ? "All" : cat);
      chip.addEventListener("click", () => {
        state.vocab.category = cat;
        state.vocab.index = 0;
        saveState();
        renderVocab();
      });
      row.appendChild(chip);
    });
  }

  let flipped = false;
  function renderVocab() {
    renderVocabCategoryChips();
    const list = currentVocabList();
    const total = list.length;
    const mastered = list.filter(v => (state.vocab.boxes[v.id] || 1) >= 5).length;

    document.getElementById("vocab-progress-fill").style.width = total ? (mastered / total * 100) + "%" : "0%";
    document.getElementById("vocab-progress-label").textContent = mastered + " / " + total + " mastered";

    if (!total) return;
    if (state.vocab.index >= total) state.vocab.index = 0;
    const word = list[state.vocab.index];

    flipped = false;
    const card = document.getElementById("flashcard");
    card.classList.remove("flipped");
    document.getElementById("fc-pos").textContent = word.pos;
    document.getElementById("fc-word").textContent = word.word;
    document.getElementById("fc-def").textContent = word.definition;
    document.getElementById("fc-example").textContent = word.example;
    document.getElementById("fc-counter").textContent = (state.vocab.index + 1) + " / " + total + " — " + word.category;
  }

  document.getElementById("flashcard").addEventListener("click", () => {
    flipped = !flipped;
    document.getElementById("flashcard").classList.toggle("flipped", flipped);
  });

  function advanceVocab(delta) {
    const list = currentVocabList();
    if (!list.length) return;
    const word = list[state.vocab.index];
    const box = state.vocab.boxes[word.id] || 1;
    state.vocab.boxes[word.id] = delta > 0 ? Math.min(5, box + 1) : 1;
    state.vocab.index = (state.vocab.index + 1) % list.length;
    saveState();
    bumpStreak(); renderStreak();
    renderVocab();
  }
  document.getElementById("fc-know").addEventListener("click", () => advanceVocab(1));
  document.getElementById("fc-again").addEventListener("click", () => advanceVocab(-1));

  /* ============================================================
     TENSES & QUIZ
     ============================================================ */
  function renderTenses() {
    const container = document.getElementById("tense-list");
    container.innerHTML = "";
    TENSES.forEach(t => {
      const card = el("div", "tense-card");
      const head = el("div", "tense-card-head");

      const cb = el("input", "tense-checkbox");
      cb.type = "checkbox";
      cb.checked = state.tenses.selected.includes(t.id);
      cb.addEventListener("click", e => e.stopPropagation());
      cb.addEventListener("change", () => {
        const sel = new Set(state.tenses.selected);
        if (cb.checked) sel.add(t.id); else sel.delete(t.id);
        state.tenses.selected = Array.from(sel);
        saveState();
        updateTensesSelectedCount();
      });

      const name = el("span", "tense-card-name", t.name);
      const group = el("span", "tense-card-group", t.group);
      const toggleBtn = el("button", "tense-toggle", '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>');

      head.appendChild(cb);
      head.appendChild(name);
      head.appendChild(group);
      head.appendChild(toggleBtn);
      head.addEventListener("click", (e) => {
        if (e.target === cb) return;
        card.classList.toggle("open");
      });

      const body = el("div", "tense-card-body");
      body.innerHTML =
        "<p><b>Form:</b> " + t.form + "</p>" +
        "<p><b>Usage:</b> " + t.usage + "</p>" +
        "<p><b>Signal words:</b> " + t.signalWords + "</p>" +
        "<p><b>Examples:</b>" + t.examples.map(x => '<span class="ex-line">' + x + "</span>").join("") + "</p>";

      card.appendChild(head);
      card.appendChild(body);
      container.appendChild(card);
    });
    updateTensesSelectedCount();
  }

  function updateTensesSelectedCount() {
    document.getElementById("tenses-selected-count").textContent = state.tenses.selected.length + " / " + TENSES.length + " selected";
    document.getElementById("start-quiz-btn").disabled = state.tenses.selected.length === 0;
  }

  document.getElementById("tenses-select-all").addEventListener("click", () => {
    state.tenses.selected = TENSES.map(t => t.id);
    saveState(); renderTenses();
  });
  document.getElementById("tenses-select-none").addEventListener("click", () => {
    state.tenses.selected = [];
    saveState(); renderTenses();
  });

  /* ---- Quiz runtime ---- */
  let quiz = null; // {pool, index, score, perTense, answered}

  function buildQuizPool() {
    const pool = GRAMMAR_QUESTIONS.filter(q => state.tenses.selected.includes(q.tenseId));
    const shuffled = shuffle(pool);
    return shuffled.slice(0, Math.min(shuffled.length, 15));
  }

  function startQuiz() {
    const pool = buildQuizPool();
    if (!pool.length) return;
    quiz = { pool, index: 0, score: 0, perTense: {}, answered: false };
    document.getElementById("quiz-screen").hidden = false;
    document.getElementById("quiz-result").hidden = true;
    document.getElementById("quiz-body").hidden = false;
    renderQuizQuestion();
  }
  document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);
  document.getElementById("quiz-close").addEventListener("click", closeQuiz);
  document.getElementById("quiz-back-home").addEventListener("click", () => { closeQuiz(); goto("home"); });
  document.getElementById("quiz-restart").addEventListener("click", startQuiz);

  function closeQuiz() {
    document.getElementById("quiz-screen").hidden = true;
    quiz = null;
  }

  function tenseName(id) {
    const t = TENSES.find(x => x.id === id);
    return t ? t.name : id;
  }

  function renderQuizQuestion() {
    const q = quiz.pool[quiz.index];
    quiz.answered = false;
    document.getElementById("quiz-progress-fill").style.width = (quiz.index / quiz.pool.length * 100) + "%";
    document.getElementById("quiz-score").textContent = "Score: " + quiz.score + " / " + quiz.index;
    document.getElementById("quiz-tense-tag").textContent = tenseName(q.tenseId);
    document.getElementById("quiz-question").textContent = q.question;
    document.getElementById("quiz-explanation").hidden = true;
    document.getElementById("quiz-next").hidden = true;

    const opts = document.getElementById("quiz-options");
    opts.innerHTML = "";
    q.options.forEach((opt, i) => {
      const b = el("button", "quiz-option", opt);
      b.addEventListener("click", () => selectQuizAnswer(i));
      opts.appendChild(b);
    });
  }

  function selectQuizAnswer(i) {
    if (quiz.answered) return;
    quiz.answered = true;
    const q = quiz.pool[quiz.index];
    const buttons = document.querySelectorAll("#quiz-options .quiz-option");
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correct) b.classList.add("correct");
      else if (idx === i) b.classList.add("incorrect");
    });

    if (!quiz.perTense[q.tenseId]) quiz.perTense[q.tenseId] = { correct: 0, total: 0 };
    quiz.perTense[q.tenseId].total++;
    if (i === q.correct) { quiz.score++; quiz.perTense[q.tenseId].correct++; }

    document.getElementById("quiz-explanation").hidden = false;
    document.getElementById("quiz-explanation").textContent = q.explanation;
    document.getElementById("quiz-next").hidden = false;
    document.getElementById("quiz-score").textContent = "Score: " + quiz.score + " / " + (quiz.index + 1);
  }

  document.getElementById("quiz-next").addEventListener("click", () => {
    quiz.index++;
    if (quiz.index >= quiz.pool.length) {
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  });

  function finishQuiz() {
    document.getElementById("quiz-progress-fill").style.width = "100%";
    document.getElementById("quiz-body").hidden = true;
    document.getElementById("quiz-result").hidden = false;

    // merge into global history
    Object.keys(quiz.perTense).forEach(tid => {
      if (!state.quiz.history[tid]) state.quiz.history[tid] = { correct: 0, total: 0 };
      state.quiz.history[tid].correct += quiz.perTense[tid].correct;
      state.quiz.history[tid].total += quiz.perTense[tid].total;
    });
    saveState();
    bumpStreak(); renderStreak();

    document.getElementById("quiz-result-score").textContent = quiz.score + " / " + quiz.pool.length + " correct";
    const bd = document.getElementById("quiz-result-breakdown");
    bd.innerHTML = "";
    Object.keys(quiz.perTense).forEach(tid => {
      const stat = quiz.perTense[tid];
      const row = el("div", "breakdown-row");
      row.appendChild(el("span", "breakdown-name", tenseName(tid)));
      const track = el("div", "breakdown-track");
      const fill = el("div", "breakdown-fill");
      fill.style.width = (stat.correct / stat.total * 100) + "%";
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("span", "breakdown-frac", stat.correct + "/" + stat.total));
      bd.appendChild(row);
    });
  }

  /* ============================================================
     PHRASES
     ============================================================ */
  function renderPhrases() {
    renderPhrasePreview(document.getElementById("phrases-today"));
    const list = document.getElementById("phrase-list");
    list.innerHTML = "";
    PHRASES.forEach(p => {
      const item = el("div", "phrase-item");
      const head = el("div", "phrase-item-head");
      head.innerHTML = "<span>" + p.phrase + "</span><span>+</span>";
      const body = el("div", "phrase-item-body");
      body.innerHTML = p.meaning + '<span class="ex-line">' + p.example + "</span>";
      head.addEventListener("click", () => {
        item.classList.toggle("open");
        if (!state.phrasesRead.includes(p.id)) { state.phrasesRead.push(p.id); saveState(); }
      });
      item.appendChild(head);
      item.appendChild(body);
      list.appendChild(item);
    });
  }

  /* ============================================================
     WRITING
     ============================================================ */
  let writingMode = "fill";
  document.querySelectorAll('[data-mode]').forEach(chip => {
    chip.addEventListener("click", () => {
      writingMode = chip.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach(c => c.classList.toggle("chip-active", c === chip));
      document.getElementById("writing-fill").hidden = writingMode !== "fill";
      document.getElementById("writing-scramble").hidden = writingMode !== "scramble";
    });
  });

  function renderWriting() {
    document.getElementById("writing-fill").hidden = writingMode !== "fill";
    document.getElementById("writing-scramble").hidden = writingMode !== "scramble";
    renderFill();
    renderScramble();
  }

  /* ---- Fill in the blank ---- */
  function renderFill() {
    if (state.writing.fillIndex >= WRITING_FILL.length) state.writing.fillIndex = 0;
    const q = WRITING_FILL[state.writing.fillIndex];
    document.getElementById("fill-counter").textContent = (state.writing.fillIndex + 1) + " / " + WRITING_FILL.length;
    document.getElementById("fill-sentence").textContent = q.sentence;
    document.getElementById("fill-hint").hidden = true;
    document.getElementById("fill-next").hidden = true;

    const opts = document.getElementById("fill-options");
    opts.innerHTML = "";
    let answered = false;
    q.options.forEach((opt, i) => {
      const b = el("button", "quiz-option", opt);
      b.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const buttons = opts.querySelectorAll(".quiz-option");
        buttons.forEach((bb, idx) => {
          bb.disabled = true;
          if (idx === q.correct) bb.classList.add("correct");
          else if (idx === i) bb.classList.add("incorrect");
        });
        state.writing.fillTotal++;
        if (i === q.correct) state.writing.fillCorrect++;
        saveState();
        bumpStreak(); renderStreak();
        document.getElementById("fill-hint").hidden = false;
        document.getElementById("fill-hint").textContent = q.hint;
        document.getElementById("fill-next").hidden = false;
      });
      opts.appendChild(b);
    });
  }
  document.getElementById("fill-next").addEventListener("click", () => {
    state.writing.fillIndex = (state.writing.fillIndex + 1) % WRITING_FILL.length;
    saveState();
    renderFill();
  });

  /* ---- Sentence scramble ---- */
  let scrambleState = { placed: [], bankOrder: [] };

  function renderScramble() {
    if (state.writing.scrambleIndex >= WRITING_SCRAMBLE.length) state.writing.scrambleIndex = 0;
    const q = WRITING_SCRAMBLE[state.writing.scrambleIndex];
    document.getElementById("scramble-counter").textContent = (state.writing.scrambleIndex + 1) + " / " + WRITING_SCRAMBLE.length;
    document.getElementById("scramble-feedback").hidden = true;
    document.getElementById("scramble-next").hidden = true;

    scrambleState.placed = [];
    scrambleState.bankOrder = shuffle(q.words.map((w, i) => ({ w, i })));
    renderScrambleUI();
  }

  function renderScrambleUI() {
    const target = document.getElementById("scramble-target");
    const bank = document.getElementById("scramble-bank");
    target.innerHTML = "";
    bank.innerHTML = "";

    scrambleState.placed.forEach(item => {
      const chip = el("button", "word-chip", item.w);
      chip.addEventListener("click", () => {
        scrambleState.placed = scrambleState.placed.filter(p => p.i !== item.i);
        renderScrambleUI();
      });
      target.appendChild(chip);
    });

    scrambleState.bankOrder.forEach(item => {
      const isPlaced = scrambleState.placed.some(p => p.i === item.i);
      const chip = el("button", "word-chip" + (isPlaced ? " placed" : ""), item.w);
      if (!isPlaced) {
        chip.addEventListener("click", () => {
          scrambleState.placed.push(item);
          renderScrambleUI();
        });
      }
      bank.appendChild(chip);
    });
  }

  document.getElementById("scramble-clear").addEventListener("click", () => {
    scrambleState.placed = [];
    renderScrambleUI();
  });

  document.getElementById("scramble-check").addEventListener("click", () => {
    const q = WRITING_SCRAMBLE[state.writing.scrambleIndex];
    const attempt = scrambleState.placed.map(p => p.w).join(" ");
    const target = q.correct.replace(/\.$/, "");
    const correct = attempt === target;

    state.writing.scrambleTotal++;
    if (correct) state.writing.scrambleCorrect++;
    saveState();
    bumpStreak(); renderStreak();

    const fb = document.getElementById("scramble-feedback");
    fb.hidden = false;
    fb.textContent = correct ? "Correct! " + q.correct : "Not quite. Correct sentence: " + q.correct;
    document.getElementById("scramble-next").hidden = false;
  });

  document.getElementById("scramble-next").addEventListener("click", () => {
    state.writing.scrambleIndex = (state.writing.scrambleIndex + 1) % WRITING_SCRAMBLE.length;
    saveState();
    renderScramble();
  });

  /* ============================================================
     PROGRESS
     ============================================================ */
  function renderProgress() {
    const container = document.getElementById("progress-cards");
    container.innerHTML = "";

    const masteredWords = Object.values(state.vocab.boxes).filter(b => b >= 5).length;
    const c1 = el("div", "progress-card");
    c1.innerHTML = '<h3>Vocabulary</h3><span class="big-num">' + masteredWords + " / " + VOCABULARY.length + '</span> words mastered';
    container.appendChild(c1);

    let correct = 0, total = 0;
    const rows = TENSES.map(t => {
      const h = state.quiz.history[t.id] || { correct: 0, total: 0 };
      correct += h.correct; total += h.total;
      return { name: t.name, h };
    }).filter(r => r.h.total > 0);

    const c2 = el("div", "progress-card");
    c2.innerHTML = '<h3>Grammar quiz</h3><span class="big-num">' + (total ? Math.round(correct / total * 100) + "%" : "–") + '</span> overall accuracy (' + total + ' answered)';
    const bd = el("div", "quiz-result-breakdown");
    bd.style.marginTop = "12px";
    rows.forEach(r => {
      const row = el("div", "breakdown-row");
      row.appendChild(el("span", "breakdown-name", r.name));
      const track = el("div", "breakdown-track");
      const fill = el("div", "breakdown-fill");
      fill.style.width = (r.h.correct / r.h.total * 100) + "%";
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("span", "breakdown-frac", r.h.correct + "/" + r.h.total));
      bd.appendChild(row);
    });
    c2.appendChild(bd);
    container.appendChild(c2);

    const c3 = el("div", "progress-card");
    const fillPct = state.writing.fillTotal ? Math.round(state.writing.fillCorrect / state.writing.fillTotal * 100) : null;
    const scramblePct = state.writing.scrambleTotal ? Math.round(state.writing.scrambleCorrect / state.writing.scrambleTotal * 100) : null;
    c3.innerHTML = '<h3>Writing practice</h3>' +
      '<p>Fill in the blank: <b>' + state.writing.fillCorrect + " / " + state.writing.fillTotal + '</b>' + (fillPct !== null ? " (" + fillPct + "%)" : "") + '</p>' +
      '<p>Sentence builder: <b>' + state.writing.scrambleCorrect + " / " + state.writing.scrambleTotal + '</b>' + (scramblePct !== null ? " (" + scramblePct + "%)" : "") + '</p>';
    container.appendChild(c3);

    const c4 = el("div", "progress-card");
    c4.innerHTML = '<h3>Phrases &amp; streak</h3><p>' + state.phrasesRead.length + " / " + PHRASES.length + ' idioms explored</p><p>Current streak: <b>' + state.streak.count + " day" + (state.streak.count === 1 ? "" : "s") + '</b></p>';
    container.appendChild(c4);
  }

  /* ============================================================
     PWA — service worker registration
     ============================================================ */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }

  /* ---------------- Init ---------------- */
  renderStreak();
  goto("home");
})();
