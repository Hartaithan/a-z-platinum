import { DifficultyKey } from "@/models/alphabet";
import { DataKey } from "@/models/data";

export type Theme = "list" | "cards" | "icons";

export type Device = "desktop" | "mobile";

export interface DeviceProps {
  device?: Device;
}

export interface Settings {
  data: DataKey;
  difficulty: DifficultyKey;
  hide: boolean;
}
