import { GroupedPlatinumKeys, GroupedPlatinums } from "@/models/platinum";

export type DataKey =
  | "all"
  | "platinums"
  | "completes"
  | "ultra-rare"
  | "ultra-rare-plus"
  | "names";

export type Data = Record<DataKey, GroupedPlatinumKeys>;
export type NullableData = Data | null;

export type GroupedData = Data & { games: GroupedPlatinums };
export type NullableGroupedData = GroupedData | null;
