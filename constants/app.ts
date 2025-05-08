import type { Theme } from "@/models/app";
import { DataKey } from "@/models/data";

export const themes: Theme[] = ["list"];
export const defaultTheme: Theme = "list";
export const themesLabels: Record<Theme, string> = { list: "List" };

export const dataKeys: DataKey[] = [
  "all",
  "platinums",
  "completes",
  "ultra-rare",
];
export const dataLabels: Record<DataKey, string> = {
  all: "All",
  platinums: "Platinums",
  completes: "Completes",
  "ultra-rare": "Ultra Rare",
};
