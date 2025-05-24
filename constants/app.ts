import type { Theme } from "@/models/app";
import { DataKey } from "@/models/data";

export const themes: Theme[] = ["cards", "list"];
export const defaultTheme: Theme = "cards";
export const themesLabels: Record<Theme, string> = {
  cards: "Cards",
  list: "List",
};

export const dataKeys: DataKey[] = [
  "all",
  "platinums",
  "completes",
  "ultra-rare",
  "names",
];
export const dataLabels: Record<DataKey, string> = {
  all: "Platinums + Completes",
  platinums: "Platinums",
  completes: "Completes",
  "ultra-rare": "Ultra Rare",
  names: "Trophy Names",
};
