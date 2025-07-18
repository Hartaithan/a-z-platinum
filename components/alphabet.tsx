"use client";

import CardsAlphabet from "@/components/cards-alphabet";
import IconsAlphabet from "@/components/icons-alphabet";
import ListAlphabet from "@/components/list-alphabet";
import { defaultTheme } from "@/constants/app";
import { Theme } from "@/models/app";
import { useTheme } from "@/providers/theme";
import { FC } from "react";

const alphabet: Record<Theme, FC> = {
  cards: CardsAlphabet,
  list: ListAlphabet,
  icons: IconsAlphabet,
};

const PickedAlphabet: FC = () => {
  const { theme } = useTheme();
  const Picked = alphabet[theme || defaultTheme];
  return <Picked />;
};

const Alphabet: FC = () => {
  return <PickedAlphabet />;
};

export default Alphabet;
