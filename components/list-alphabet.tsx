"use client";

import { letters } from "@/constants/letters";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { usePick } from "@/providers/pick";
import { FC } from "react";

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getPickedKey } = usePick();
  const { getItemKeys, getItem } = useData();
  const { items, hasItems, count } = getItemKeys({ letter, year });

  const key = getPickedKey(letter, items[0]);
  const item = getItem(key);

  return (
    <div className="flex items-center">
      <p className="w-5 text-center font-bold capitalize">{letter}</p>
      <p className="mr-1">-</p>
      {hasItems && (
        <>
          <p>{item?.title}</p>
          <p className="text-sm text-neutral-500">&nbsp;({count} more...) </p>
        </>
      )}
    </div>
  );
};

const ListAlphabet: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default ListAlphabet;
