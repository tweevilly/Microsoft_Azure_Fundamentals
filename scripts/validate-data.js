#!/usr/bin/env node
/*
 * Validates every data/chapter-*.js file.
 * Run with: node scripts/validate-data.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dataDir = path.join(__dirname, "..", "data");
const files = fs
  .readdirSync(dataDir)
  .filter((f) => /^chapter-.*\.js$/.test(f))
  .sort();

const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const seenIds = new Set();
let total = 0;

for (const file of files) {
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(path.join(dataDir, file), "utf8"), sandbox, { filename: file });
  } catch (e) {
    err(file, `failed to load: ${e.message}`);
    continue;
  }
  const chapters = (sandbox.window.AZ900 || {}).chapters || [];
  if (chapters.length !== 1) {
    err(file, `expected exactly one chapter, found ${chapters.length}`);
    continue;
  }
  const ch = chapters[0];
  for (const key of ["id", "number", "title"]) {
    if (ch[key] === undefined || ch[key] === "") err(file, `chapter missing "${key}"`);
  }
  const setIds = new Set((ch.sets || []).map((s) => s.id));
  if (!setIds.size) err(file, "chapter has no sets");

  for (const q of ch.questions || []) {
    const where = `${file} (${q.id || "no id"})`;
    total++;
    if (!q.id) err(where, "missing id");
    else if (seenIds.has(q.id)) err(where, "duplicate id");
    else seenIds.add(q.id);
    if (!setIds.has(q.set)) err(where, `unknown set "${q.set}"`);
    if (!q.prompt) err(where, "missing prompt");
    if (!q.explanation) err(where, "missing explanation");
    const kind = q.type || "single";
    if (!["single", "multi", "yesno"].includes(kind)) {
      err(where, `unknown type "${q.type}"`);
    } else if (kind === "yesno") {
      if (!Array.isArray(q.statements) || q.statements.length < 2 || q.statements.length > 5) {
        err(where, "yesno needs 2-5 statements");
      } else {
        q.statements.forEach((st, i) => {
          if (!st.text || typeof st.text !== "string") err(where, `statement ${i + 1} missing text`);
          if (typeof st.answer !== "boolean") err(where, `statement ${i + 1} answer must be true or false`);
          if (!st.why) err(where, `statement ${i + 1} missing why`);
        });
      }
    } else {
      const max = kind === "multi" ? 6 : 4;
      const min = kind === "multi" ? 4 : 4;
      if (!Array.isArray(q.options) || q.options.length < min || q.options.length > max) {
        err(where, `options must be an array of ${min === max ? max : `${min}-${max}`} strings`);
      } else {
        if (new Set(q.options).size !== q.options.length) err(where, "duplicate options");
        if (q.options.some((o) => typeof o !== "string" || !o.trim())) err(where, "empty option");
        if (kind === "single") {
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
            err(where, "answer must be an integer 0-3");
          }
        } else if (
          !Array.isArray(q.answer) ||
          q.answer.length < 2 ||
          q.answer.length >= q.options.length ||
          new Set(q.answer).size !== q.answer.length ||
          q.answer.some((a) => !Number.isInteger(a) || a < 0 || a >= q.options.length)
        ) {
          err(where, "multi answer must be an array of 2+ distinct valid indexes, fewer than the options");
        }
      }
    }
  }

  const perSet = {};
  for (const q of ch.questions) perSet[q.set] = (perSet[q.set] || 0) + 1;
  console.log(`${file}: ${ch.questions.length} questions`, JSON.stringify(perSet));
}

if (errors.length) {
  console.error("\nValidation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: ${total} questions across ${files.length} chapter file(s).`);
