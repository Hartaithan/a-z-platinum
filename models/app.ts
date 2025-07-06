import { DifficultyKey } from "@/models/alphabet";
import { DataKey } from "@/models/data";

export type Theme = "list" | "cards";

interface ResponseBase {
  message: string;
}

export type Response<T = undefined> = ResponseBase & Partial<T>;

export interface CachedResponse {
  expires?: string;
}

export type Device = "desktop" | "mobile";

export interface DeviceProps {
  device?: Device;
}

export interface Settings {
  data: DataKey;
  difficulty: DifficultyKey;
  hide: boolean;
}
