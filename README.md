# Azure Fundamentals Study Tools

Interactive quizzes and flashcards for the Microsoft **AZ-900: Azure Fundamentals** exam, built while studying along with an [Exam Cram Video](https://youtu.be/8n-kWJetQRk?si=NYfvOsB_bRvT32iS)

**Live site:** https://tweevilly.github.io/Microsoft_Azure_Fundamentals/

It is a plain static site (HTML, CSS, vanilla JS) with no build step and no dependencies. A landing page lists the chapters, and each chapter has its own page with the quiz and flashcard module and short notes underneath.

## Chapters

| Chapter | Page | Questions |
| ------- | ---- | --------- |
| 1. Describe cloud computing | `chapter-01.html` | 40 (two sets of 20) |
| 2. Describe Azure architecture and services | `chapter-02.html` | 70 (four topic sets) |

Chapter 1 covers cloud models (public, private, hybrid), service types (IaaS, PaaS, SaaS, serverless), the shared responsibility model, CapEx vs OpEx, and the benefits of cloud.

Chapter 2 is split into four sets: core architectural components (regions, availability zones, resource hierarchy), compute and networking services, storage services, and identity, access, and security.

## Features

**Quiz mode**
- One question at a time with instant feedback and an explanation for every answer
- Optional hints on selected questions
- Score screen with a review list of everything missed, plus **Retry missed**
- Best score per set is remembered

**Flashcard mode**
- Click or press Space to flip a card (question on the front, answer and explanation on the back)
- Mark each card **Still learning** or **Got it**, then review only the cards you have not mastered

**Options:** shuffle question order, shuffle answer choices (on by default), show answer choices on flashcard fronts.

**Keyboard shortcuts**

| Where     | Keys                                                           |
| --------- | -------------------------------------------------------------- |
| Quiz      | `1`-`4` or `A`-`D` answer, `H` hint, `Enter` / `→` next        |
| Flashcard | `Space` flip, `←` `→` navigate, `1` still learning, `2` got it |

Progress (best scores, missed questions, known cards) is saved in the browser's `localStorage` only. Nothing is sent anywhere.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
npm start          # python3 -m http.server 8080, then visit http://localhost:8080
```

## Publish with GitHub Pages

In the repo go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save. The site is then served at `https://<username>.github.io/<repo-name>/`.

## Add a new chapter

1. Copy `data/chapter-01.js` to `data/chapter-02.js` and change the chapter `id`, `number`, `title`, `sets`, and `questions`.
2. Copy `chapter-01.html` to `chapter-02.html`. Change `data-chapter="ch01"` to the new chapter id, the `<script src="data/...">` line, the title, and the notes.
3. Add an entry for it to the list in `index.html`.
4. Check the data with `npm test` (runs `scripts/validate-data.js`; CI runs it on every push).

### Question format

```js
{
  id: "ch02-s1-q01",          // unique across all chapters
  set: "set1",                // must match an id in the chapter's `sets`
  prompt: "Which service ...?",
  options: ["A text", "B text", "C text", "D text"], // exactly 4
  answer: 2,                  // 0-based index of the correct option
  explanation: "Why the answer is correct.",
  hint: "Optional nudge shown on request.",
}
```

## Project layout

```
index.html                landing page: chapter list, about, GitHub link
chapter-01.html, chapter-02.html   one page per chapter: quiz/flashcard module + notes
css/styles.css            styles (light and dark mode)
js/app.js                 menu, quiz, flashcards, progress storage, routing
data/chapter-NN.js        questions for each chapter
scripts/validate-data.js  data checks used by `npm test` and CI
```

Inside a chapter page, routes use the URL hash so the back button works: `#/`, `#/quiz/ch01/set1`, `#/cards/ch01/all`, `#/quiz/ch01/review` (missed questions).

## Disclaimer

Unofficial study aid, not affiliated with or endorsed by Microsoft. The questions are original practice material, not real exam questions. Check the official Microsoft Learn skills outline for the current exam content.
