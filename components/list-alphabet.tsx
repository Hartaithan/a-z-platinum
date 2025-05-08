"use client";

import { letters } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useFeatured } from "@/providers/featured";
import { useFilters } from "@/providers/filters";
import { cn } from "@/utils/styles";
import { FC } from "react";

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getItemKeys, getItem } = useData();
  const { getFeatured, openLetterModal } = useFeatured();
  const { items, hasItems, count, status } = getItemKeys({ letter, year });

  const key = getFeatured(letter, items[0]);
  const item = getItem(key);

  return (
    <div className={cn("flex items-center", status)}>
      <p className="w-5 text-center font-bold capitalize">{letter}</p>
      <p>-</p>
      {hasItems && (
        <span
          className="cursor-pointer"
          onClick={() => openLetterModal(items, letter)}>
          <span>&nbsp;{item?.title}</span>
          <span> | </span>
          <span className="text-sm">{`${item?.trophy?.rarity_label} ${item?.trophy?.earned_rate}%`}</span>
        </span>
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
