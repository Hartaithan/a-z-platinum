"use client";

import PickModal, { PickModalData } from "@/components/pick-modal";
import { pickKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useModal } from "@/hooks/use-modal";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

type State = Record<string, string>;

interface Context {
  setPick: (key: string, letter: string) => void;
  getPickedKey: (letter: string, fallback: string) => string | null;
  openPickModal: (items: string[], letter: string) => void;
}

const initial: Context = {
  setPick: () => null,
  getPickedKey: () => null,
  openPickModal: () => null,
};

const Context = createContext<Context>(initial);

const PickProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [picked, setPicked] = useLocalStorage<State>({
    defaultValue: {},
    key: pickKey,
  });
  const [modal, open, close] = useModal<PickModalData>();

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

  const openPickModal: Context["openPickModal"] = useCallback(
    (items, letter) => open({ items, letter }),
    [open],
  );

  const exposed = useMemo(
    () => ({ setPick, getPickedKey, openPickModal }) satisfies Context,
    [setPick, getPickedKey, openPickModal],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <PickModal {...modal} title="Pick platinum modal" onClose={close} />
    </Context.Provider>
  );
};

export const usePick = (): Context => useContext(Context);

export default PickProvider;
