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

  // A chapter page (<main data-chapter="ch01">) shows just that chapter; otherwise all chapters are listed.
  var onlyChapter = app.getAttribute("data-chapter");
  if (onlyChapter) {
    chapters = chapters.filter(function (c) {
      return c.id === onlyChapter;
    });
  }
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

  // Question kinds: "single" (default), "multi" (choose N; answer is an array) and
  // "yesno" (a set of statements, each answered Yes or No).
  function kindOf(q) {
    return q.type === "multi" || q.type === "yesno" ? q.type : "single";
  }

  function numberWord(n) {
    return ["zero", "one", "two", "three", "four", "five", "six"][n] || String(n);
  }

  // The correct answer as a list of text lines (used on the results page and on flashcard backs).
  function correctLines(q) {
    var kind = kindOf(q);
    if (kind === "multi") {
      return q.answer.map(function (i) {
        return q.options[i];
      });
    }
    if (kind === "yesno") {
      return q.statements.map(function (st) {
        return (st.answer ? "Yes: " : "No: ") + st.text;
      });
    }
    return [q.options[q.answer]];
  }

  function answerBlock(label, cls, lines) {
    if (lines.length === 1) return h("p", {}, h("span", { class: cls }, label), lines[0]);
    return h(
      "div",
      {},
      h("p", {}, h("span", { class: cls }, label)),
      h(
        "ul",
        { class: "answer-lines" },
        lines.map(function (l) {
          return h("li", {}, l);
        })
      )
    );
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

    var single = onlyChapter && chapters.length === 1 ? chapters[0] : null;
    var root = single
      ? h(
          "div",
          {},
          h("p", {}, h("a", { class: "link", href: "index.html" }, "\u2190 All chapters")),
          h("h1", { tabindex: "-1" }, "Chapter " + single.number + ": " + single.title),
          h("p", { class: "lede" }, "Choose a set, then take it as a quiz or as flashcards.")
        )
      : h(
          "div",
          {},
          h("h1", { tabindex: "-1" }, "Study Kit"),
          h("p", { class: "lede" }, "Quizzes and flashcards for the Microsoft AZ-900 Azure Fundamentals exam. Pick a chapter and a set below.")
        );

    root.append(settingsCard());

    if (!chapters.length) {
      root.append(h("div", { class: "card" }, "No chapter data found. Check the script tags in index.html."));
    }
    chapters.forEach(function (ch) {
      root.append(chapterCard(ch, !!single));
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

  function chapterCard(ch, bare) {
    var p = progressFor(ch.id);
    var card = h(
      "section",
      { class: "card", "aria-label": "Chapter " + ch.number + ": " + ch.title },
      bare ? null : h("div", { class: "chapter-head" }, h("span", { class: "chapter-num" }, "Chapter " + ch.number), h("h2", {}, ch.title))
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
        // Statement sets keep their a, b, c order because statements can refer to each other.
        var order = range(kindOf(q) === "yesno" ? 0 : q.options.length);
        return { q: q, order: store.settings.shuffleAnswers ? shuffle(order) : order, done: false, ok: false, yours: [] };
      }),
    };
    renderQuiz();
    return true;
  }

  function renderQuiz() {
    var s = session;
    var item = s.items[s.index];
    var q = item.q;
    var kind = kindOf(q);
    var total = s.items.length;
    var need = kind === "multi" ? q.answer.length : 0;

    var heading = h("h2", { class: "question", tabindex: "-1" }, q.prompt);
    var instruction =
      kind === "multi"
        ? h("p", { class: "q-instruction" }, "Choose " + numberWord(need) + ".")
        : kind === "yesno"
        ? h("p", { class: "q-instruction" }, "For each statement, select Yes if the statement is true. Otherwise, select No.")
        : null;
    var bar = h("div", { class: "progress-bar", style: "width:" + (s.index / total) * 100 + "%" });
    var scoreEl = h("span", {}, s.correct + " correct");

    var selected = []; // multi: selected[pos] is true when that displayed option is ticked
    var answers = []; // yesno: answers[i] is true (Yes), false (No) or null (unanswered)
    var optionButtons = [];
    var rows = [];
    var yesButtons = [];
    var noButtons = [];
    var countEl = null;
    var checkBtn = null;

    var optionsBox;
    if (kind === "yesno") {
      q.statements.forEach(function (st, i) {
        answers.push(null);
        var yes = h("button", { type: "button", class: "yn-btn", "aria-pressed": "false", onclick: function () { setAnswer(i, true); } }, "Yes");
        var no = h("button", { type: "button", class: "yn-btn", "aria-pressed": "false", onclick: function () { setAnswer(i, false); } }, "No");
        yesButtons.push(yes);
        noButtons.push(no);
        rows.push(
          h(
            "div",
            { class: "stmt", role: "group", "aria-label": "Statement " + LETTERS[i] },
            h("span", { class: "option-letter", "aria-hidden": "true" }, LETTERS[i]),
            h("span", { class: "stmt-text" }, st.text),
            h("div", { class: "yn" }, yes, no),
            h("span", { class: "option-mark", "aria-hidden": "true" })
          )
        );
      });
      optionsBox = h("div", { class: "options statements" }, rows);
    } else {
      optionButtons = item.order.map(function (origIdx, pos) {
        selected.push(false);
        return h(
          "button",
          {
            type: "button",
            class: "option",
            "aria-pressed": kind === "multi" ? "false" : false,
            onclick: function () {
              if (kind === "multi") toggleOption(pos);
              else pick(pos);
            },
          },
          h("span", { class: "option-letter", "aria-hidden": "true" }, LETTERS[pos]),
          h("span", { class: "option-text" }, q.options[origIdx]),
          h("span", { class: "option-mark", "aria-hidden": "true" })
        );
      });
      optionsBox = h("div", { class: "options" }, optionButtons);
    }

    if (kind !== "single") {
      countEl = h("span", { class: "muted sel-count" });
      checkBtn = h("button", { type: "button", class: "btn btn-primary", disabled: true, onclick: submit }, "Check answer");
      updateCheck();
    }

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
      if (!hintBox || item.done) return;
      hintBox.hidden = !hintBox.hidden;
    }

    function selectedCount() {
      return selected.filter(Boolean).length;
    }

    function ready() {
      if (kind === "multi") return selectedCount() === need;
      if (kind === "yesno") return answers.every(function (a) { return a !== null; });
      return false;
    }

    function updateCheck() {
      if (kind === "multi") countEl.textContent = selectedCount() + " of " + need + " selected";
      else countEl.textContent = answers.filter(function (a) { return a !== null; }).length + " of " + answers.length + " answered";
      checkBtn.disabled = !ready();
    }

    function toggleOption(pos) {
      if (item.done) return;
      selected[pos] = !selected[pos];
      optionButtons[pos].classList.toggle("selected", selected[pos]);
      optionButtons[pos].setAttribute("aria-pressed", String(selected[pos]));
      updateCheck();
    }

    function setAnswer(i, value) {
      if (item.done) return;
      answers[i] = value;
      yesButtons[i].classList.toggle("selected", value === true);
      noButtons[i].classList.toggle("selected", value === false);
      yesButtons[i].setAttribute("aria-pressed", String(value === true));
      noButtons[i].setAttribute("aria-pressed", String(value === false));
      updateCheck();
    }

    // Records the result and reveals the explanation; shared by all question kinds.
    function finish(ok, yours, feedbackNodes) {
      item.done = true;
      item.ok = ok;
      item.yours = yours;
      if (ok) s.correct++;
      var p = progressFor(s.ch.id);
      if (ok) delete p.missed[q.id];
      else p.missed[q.id] = true;
      saveStore();

      feedback.className = "feedback " + (ok ? "ok" : "bad");
      feedback.replaceChildren.apply(feedback, feedbackNodes.filter(Boolean));

      scoreEl.textContent = s.correct + " correct";
      bar.style.width = ((s.index + 1) / total) * 100 + "%";
      if (hintBtn) hintBtn.disabled = true;
      if (checkBtn) {
        checkBtn.hidden = true;
        countEl.hidden = true;
      }
      nextBtn.hidden = false;
      nextBtn.focus();
    }

    function pick(pos) {
      if (item.done) return;
      var ok = item.order[pos] === q.answer;
      optionButtons.forEach(function (btn, i) {
        var isCorrect = item.order[i] === q.answer;
        btn.classList.toggle("correct", isCorrect);
        btn.classList.toggle("wrong", i === pos && !isCorrect);
        btn.classList.toggle("dim", !isCorrect && i !== pos);
        btn.setAttribute("aria-disabled", "true");
        btn.querySelector(".option-mark").textContent = isCorrect ? "✓" : i === pos ? "✗" : "";
      });
      var correctPos = item.order.indexOf(q.answer);
      finish(ok, [q.options[item.order[pos]]], [
        h("strong", {}, ok ? "Correct." : "Not quite."),
        ok ? null : " The correct answer is " + LETTERS[correctPos] + ": " + q.options[q.answer] + ".",
        h("p", { class: "explanation" }, q.explanation),
      ]);
    }

    function submitMulti() {
      var ok = true;
      var yours = [];
      var correctLetters = [];
      optionButtons.forEach(function (btn, i) {
        var isAns = q.answer.indexOf(item.order[i]) >= 0;
        var isSel = selected[i];
        if (isAns !== isSel) ok = false;
        if (isSel) yours.push(q.options[item.order[i]]);
        if (isAns) correctLetters.push(LETTERS[i]);
        btn.classList.remove("selected");
        btn.classList.toggle("correct", isAns && isSel);
        btn.classList.toggle("missed", isAns && !isSel);
        btn.classList.toggle("wrong", isSel && !isAns);
        btn.classList.toggle("dim", !isAns && !isSel);
        btn.setAttribute("aria-disabled", "true");
        btn.querySelector(".option-mark").textContent = isAns ? "✓" : isSel ? "✗" : "";
      });
      finish(ok, yours, [
        h("strong", {}, ok ? "Correct." : "Not quite."),
        ok ? null : " The correct answers are " + correctLetters.join(" and ") + ".",
        h("p", { class: "explanation" }, q.explanation),
      ]);
    }

    function submitYesNo() {
      var right = 0;
      var yours = [];
      var items = [];
      q.statements.forEach(function (st, i) {
        var good = answers[i] === st.answer;
        if (good) right++;
        yours.push((good ? "✓ " : "✗ ") + (answers[i] ? "Yes" : "No") + ": " + st.text);
        rows[i].classList.add(good ? "correct" : "wrong");
        rows[i].querySelector(".option-mark").textContent = good ? "✓" : "✗";
        yesButtons[i].disabled = true;
        noButtons[i].disabled = true;
        items.push(h("li", {}, h("strong", {}, LETTERS[i] + ": " + (st.answer ? "Yes" : "No") + ". "), st.why));
      });
      var ok = right === q.statements.length;
      finish(ok, yours, [
        h("strong", {}, ok ? "Correct." : "Not quite. " + right + " of " + q.statements.length + " statements correct."),
        h("ul", { class: "why-list" }, items),
        h("p", { class: "explanation" }, q.explanation),
      ]);
    }

    function submit() {
      if (item.done || !ready()) return;
      if (kind === "multi") submitMulti();
      else submitYesNo();
    }

    function next() {
      if (!item.done) return;
      if (!isLast) {
        s.index++;
        renderQuiz();
      } else {
        finishQuiz();
      }
    }

    keyHandler = function (e) {
      var k = e.key.toLowerCase();
      if (!item.done) {
        if (kind !== "single" && k === "enter" && ready()) {
          e.preventDefault();
          submit();
          return;
        }
        if (kind === "yesno") {
          if (k === "y" || k === "n") {
            e.preventDefault();
            var firstOpen = answers.indexOf(null);
            if (firstOpen >= 0) setAnswer(firstOpen, k === "y");
          } else if (k === "h" && hintBox) {
            e.preventDefault();
            toggleHint();
          }
          return;
        }
        var pos = ["1", "2", "3", "4", "5", "6"].indexOf(k);
        if (pos < 0) pos = ["a", "b", "c", "d", "e", "f"].indexOf(k);
        if (pos >= 0 && pos < optionButtons.length) {
          e.preventDefault();
          if (kind === "multi") toggleOption(pos);
          else pick(pos);
        } else if (k === "h" && hintBox) {
          e.preventDefault();
          toggleHint();
        }
      } else if (k === "arrowright" || k === "n" || (k === "enter" && !isControl(e.target))) {
        e.preventDefault();
        next();
      }
    };

    var shortcuts =
      kind === "multi"
        ? "Shortcuts: 1–" + optionButtons.length + " or A–" + LETTERS[optionButtons.length - 1] + " to tick an option · Enter to check · H for hint · Enter or → for next"
        : kind === "yesno"
        ? "Shortcuts: Y or N answers the next open statement · Enter to check · H for hint · Enter or → for next"
        : "Shortcuts: 1–4 or A–D to answer · H for hint · Enter or → for next";

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
      h("div", { class: "card" }, heading, instruction, optionsBox, hintBox, feedback),
      h("div", { class: "actions" }, hintBtn, h("span", { class: "spacer" }), countEl, checkBtn, nextBtn),
      h("p", { class: "shortcuts" }, shortcuts)
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
      return !it.ok;
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
            answerBlock("Your answer: ", "your", it.yours),
            answerBlock("Correct answer: ", "right", correctLines(it.q)),
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

    var kind = kindOf(q);
    var choiceItems = null;
    if (kind === "yesno") choiceItems = q.statements.map(function (st) { return st.text; });
    else if (store.settings.showChoicesOnCards) choiceItems = q.options;

    var front = h(
      "div",
      { class: "face face-front", "aria-hidden": String(s.flipped) },
      h("span", { class: "face-label" }, "Question"),
      p.known[q.id] ? h("span", { class: "known-badge" }, "Marked as known") : null,
      h("p", { class: "face-text" }, q.prompt),
      kind === "multi" ? h("p", { class: "face-instruction" }, "Choose " + numberWord(q.answer.length) + ".") : null,
      kind === "yesno" ? h("p", { class: "face-instruction" }, "Yes or No for each statement.") : null,
      choiceItems
        ? h(
            "ol",
            { class: "face-choices", type: "A" },
            choiceItems.map(function (o) {
              return h("li", {}, o);
            })
          )
        : null,
      h("span", { class: "face-tip" }, "Click the card or press Space to flip")
    );

    var backAnswer;
    if (kind === "yesno") {
      backAnswer = h(
        "ul",
        { class: "face-answer-list" },
        q.statements.map(function (st, i) {
          return h("li", {}, h("strong", {}, LETTERS[i] + ": " + (st.answer ? "Yes" : "No") + ". "), st.why);
        })
      );
    } else if (kind === "multi") {
      backAnswer = h(
        "ul",
        { class: "face-answer-list" },
        correctLines(q).map(function (l) {
          return h("li", {}, l);
        })
      );
    } else {
      backAnswer = h("p", { class: "face-text face-answer" }, q.options[q.answer]);
    }
    var back = h(
      "div",
      { class: "face face-back", "aria-hidden": String(!s.flipped) },
      h("span", { class: "face-label" }, "Answer"),
      backAnswer,
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
