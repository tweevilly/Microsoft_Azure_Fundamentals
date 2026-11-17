# AZ-900 Study Kit

Interactive quizzes and flashcards for the Microsoft **AZ-900: Azure Fundamentals** exam. Built to be used alongside a video course: work through a chapter, then test yourself on it.

It is a plain static site (HTML, CSS, vanilla JS). There is no build step and no dependencies, so it runs by opening `index.html` and deploys as-is to GitHub Pages.

## What's in it

**Chapter 1: Describe cloud computing** (40 questions, in two sets of 20)

- Cloud models: public, private, hybrid
- Service types: IaaS, PaaS, SaaS, serverless
- Shared responsibility model
- CapEx vs OpEx and consumption-based pricing
- Benefits of cloud: high availability, reliability, scalability and elasticity, predictability, governance, manageability, economies of scale

### Quiz mode

- One question at a time with instant feedback and an explanation for every answer
- Optional hints on selected questions
- Score screen with a review list of everything you missed, plus **Retry missed**
- Best score per set is remembered

### Flashcard mode

- Click or press Space to flip a card (question on the front, answer and explanation on the back)
- Mark each card **Still learning** or **Got it**, then review only the cards you have not mastered
- Optionally show the answer choices on the card front

### Options

- Shuffle question order
- Shuffle answer choices (on by default)
- Show answer choices on flashcard fronts

### Keyboard shortcuts

| Where     | Keys                                                                      |
| --------- | ------------------------------------------------------------------------- |
| Quiz      | `1`-`4` or `A`-`D` answer, `H` hint, `Enter` / `→` next                   |
| Flashcard | `Space` flip, `←` `→` navigate, `1` still learning, `2` got it            |

Progress (best scores, missed questions, known cards) is saved in your browser's `localStorage`. Nothing is sent anywhere. Use **Reset progress** on the menu to clear it.

## Run it locally

Open `index.html` in a browser. Or serve the folder:

```sh
npm start          # python3 -m http.server 8080, then visit http://localhost:8080
```

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` after a minute or so.

## Add a new chapter

1. Copy `data/chapter-01.js` to `data/chapter-02.js`.
2. Change the chapter `id`, `number`, `title`, `sets`, and the `questions`.
3. Add a script tag for it in `index.html`, next to the existing one:

   ```html
   <script src="data/chapter-02.js"></script>
   ```

4. Check your data:

   ```sh
   npm test           # node scripts/validate-data.js
   ```

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

The validator checks for duplicate ids, unknown sets, missing fields, duplicate options, and out-of-range answers. A GitHub Actions workflow runs it on every push and pull request.

## Project layout

```
index.html              page shell, loads the chapter data and the app
css/styles.css          styles (light and dark mode)
js/app.js               menu, quiz, flashcards, progress storage, routing
data/chapter-01.js      chapter 1 questions
scripts/validate-data.js  data checks used by `npm test` and CI
```

Routes use the URL hash, so the browser back button works:
`#/`, `#/quiz/ch01/set1`, `#/cards/ch01/all`, `#/quiz/ch01/review` (missed questions).

## Disclaimer

This is an unofficial study aid and is not affiliated with or endorsed by Microsoft. Questions are original practice material, not real exam questions. Check the official Microsoft Learn skills outline for the current exam content.
