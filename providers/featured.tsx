"use client";

import LetterModal, { LetterModalData } from "@/components/letter-modal";
import { featuredKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useModal } from "@/hooks/use-modal";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

type State = Record<string, string>;

interface Context {
  setFeatured: (key: string, letter: string) => void;
  resetFeatured: () => void;
  getFeatured: (letter: string | undefined, fallback: string) => string | null;
  openLetterModal: (items: string[], letter: string) => void;
}

const initial: Context = {
  setFeatured: () => null,
  resetFeatured: () => null,
  getFeatured: () => null,
  openLetterModal: () => null,
};

const Context = createContext<Context>(initial);

const FeaturedProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [featured, setFeaturedState] = useLocalStorage<State>({
    defaultValue: {},
    key: featuredKey,
  });
  const [modal, open, close] = useModal<LetterModalData>();

  const setFeatured: Context["setFeatured"] = useCallback(
    (key, letter) => {
      setFeaturedState((prev) => {
        const copy = { ...prev };
        copy[letter] = key;
        return copy;
      });
    },
    [setFeaturedState],
  );

  const resetFeatured: Context["resetFeatured"] = useCallback(() => {
    setFeaturedState({});
  }, [setFeaturedState]);

  const getFeatured: Context["getFeatured"] = useCallback(
    (letter, fallback) => featured[letter ?? ""] ?? fallback,
    [featured],
  );

  const openLetterModal: Context["openLetterModal"] = useCallback(
    (items, letter) => open({ items, letter }),
    [open],
  );

  const exposed = useMemo(() => {
    return {
      setFeatured,
      resetFeatured,
      getFeatured,
      openLetterModal,
    } satisfies Context;
  }, [setFeatured, resetFeatured, getFeatured, openLetterModal]);

  return (
    <Context.Provider value={exposed}>
      {children}
      <LetterModal {...modal} onClose={close} />
    </Context.Provider>
  );
};

export const useFeatured = (): Context => useContext(Context);

export default FeaturedProvider;
