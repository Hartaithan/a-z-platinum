"use client";

import type confetti from "canvas-confetti";
import type { FC, PropsWithChildren, RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

type Options = Parameters<typeof confetti>[0];

interface Context {
  confettiRef: RefObject<typeof confetti | null>;
  fire: (options?: Options) => void;
}

const initialValue: Context = {
  confettiRef: { current: null },
  fire: () => null,
};

const delay = 1000;

const Context = createContext<Context>(initialValue);

const ConfettiProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const confettiRef = useRef<typeof confetti | null>(null);

  const fire: Context["fire"] = useCallback(() => {
    if (!confettiRef.current) return;
    confettiRef.current({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const exposed: Context = useMemo(
    () => ({ confettiRef, fire }) satisfies Context,
    [fire],
  );

  useEffect(() => {
    const preload = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const { default: confetti } = await import("canvas-confetti");
        confettiRef.current = confetti;
      } catch (error) {
        console.error("unable to load confetti", error);
      }
    };
    preload();
  }, []);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useConfetti = (): Context => useContext(Context);

export default ConfettiProvider;
