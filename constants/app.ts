import type { Theme } from "@/models/app";
import { DataKey } from "@/models/data";

export const themes: Theme[] = ["cards", "list", "icons"];
export const defaultTheme: Theme = "cards";
export const themesLabels: Record<Theme, string> = {
  cards: "Cards",
  list: "List",
  icons: "Icons",
};

export const dataKeys: DataKey[] = [
  "all",
  "platinums",
  "completes",
  "ultra-rare",
  "ultra-rare-plus",
  "names",
];
export const dataLabels: Record<DataKey, string> = {
  all: "Platinums + Completes",
  platinums: "Platinums",
  completes: "Completes",
  "ultra-rare": "Ultra Rare",
  "ultra-rare-plus": "Ultra Rare+",
  names: "Trophy Names",
};
export const dataDescriptions: Record<DataKey, string> = {
  all: "both platinums and completes",
  platinums: "only platinum trophies",
  completes: "only completed games without platinum",
  "ultra-rare": "platinums classified as ultra rare by PSN",
  "ultra-rare-plus": "platinums with PSN rarity under 1%",
  names: "group by trophy name instead of game title",
};
