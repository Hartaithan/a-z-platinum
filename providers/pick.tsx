"use client";

import { pickKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

type State = Record<string, string>;

interface Context {
  setPick: (key: string, letter: string) => void;
  getPickedKey: (letter: string, fallback: string) => string | null;
}

const initial: Context = {
  setPick: () => null,
  getPickedKey: () => null,
};

const Context = createContext<Context>(initial);

const PickProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [picked, setPicked] = useLocalStorage<State>({
    defaultValue: {},
    key: pickKey,
  });

  const setPick: Context["setPick"] = useCallback(
    (key, letter) => {
      setPicked((prev) => {
        const copy = { ...prev };
        copy[letter] = key;
        return copy;
      });
    },
    [setPicked],
  );

  const getPickedKey: Context["getPickedKey"] = useCallback(
    (letter, fallback) => picked[letter] ?? fallback,
    [picked],
  );

  const exposed = useMemo(
    () => ({ setPick, getPickedKey }) satisfies Context,
    [setPick, getPickedKey],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const usePick = (): Context => useContext(Context);

export default PickProvider;
