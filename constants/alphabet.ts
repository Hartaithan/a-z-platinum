import { LetterSetKey } from "@/models/alphabet";

export const letterStatus = {
  completed: "completed-letter",
  uncompleted: "uncompleted-letter",
};

export const letterSetsKeys: LetterSetKey[] = [
  "all",
  "letters",
  "numbers",
  "special-chars",
];

export const letterSets: Record<LetterSetKey, string[]> = {
  all: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#賞".split(""),
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  numbers: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0".split(""),
  "special-chars": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#".split(""),
};

export const letterSetsLabels: Record<LetterSetKey, string> = {
  all: "All",
  letters: "Letters",
  numbers: "With Numbers",
  "special-chars": "With Special Characters",
};
