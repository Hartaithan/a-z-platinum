"use client";

import LetterModal, { LetterModalData } from "@/components/letter-modal";
import { featuredKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useModal } from "@/hooks/use-modal";
import { DataKey } from "@/models/data";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

type State = Record<string, string>;

interface FeaturedParams {
  letter: string | undefined;
  year: number | null;
  dataKey: DataKey;
}

interface GetFeaturedParams extends FeaturedParams {
  fallback: string;
}

type GetFeaturedKeyParams = FeaturedParams;

interface SetFeaturedParams extends FeaturedParams {
  key: string;
}

interface Context {
  setFeatured: (params: SetFeaturedParams) => void;
  resetFeatured: () => void;
  getFeatured: (params: GetFeaturedParams) => string | null;
  openLetterModal: (items: string[], letter: string) => void;
}

const initial: Context = {
  setFeatured: () => null,
  resetFeatured: () => null,
  getFeatured: () => null,
  openLetterModal: () => null,
};

const Context = createContext<Context>(initial);

const getFeaturedKey = (params: GetFeaturedKeyParams) => {
  const { letter, year, dataKey } = params;
  return [letter, dataKey ?? "*", year ?? "*"].join("-");
};

const FeaturedProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [featured, setFeaturedState] = useLocalStorage<State>({
    defaultValue: {},
    key: featuredKey,
  });
  const [modal, open, close] = useModal<LetterModalData>();

  const setFeatured: Context["setFeatured"] = useCallback(
    (params) => {
      const { key, letter, year, dataKey } = params;
      const featuredKey = getFeaturedKey({ letter, year, dataKey }) ?? letter;
      setFeaturedState((prev) => {
        const copy = { ...prev };
        copy[featuredKey] = key;
        return copy;
      });
    },
    [setFeaturedState],
  );

  const resetFeatured: Context["resetFeatured"] = useCallback(() => {
    setFeaturedState({});
  }, [setFeaturedState]);

  const getFeatured: Context["getFeatured"] = useCallback(
    (params) => {
      const { letter, year, dataKey, fallback } = params;
      const keyParams = { letter: letter ?? "", year, dataKey };
      const featuredKey = getFeaturedKey(keyParams);
      return featured[featuredKey] ?? fallback;
    },
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
