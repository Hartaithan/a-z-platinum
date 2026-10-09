import type { Platinum } from "@hartaithan/trophy-scout/types";

export type GroupedPlatinums = Record<string, Platinum>;
export type NullableGroupedPlatinums = GroupedPlatinums | null;

export type GroupedPlatinumKeys = Record<string, string[]>;
