"use server";

import { defaultTheme } from "@/constants/app";
import { themeKey } from "@/constants/storage";
import type { Theme } from "@/models/app";
import { cookies } from "next/headers";

export const setTheme = async (value: Theme) => {
  const store = await cookies();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  store.set(themeKey, value, { expires });
};

export const getTheme = async (): Promise<Theme> => {
  const store = await cookies();
  const value = store.get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};
