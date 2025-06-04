"use client";

import type { Theme } from "@/models/app";
import { useTheme } from "@/providers/theme";
import { captureElement } from "@/utils/capture";
import { readError } from "@/utils/error";
import type { RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type FC,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";

interface Context {
  captureRef: RefObject<HTMLDivElement | null>;
  capture: () => Promise<Blob | null>;
}

const initialValue: Context = {
  captureRef: { current: null },
  capture: async () => null,
};

const Context = createContext<Context>(initialValue);

const sizes: Record<Theme, { width: number }> = {
  cards: { width: 1100 },
  list: { width: 1100 },
};

const CaptureProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const captureRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { width } = sizes[theme];

  const capture = useCallback(async (): Promise<Blob | null> => {
    const calendar = captureRef.current;
    const hidden = tempRef.current;
    if (!calendar || !hidden) return null;
    try {
      hidden.innerHTML = "";
      hidden.appendChild(calendar.cloneNode(true));
      const image = await captureElement(hidden, theme);
      if (!image) throw new Error("Unable to generate image");
      return image;
    } catch (error) {
      console.error("generate image error", error);
      const message = readError(error);
      toast.error(message);
      return null;
    } finally {
      hidden.innerHTML = "";
    }
  }, [theme]);

  const exposed: Context = useMemo(
    () => ({ captureRef, capture }) satisfies Context,
    [captureRef, capture],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <div className="fixed top-0 -left-full -z-50 h-full w-full overflow-hidden">
        <div
          className="@container flex flex-col"
          ref={tempRef}
          style={{ width }}
        />
      </div>
    </Context.Provider>
  );
};

export const useCapture = (): Context => useContext(Context);

export default CaptureProvider;
