import { DifficultyKey } from "@/models/alphabet";

export const letterStatus = {
  completed: "completed-letter",
  uncompleted: "uncompleted-letter",
};

export const difficultyKeys: DifficultyKey[] = [
  "lvl-1",
  "lvl-2",
  "lvl-3",
  "lvl-4",
];

export const difficultyRaw: Record<DifficultyKey, string> = {
  "lvl-1": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "lvl-2": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0",
  "lvl-3": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#",
  "lvl-4": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#賞",
};

export const difficulty: Record<DifficultyKey, string[]> = {
  "lvl-1": "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "lvl-2": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0".split(""),
  "lvl-3": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#".split(""),
  "lvl-4": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#賞".split(""),
};

export const difficultyLabels: Record<DifficultyKey, string> = {
  "lvl-1": "Level 1",
  "lvl-2": "Level 2",
  "lvl-3": "Level 3",
  "lvl-4": "Level 4",
};
