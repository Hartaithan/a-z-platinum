"use server";

import { defaultTheme } from "@/constants/app";
import { themeKey } from "@/constants/storage";
import type { Theme } from "@/models/app";
import { cookies } from "next/headers";

export const getTheme = async (): Promise<Theme> => {
  const store = await cookies();
  const value = store.get(themeKey)?.value as Theme | undefined;
  return value || defaultTheme;
};
