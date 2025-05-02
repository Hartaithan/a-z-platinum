"use client";

import { letters } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { usePick } from "@/providers/pick";
import { cn } from "@/utils/styles";
import { FC } from "react";

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getItemKeys, getItem } = useData();
  const { getPickedKey, openLetterModal } = usePick();
  const { items, hasItems, count, status } = getItemKeys({ letter, year });

  const key = getPickedKey(letter, items[0]);
  const item = getItem(key);

  return (
    <div className={cn("flex items-center", status)}>
      <p className="w-5 text-center font-bold capitalize">{letter}</p>
      <p>-&nbsp;</p>
      {hasItems && (
        <p
          className="cursor-pointer"
          onClick={() => openLetterModal(items, letter)}>
          {item?.title}
        </p>
      )}
      {hasItems && count > 1 && (
        <p className="text-sm text-neutral-500">
          &nbsp;{`(${count - 1} more...)`}
        </p>
      )}
    </div>
  );
};

const ListAlphabet: FC = () => {
  return (
    <div className="container mx-auto flex flex-col gap-1 py-4">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default ListAlphabet;
