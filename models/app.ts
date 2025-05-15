import { DifficultyKey } from "@/models/alphabet";
import { DataKey } from "@/models/data";

export type Theme = "list";

interface ResponseBase {
  message: string;
}

export type Response<T = undefined> = ResponseBase & Partial<T>;

export interface CachedResponse {
  expires?: string;
}

export interface Settings {
  data: DataKey;
  difficulty: DifficultyKey;
  hide: boolean;
}
