"use client";

import CongratulationPopup, {
  CongratulationPopupHandle,
} from "@/components/congratulation-popup";
import { letterStatus } from "@/constants/alphabet";
import { sleep } from "@/utils/async";
import { getCount } from "@/utils/progress";
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
  check: () => void;
}

const initialValue: Context = {
  confettiRef: { current: null },
  fire: () => null,
  check: () => null,
};

const delay = 1000;

const Context = createContext<Context>(initialValue);

const CongratulationProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const confettiRef = useRef<typeof confetti | null>(null);
  const popupRef = useRef<CongratulationPopupHandle>(null);

  const fire: Context["fire"] = useCallback(() => {
    if (!confettiRef.current) return;
    confettiRef.current({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const check: Context["check"] = useCallback(() => {
    const uncompleted = getCount(letterStatus.uncompleted);
    if (uncompleted > 0) return;
    popupRef.current?.open();
    fire();
  }, [fire]);

  const exposed: Context = useMemo(
    () => ({ confettiRef, fire, check }) satisfies Context,
    [fire, check],
  );

  useEffect(() => {
    const preload = async () => {
      try {
        await sleep(delay);
        const { default: confetti } = await import("canvas-confetti");
        confettiRef.current = confetti;
      } catch (error) {
        console.error("unable to load confetti", error);
      }
    };
    preload();
  }, []);

  return (
    <Context.Provider value={exposed}>
      {children}
      <CongratulationPopup ref={popupRef} />
    </Context.Provider>
  );
};

export const useCongratulation = (): Context => useContext(Context);

export default CongratulationProvider;
