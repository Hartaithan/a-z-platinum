"use client";

import { LetterModalData } from "@/models/letter";
import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";

type Props = PropsWithChildren & Partial<LetterModalData>;

type Context = Partial<LetterModalData>;

const initialValue: Context = {
  items: [],
  letter: "",
};

const Context = createContext<Context>(initialValue);

const LetterProvider: FC<Props> = (props) => {
  const { children, items, letter } = props;

  const exposed = useMemo(
    () => ({ items, letter }) satisfies Context,
    [items, letter],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useLetter = (): Context => useContext(Context);

export default LetterProvider;
