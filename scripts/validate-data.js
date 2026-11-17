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
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      err(where, "options must be an array of exactly 4 strings");
    } else {
      if (new Set(q.options).size !== q.options.length) err(where, "duplicate options");
      if (q.options.some((o) => typeof o !== "string" || !o.trim())) err(where, "empty option");
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
      err(where, "answer must be an integer 0-3");
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
