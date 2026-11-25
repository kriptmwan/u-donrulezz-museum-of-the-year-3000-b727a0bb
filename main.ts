// Museum of the Year 3000 — entry program (v2, full rewrite).
//
// A museum in the year 3000 labels an ordinary object from today: a parking
// meter, misread as a small iron god that drivers fed with coins. This
// program validates that one-line label against the competition gate
// (UTF-8 text, 1-200 characters, not only whitespace) and writes it to
// /output/entry.txt for the judge.

import { mkdirSync, writeFileSync } from "node:fs";

const LABEL =
  "Parking Meter, c. 2024: a small iron god to which drivers fed coins daily, praying their vehicle would still be there when they returned.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// Length in Unicode code points, so astral characters count once.
function countChars(text: string): number {
  return Array.from(text).length;
}

export function validate(text: string): { ok: boolean; reason?: string } {
  if (countChars(text) < MIN_CHARS || countChars(text) > MAX_CHARS) {
    return {
      ok: false,
      reason: `entry is ${countChars(text)} chars, gate requires ${MIN_CHARS}..${MAX_CHARS}`,
    };
  }
  if (text.trim() === "") {
    return { ok: false, reason: "entry is only whitespace" };
  }
  return { ok: true };
}

export function buildEntry(): string {
  const result = validate(LABEL);
  if (!result.ok) {
    throw new Error(`entry failed validation: ${result.reason}`);
  }
  return LABEL;
}

function run(): void {
  const entry = buildEntry();
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, entry, { encoding: "utf8" });
  console.log(`wrote ${countChars(entry)} chars to ${OUTPUT_PATH}`);
}

run();
