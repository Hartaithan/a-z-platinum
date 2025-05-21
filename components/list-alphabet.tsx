"use client";

import { useData } from "@/providers/data";
import { useFeatured } from "@/providers/featured";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { cn } from "@/utils/styles";
import { getTitle } from "@/utils/title";
import { FC } from "react";

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getItemKeys, getItem } = useData();
  const { settings } = useSettings();
  const { getFeatured, openLetterModal } = useFeatured();
  const { items, hasItems, count, status } = getItemKeys({
    dataKey: settings.data,
    letter,
    year,
  });

  const featured = getFeatured(letter, year, items[0]);
  const item = getItem(featured);
  const title = getTitle(settings.data, item);

  return (
    <div className="flex items-center">
      <p className={cn("w-5 text-center font-bold capitalize", status)}>
        {letter}
      </p>
      <p>-</p>
      {hasItems && (
        <span
          className="cursor-pointer"
          onClick={() => openLetterModal(items, letter)}>
          <span>&nbsp;{title}, </span>
          <span className="text-sm font-medium">{`${item?.trophy?.rarity_label} ${item?.trophy?.earned_rate}%`}</span>
        </span>
      )}
      {hasItems && count > 1 && (
        <p className="text-sm font-medium text-neutral-500">
          &nbsp;{`(${count - 1} more...)`}
        </p>
      )}
    </div>
  );
};

const ListAlphabet: FC = () => {
  const { getDifficulty } = useSettings();
  const letters = getDifficulty();
  return (
    <div className="container mx-auto flex flex-col gap-1 py-4">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default ListAlphabet;
