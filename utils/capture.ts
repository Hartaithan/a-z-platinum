"use client";

import type { Theme } from "@/models/app";
import { isMobile, isSafari } from "@/utils/device";
import type { Options } from "modern-screenshot";
import { domToBlob } from "modern-screenshot";

type Step = "final" | "pre";

type GetOptions = (theme: Theme) => Options;

// TODO: fix long drawing on second call and remove this
const timeout = 2000;

const background: Record<Theme, string> = {
  cards: "#FFFFFF",
  list: "#FFFFFF",
  icons: "#FFFFFF",
};

const options: Record<Step, GetOptions> = {
  pre: () => ({
    quality: 1,
    type: "image/png",
    timeout,
  }),
  final: (theme) => ({
    scale: isSafari() ? 1 : 2,
    quality: 1,
    type: "image/png",
    captureElementInterval: 1000,
    backgroundColor: background[theme],
    fetch: { bypassingCache: true },
    timeout,
  }),
};

export const captureElement = async (
  element: HTMLDivElement | null,
  theme: Theme,
): Promise<Blob | null> => {
  if (!element) return null;
  try {
    const pre = options.pre(theme);
    const final = options.final(theme);
    await domToBlob(element, pre);
    if (isMobile()) await domToBlob(element, pre);
    const image = await domToBlob(element, final);
    return image;
  } catch (error) {
    console.error("draw image error", error);
    return null;
  }
};

interface Debug {
  enable: false;
  styles: Partial<CSSStyleDeclaration>;
}

const debug: Debug = {
  enable: false,
  styles: {
    left: "0",
    overflow: "auto",
    zIndex: "999",
    background: "white",
  },
};

export const debugCapture = (element?: HTMLDivElement | null): boolean => {
  if (!debug.enable || !element?.parentElement) return false;
  Object.assign(element.parentElement.style, debug.styles);
  return true;
};
