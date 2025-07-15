"use client";

import { themeKey } from "@/constants/storage";
import posthog from "posthog-js";

export const withTheme = (event: Record<string, unknown>) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === themeKey) {
      return { theme: decodeURIComponent(value), ...event };
    }
  }
  return event;
};

type PostHog = typeof posthog;
type CaptureParams = Parameters<PostHog["capture"]>;

export const capture = (...params: CaptureParams) => {
  const [event, ...rest] = params;
  posthog.capture("az-" + event, ...rest);
};
