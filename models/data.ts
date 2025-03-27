import { GroupedPlatinumKeys, GroupedPlatinums } from "./platinum";

export type DataKey = "platinums" | "completes" | "ultra-rare" | "all";

export type Data = Record<DataKey, GroupedPlatinumKeys> & {
  games: GroupedPlatinums;
};
export type NullableData = Data | null;
