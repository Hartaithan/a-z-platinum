"use client";

import { APP_URL } from "@/constants/variables";

export const getImageURL = (url: string | undefined): string => {
  if (!url) return "";
  if (url.trim().length === 0) return url;
  const parsed = new URL(url);
  return APP_URL + "/api/image" + parsed.pathname;
};
