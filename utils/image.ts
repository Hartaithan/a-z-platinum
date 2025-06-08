"use client";

import { APP_URL } from "@/constants/variables";

export const getImageURL = (url: string | undefined): string => {
  if (!url) return "";
  if (url.trim().length === 0) return url;
  const parsed = new URL(url);
  return APP_URL + "/api/image" + parsed.pathname;
};

export const downloadImage = (image: Blob | null, name?: string) => {
  if (!image) return;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(image);
  link.download = `${name ?? "a-z platinum challenge"}.png`;
  link.click();
  link.remove();
};
