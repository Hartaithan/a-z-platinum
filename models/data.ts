import { GroupedPlatinumKeys, GroupedPlatinums } from "@/models/platinum";

export type DataKey = "platinums" | "completes" | "ultra-rare" | "all";

export type Data = Record<DataKey, GroupedPlatinumKeys>;
export type NullableData = Data | null;

export type GroupedData = Data & { games: GroupedPlatinums };
export type NullableGroupedData = GroupedData | null;
