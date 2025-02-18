import type { CachedResponse, Response } from "@/models/app";
import type { FetchSource } from "@/models/fetch";
import type { TrophyCounts } from "@/models/trophy";

export interface ProfileLevel {
  value: number;
  progress: number;
}

export interface Profile {
  name: string;
  avatar_url: string;
  level: ProfileLevel;
  counts: TrophyCounts;
  games_played: number;
  completed_games: number;
  completion: number;
  unearned_trophies: number;
  trophies_per_day: number;
  views: number;
  country: string;
  world_rank: number;
  country_rank: number;
  plus: boolean;
}

export type NullableProfile = Profile | null;

export interface ProfileResponseData extends CachedResponse {
  profile: Profile;
}

export type ProfileResponse = Response<ProfileResponseData>;

export interface FetchProfileParams {
  id: string;
  source?: FetchSource;
}
