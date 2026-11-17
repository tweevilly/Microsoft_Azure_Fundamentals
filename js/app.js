/*
 * AZ-900 Study Kit: quiz + flashcard app. Vanilla JS, no dependencies.
 *
 * Chapters are loaded from data/chapter-*.js files, which register themselves on
 * window.AZ900.chapters. Routes use the URL hash so the back button works and
 * sessions can be bookmarked:
 *
 *   #/                         menu
 *   #/quiz/<chapter>/<scope>   quiz   (scope: a set id, "all", or "review" = missed)
 *   #/cards/<chapter>/<scope>  cards  (scope: a set id, "all", or "review" = not yet known)
 */
(function () {
  "use strict";

  var chapters = ((window.AZ900 || {}).chapters || []).slice().sort(function (a, b) {
    return a.number - b.number;
  });
  var app = document.getElementById("app");
  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  /* ------------------------------------------------------------------ storage */

  var STORE_KEY = "az900-study-kit:v1";
  var DEFAULT_SETTINGS = { shuffleQuestions: false, shuffleAnswers: true, showChoicesOnCards: false };
  var store = loadStore();

  function loadStore() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && typeof raw === "object") {
        return {
          settings: Object.assign({}, DEFAULT_SETTINGS, raw.settings || {}),
          progress: raw.progress || {},
        };
      }
    } catch (e) {
      /* storage unavailable or corrupt: fall back to defaults */
    }
    return { settings: Object.assign({}, DEFAULT_SETTINGS), progress: {} };
  }

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      /* private mode or quota: progress just won't persist */
    }
  }

  function progressFor(chapterId) {
    var p = store.progress[chapterId] || (store.progress[chapterId] = {});
    p.best = p.best || {};
    p.missed = p.missed || {};
    p.known = p.known || {};
    return p;
  }

  /* ------------------------------------------------------------------ helpers */

  function h(tag, attrs) {
    var el = document.createElement(tag);
    var key;
    attrs = attrs || {};
    for (key in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
      var val = attrs[key];
      if (val === false || val === null || val === undefined) continue;
      if (key === "class") el.className = val;
      else if (key.slice(0, 2) === "on" && typeof val === "function") el.addEventListener(key.slice(2), val);
      else el.setAttribute(key, val === true ? "" : String(val));
    }
    appendChildren(el, Array.prototype.slice.call(arguments, 2));
    return el;
  }

  function appendChildren(el, children) {
    children.forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      if (Array.isArray(c)) appendChildren(el, c);
      else el.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function range(n) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(i);
    return out;
  }

  function findChapter(id) {
    return chapters.filter(function (c) {
      return c.id === id;
    })[0];
  }

  function plural(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  function getPool(ch, scope, mode) {
    var p = progressFor(ch.id);
    if (scope === "all") return ch.questions.slice();
    if (scope === "review") {
      return ch.questions.filter(function (q) {
        return mode === "quiz" ? p.missed[q.id] : !p.known[q.id];
      });
    }
    return ch.questions.filter(function (q) {
      return q.set === scope;
    });
  }

  function scopeLabel(ch, scope) {
    if (scope === "all") return "All questions";
    if (scope === "review") return "Review";
    var s = ch.sets.filter(function (x) {
      return x.id === scope;
    })[0];
    return s ? s.label : scope;
  }

  function setHash(hash) {
    try {
      history.replaceState(null, "", hash);
    } catch (e) {
      /* ignore */
    }
  }

  function mount(node) {
    app.replaceChildren(node);
    window.scrollTo(0, 0);
  }

  function isControl(target) {
    return !!(target && target.closest && target.closest("button, a, input, select, textarea, summary"));
  }

  // One global key listener; each view installs its own handler.
  var keyHandler = null;
  document.addEventListener("keydown", function (e) {
    if (!keyHandler || e.ctrlKey || e.metaKey || e.altKey) return;
    keyHandler(e);
  });

  var session = null;

  /* ------------------------------------------------------------------ home */

  function renderHome() {
    session = null;
    keyHandler = null;

    var root = h("div", {}, h("h1", { tabindex: "-1" }, "Study Kit"), h("p", { class: "lede" }, "Quizzes and flashcards for the Microsoft AZ-900 Azure Fundamentals exam. Pick a chapter and a set below."));

    root.append(settingsCard());

    if (!chapters.length) {
      root.append(h("div", { class: "card" }, "No chapter data found. Check the script tags in index.html."));
    }
    chapters.forEach(function (ch) {
      root.append(chapterCard(ch));
    });

    root.append(
      h(
        "p",
        { class: "reset" },
        h(
          "button",
          {
            type: "button",
            class: "btn btn-ghost btn-small",
            onclick: function () {
              if (window.confirm("Clear all saved scores and flashcard progress? Your settings are kept.")) {
                store.progress = {};
                saveStore();
                renderHome();
              }
            },
          },
          "Reset progress"
        )
      )
    );
    mount(root);
  }

  function toggle(label, key) {
    return h(
      "label",
      { class: "toggle" },
      h("input", {
        type: "checkbox",
        checked: !!store.settings[key],
        onchange: function (e) {
          store.settings[key] = e.target.checked;
          saveStore();
        },
      }),
      label
    );
  }

  function settingsCard() {
    return h(
      "div",
      { class: "card" },
      h(
        "fieldset",
        { class: "settings" },
        h("legend", {}, "Options"),
        toggle("Shuffle question order", "shuffleQuestions"),
        toggle("Shuffle answer choices", "shuffleAnswers"),
        toggle("Show answer choices on flashcard fronts", "showChoicesOnCards")
      )
    );
  }

  function linkButton(text, href, cls) {
    return h("a", { class: "btn " + cls, href: href }, text);
  }

  function scopeRow(ch, scope, label, count, opts) {
    var best = progressFor(ch.id).best[scope];
    var detail = plural(count, "question") + (best ? " · best " + best.score + "/" + best.total : "");
    var actions = h("div", { class: "scope-actions" });
    if (opts.quiz) actions.append(linkButton("Quiz", "#/quiz/" + ch.id + "/" + scope, "btn-primary"));
    if (opts.cards) actions.append(linkButton("Flashcards", "#/cards/" + ch.id + "/" + scope, "btn-secondary"));
    return h(
      "div",
      { class: "scope-row" },
      h("div", { class: "scope-info" }, h("strong", {}, label), h("span", { class: "muted" }, detail)),
      actions
    );
  }

  function chapterCard(ch) {
    var p = progressFor(ch.id);
    var card = h(
      "section",
      { class: "card", "aria-label": "Chapter " + ch.number + ": " + ch.title },
      h("div", { class: "chapter-head" }, h("span", { class: "chapter-num" }, "Chapter " + ch.number), h("h2", {}, ch.title))
    );

    ch.sets.forEach(function (s) {
      var count = ch.questions.filter(function (q) {
        return q.set === s.id;
      }).length;
      card.append(scopeRow(ch, s.id, s.label, count, { quiz: true, cards: true }));
    });
    card.append(scopeRow(ch, "all", "All questions", ch.questions.length, { quiz: true, cards: true }));

    var missed = getPool(ch, "review", "quiz").length;
    if (missed > 0) {
      card.append(scopeRow(ch, "review", "Missed questions", missed, { quiz: true }));
    }
    var knownCount = ch.questions.filter(function (q) {
      return p.known[q.id];
    }).length;
    var unknown = ch.questions.length - knownCount;
    if (knownCount > 0 && unknown > 0) {
      var row = scopeRow(ch, "review-cards", "Flashcards not yet known", unknown, { cards: false });
      row.querySelector(".scope-actions").append(linkButton("Flashcards", "#/cards/" + ch.id + "/review", "btn-secondary"));
      card.append(row);
    }
    return card;
  }

  /* ------------------------------------------------------------------ quiz */

  function startQuiz(ch, scope, poolOverride) {
    var pool = poolOverride || getPool(ch, scope, "quiz");
    if (!pool.length) return false;
    if (store.settings.shuffleQuestions) pool = shuffle(pool);
    session = {
      type: "quiz",
      ch: ch,
      scope: scope,
      index: 0,
      correct: 0,
      items: pool.map(function (q) {
        var order = range(q.options.length);
        return { q: q, order: store.settings.shuffleAnswers ? shuffle(order) : order, picked: null };
      }),
    };
    renderQuiz();
    return true;
  }

  function renderQuiz() {
    var s = session;
    var item = s.items[s.index];
    var q = item.q;
    var total = s.items.length;

    var heading = h("h2", { class: "question", tabindex: "-1" }, q.prompt);
    var bar = h("div", { class: "progress-bar", style: "width:" + (s.index / total) * 100 + "%" });
    var scoreEl = h("span", {}, s.correct + " correct");

    var optionButtons = item.order.map(function (origIdx, pos) {
      return h(
        "button",
        {
          type: "button",
          class: "option",
          onclick: function () {
            pick(pos);
          },
        },
        h("span", { class: "option-letter", "aria-hidden": "true" }, LETTERS[pos]),
        h("span", { class: "option-text" }, q.options[origIdx]),
        h("span", { class: "option-mark", "aria-hidden": "true" })
      );
    });

    var feedback = h("div", { class: "feedback", role: "status", "aria-live": "polite" });
    var hintBox = q.hint ? h("p", { class: "hint", hidden: true }, "Hint: " + q.hint) : null;
    var hintBtn = q.hint
      ? h("button", { type: "button", class: "btn btn-ghost btn-small", onclick: toggleHint }, "Show hint ", h("kbd", {}, "H"))
      : null;
    var isLast = s.index + 1 >= total;
    var nextBtn = h(
      "button",
      { type: "button", class: "btn btn-primary", hidden: true, onclick: next },
      isLast ? "See results" : "Next question",
      " ",
      h("kbd", {}, "→")
    );

    function toggleHint() {
      if (!hintBox || item.picked !== null) return;
      hintBox.hidden = !hintBox.hidden;
    }

    function pick(pos) {
      if (item.picked !== null) return;
      item.picked = pos;
      var ok = item.order[pos] === q.answer;
      if (ok) s.correct++;
      var p = progressFor(s.ch.id);
      if (ok) delete p.missed[q.id];
      else p.missed[q.id] = true;
      saveStore();

      optionButtons.forEach(function (btn, i) {
        var isCorrect = item.order[i] === q.answer;
        btn.classList.toggle("correct", isCorrect);
        btn.classList.toggle("wrong", i === pos && !isCorrect);
        btn.classList.toggle("dim", !isCorrect && i !== pos);
        btn.setAttribute("aria-disabled", "true");
        btn.querySelector(".option-mark").textContent = isCorrect ? "✓" : i === pos ? "✗" : "";
      });

      var correctPos = item.order.indexOf(q.answer);
      feedback.className = "feedback " + (ok ? "ok" : "bad");
      feedback.replaceChildren(
        h("strong", {}, ok ? "Correct." : "Not quite."),
        ok ? null : " The correct answer is " + LETTERS[correctPos] + ": " + q.options[q.answer] + ".",
        h("p", { class: "explanation" }, q.explanation)
      );

      scoreEl.textContent = s.correct + " correct";
      bar.style.width = ((s.index + 1) / total) * 100 + "%";
      if (hintBtn) hintBtn.disabled = true;
      nextBtn.hidden = false;
      nextBtn.focus();
    }

    function next() {
      if (item.picked === null) return;
      if (!isLast) {
        s.index++;
        renderQuiz();
      } else {
        finishQuiz();
      }
    }

    keyHandler = function (e) {
      var k = e.key.toLowerCase();
      if (item.picked === null) {
        var pos = ["1", "2", "3", "4", "5", "6"].indexOf(k);
        if (pos < 0) pos = ["a", "b", "c", "d", "e", "f"].indexOf(k);
        if (pos >= 0 && pos < optionButtons.length) {
          e.preventDefault();
          pick(pos);
        } else if (k === "h" && hintBox) {
          e.preventDefault();
          toggleHint();
        }
      } else if (k === "arrowright" || k === "n" || (k === "enter" && !isControl(e.target))) {
        e.preventDefault();
        next();
      }
    };

    var root = h(
      "div",
      {},
      h(
        "div",
        { class: "session-top" },
        linkButton("← Menu", "#/", "btn-ghost btn-small"),
        h("span", { class: "session-title" }, "Chapter " + s.ch.number + " · " + scopeLabel(s.ch, s.scope) + " · Quiz")
      ),
      h(
        "div",
        { class: "session-top" },
        h("strong", {}, "Question " + (s.index + 1) + " of " + total),
        scoreEl
      ),
      h(
        "div",
        {
          class: "progress",
          role: "progressbar",
          "aria-label": "Quiz progress",
          "aria-valuemin": "0",
          "aria-valuemax": String(total),
          "aria-valuenow": String(s.index),
        },
        bar
      ),
      h("div", { class: "card" }, heading, h("div", { class: "options" }, optionButtons), hintBox, feedback),
      h("div", { class: "actions" }, hintBtn, h("span", { class: "spacer" }), nextBtn),
      h("p", { class: "shortcuts" }, "Shortcuts: 1–4 or A–D to answer · H for hint · Enter or → for next")
    );
    mount(root);
    heading.focus({ preventScroll: true });
  }

  function finishQuiz() {
    var s = session;
    var total = s.items.length;
    if (s.scope !== "review") {
      var p = progressFor(s.ch.id);
      var prev = p.best[s.scope];
      if (!prev || s.correct / total > prev.score / prev.total) {
        p.best[s.scope] = { score: s.correct, total: total };
      }
      saveStore();
    }
    renderResults();
  }

  function renderResults() {
    var s = session;
    var total = s.items.length;
    var pct = Math.round((s.correct / total) * 100);
    keyHandler = null;

    var missed = s.items.filter(function (it) {
      return it.order[it.picked] !== it.q.answer;
    });

    var message =
      pct === 100
        ? "Perfect score."
        : pct >= 85
        ? "Strong result. Skim the misses below."
        : pct >= 60
        ? "Getting there. Read the explanations for the misses below."
        : "Worth another pass. Try the flashcards for this set, then retake the quiz.";

    var heading = h("h1", { class: "center", tabindex: "-1" }, "Quiz complete");
    var actions = h("div", { class: "actions" });
    if (missed.length) {
      actions.append(
        h(
          "button",
          {
            type: "button",
            class: "btn btn-primary",
            onclick: function () {
              setHash("#/quiz/" + s.ch.id + "/review");
              startQuiz(
                s.ch,
                "review",
                missed.map(function (it) {
                  return it.q;
                })
              );
            },
          },
          "Retry missed (" + missed.length + ")"
        )
      );
    }
    actions.append(
      h(
        "button",
        {
          type: "button",
          class: "btn " + (missed.length ? "btn-secondary" : "btn-primary"),
          onclick: function () {
            startQuiz(s.ch, s.scope === "review" ? "all" : s.scope);
            setHash("#/quiz/" + s.ch.id + "/" + (s.scope === "review" ? "all" : s.scope));
          },
        },
        "Retake quiz"
      ),
      linkButton("Study as flashcards", "#/cards/" + s.ch.id + "/" + (s.scope === "review" ? "all" : s.scope), "btn-secondary"),
      linkButton("Menu", "#/", "btn-ghost")
    );

    var root = h(
      "div",
      {},
      h(
        "div",
        { class: "card center" },
        heading,
        h(
          "div",
          { class: "score-ring", style: "--pct:" + pct, role: "img", "aria-label": s.correct + " out of " + total + " correct, " + pct + " percent" },
          h("div", { class: "score-ring-inner" }, h("div", {}, h("div", { class: "score-big" }, s.correct + "/" + total), h("div", { class: "muted" }, pct + "%")))
        ),
        h("p", {}, message),
        actions
      )
    );

    if (missed.length) {
      var list = h("div", { class: "review-list" }, h("h2", {}, "Questions to review"));
      missed.forEach(function (it) {
        list.append(
          h(
            "details",
            {},
            h("summary", {}, it.q.prompt),
            h("p", {}, h("span", { class: "your" }, "Your answer: "), it.q.options[it.order[it.picked]]),
            h("p", {}, h("span", { class: "right" }, "Correct answer: "), it.q.options[it.q.answer]),
            h("p", { class: "muted" }, it.q.explanation)
          )
        );
      });
      root.append(list);
    }
    mount(root);
    heading.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------ flashcards */

  function startCards(ch, scope, poolOverride) {
    var pool = poolOverride || getPool(ch, scope, "cards");
    if (!pool.length) return false;
    if (store.settings.shuffleQuestions) pool = shuffle(pool);
    session = { type: "cards", ch: ch, scope: scope, cards: pool, index: 0, flipped: false, rated: {} };
    renderCard();
    return true;
  }

  function renderCard() {
    var s = session;
    var q = s.cards[s.index];
    var total = s.cards.length;
    var p = progressFor(s.ch.id);
    var isLast = s.index + 1 >= total;

    var front = h(
      "div",
      { class: "face face-front", "aria-hidden": String(s.flipped) },
      h("span", { class: "face-label" }, "Question"),
      p.known[q.id] ? h("span", { class: "known-badge" }, "Marked as known") : null,
      h("p", { class: "face-text" }, q.prompt),
      store.settings.showChoicesOnCards
        ? h(
            "ol",
            { class: "face-choices", type: "A" },
            q.options.map(function (o) {
              return h("li", {}, o);
            })
          )
        : null,
      h("span", { class: "face-tip" }, "Click the card or press Space to flip")
    );
    var back = h(
      "div",
      { class: "face face-back", "aria-hidden": String(!s.flipped) },
      h("span", { class: "face-label" }, "Answer"),
      h("p", { class: "face-text face-answer" }, q.options[q.answer]),
      h("p", { class: "face-explanation" }, q.explanation)
    );
    var card = h(
      "div",
      {
        class: "flashcard" + (s.flipped ? " is-flipped" : ""),
        role: "button",
        tabindex: "0",
        "aria-label": "Flashcard. Press Space to flip.",
        onclick: flip,
      },
      h("div", { class: "flashcard-inner" }, front, back)
    );

    var rateRow = h(
      "div",
      { class: "rate-row", hidden: !s.flipped },
      h("button", { type: "button", class: "btn btn-warn", onclick: function () { rate(false); } }, "Still learning ", h("kbd", {}, "1")),
      h("button", { type: "button", class: "btn btn-good", onclick: function () { rate(true); } }, "Got it ", h("kbd", {}, "2"))
    );
    var prevBtn = h("button", { type: "button", class: "btn btn-ghost", disabled: s.index === 0, onclick: function () { go(-1); } }, "← Previous");
    var nextBtn = h("button", { type: "button", class: "btn btn-ghost", onclick: function () { go(1); } }, isLast ? "Finish" : "Next →");
    var flipBtn = h("button", { type: "button", class: "btn btn-secondary", onclick: flip }, "Flip");

    var bar = h("div", { class: "progress-bar", style: "width:" + (s.index / total) * 100 + "%" });
    var knownInDeck = s.cards.filter(function (c) {
      return p.known[c.id];
    }).length;

    function flip() {
      s.flipped = !s.flipped;
      card.classList.toggle("is-flipped", s.flipped);
      front.setAttribute("aria-hidden", String(s.flipped));
      back.setAttribute("aria-hidden", String(!s.flipped));
      rateRow.hidden = !s.flipped;
    }

    function rate(known) {
      if (!s.flipped) return;
      if (known) p.known[q.id] = true;
      else delete p.known[q.id];
      s.rated[q.id] = known ? "known" : "learning";
      saveStore();
      go(1);
    }

    function go(delta) {
      var n = s.index + delta;
      if (n < 0) return;
      if (n >= total) {
        finishCards();
        return;
      }
      s.index = n;
      s.flipped = false;
      renderCard();
    }

    keyHandler = function (e) {
      var onControl = isControl(e.target);
      if ((e.key === " " || e.key === "Enter") && !onControl) {
        e.preventDefault();
        flip();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (s.flipped && (e.key === "1" || e.key === "2")) {
        e.preventDefault();
        rate(e.key === "2");
      }
    };

    var root = h(
      "div",
      {},
      h(
        "div",
        { class: "session-top" },
        linkButton("← Menu", "#/", "btn-ghost btn-small"),
        h("span", { class: "session-title" }, "Chapter " + s.ch.number + " · " + scopeLabel(s.ch, s.scope) + " · Flashcards")
      ),
      h("div", { class: "session-top" }, h("strong", {}, "Card " + (s.index + 1) + " of " + total), h("span", {}, knownInDeck + " known")),
      h(
        "div",
        {
          class: "progress",
          role: "progressbar",
          "aria-label": "Deck progress",
          "aria-valuemin": "0",
          "aria-valuemax": String(total),
          "aria-valuenow": String(s.index),
        },
        bar
      ),
      card,
      h("div", { class: "card-controls" }, prevBtn, flipBtn, nextBtn),
      rateRow,
      h("p", { class: "shortcuts" }, "Shortcuts: Space flip · ← → navigate · 1 still learning · 2 got it")
    );
    mount(root);
  }

  function finishCards() {
    var s = session;
    var p = progressFor(s.ch.id);
    keyHandler = null;

    var known = s.cards.filter(function (q) {
      return p.known[q.id];
    }).length;
    var unknownCards = s.cards.filter(function (q) {
      return !p.known[q.id];
    });
    var heading = h("h1", { class: "center", tabindex: "-1" }, "Deck complete");

    var actions = h("div", { class: "actions" });
    if (unknownCards.length) {
      actions.append(
        h(
          "button",
          {
            type: "button",
            class: "btn btn-primary",
            onclick: function () {
              startCards(s.ch, "review", unknownCards);
            },
          },
          "Review " + unknownCards.length + " not yet known"
        )
      );
    }
    actions.append(
      h(
        "button",
        {
          type: "button",
          class: "btn " + (unknownCards.length ? "btn-secondary" : "btn-primary"),
          onclick: function () {
            startCards(s.ch, s.scope, s.cards);
          },
        },
        "Restart deck"
      ),
      linkButton("Take the quiz", "#/quiz/" + s.ch.id + "/" + (s.scope === "review" ? "all" : s.scope), "btn-secondary"),
      linkButton("Menu", "#/", "btn-ghost")
    );

    mount(
      h(
        "div",
        { class: "card center" },
        heading,
        h("p", { class: "lede" }, known + " of " + s.cards.length + " cards marked as known."),
        h("p", {}, unknownCards.length ? "Cards you are still learning stay in your review pile." : "You have marked every card in this deck as known."),
        actions
      )
    );
    heading.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------ router */

  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var view = parts[0];
    var ch = findChapter(parts[1]);
    var scope = parts[2];
    var ok = false;
    if (ch && scope) {
      if (view === "quiz") ok = startQuiz(ch, scope);
      else if (view === "cards") ok = startCards(ch, scope);
    }
    if (!ok) renderHome();
  }

  window.addEventListener("hashchange", route);
  route();
})();
