import { themeKey } from "@/constants/storage";
import type { Theme } from "@/models/app";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const theme: Theme = await req.json();
  const store = await cookies();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  store.set(themeKey, theme, { expires });
  return NextResponse.json(theme);
};
