import ListAlphabet from "@/components/list-alphabet";
import { defaultTheme } from "@/constants/app";
import { Theme } from "@/models/app";
import { FC } from "react";

const alphabet: Record<Theme, FC> = {
  list: ListAlphabet,
};

const PickedAlphabet: FC = () => {
  const theme: Theme = "list";
  const Picked = alphabet[theme || defaultTheme];
  return <Picked />;
};

const Alphabet: FC = () => {
  return <PickedAlphabet />;
};

export default Alphabet;
