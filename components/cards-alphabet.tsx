"use client";

import GameImage from "@/components/game-image";
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

const styles = {
  container: "flex flex-col items-center rounded",
  letter:
    "absolute top-2 left-2 z-10 flex size-7 items-center justify-center rounded-full bg-white capitalize shadow-md",
};

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getItemKeys, getItem } = useData();
  const { settings } = useSettings();
  const { getFeatured, openLetterModal } = useFeatured();

  const dataKey = settings.data;
  const { items, hasItems, count, status } = getItemKeys({
    dataKey,
    letter,
    year,
  });

  const featured = getFeatured({ letter, year, dataKey, fallback: items[0] });
  const item = getItem(featured);
  const title = getTitle(settings.data, item);

  if (!hasItems) {
    return (
      <div className={styles.container}>
        <div className="relative h-24 w-full overflow-hidden rounded">
          <div className="h-full border-2 border-dashed bg-black/5" />
          <b className={cn(styles.letter, "opacity-50", status)}>{letter}</b>
        </div>
        <p className="mt-1 text-center text-sm font-semibold text-neutral-400">
          Empty
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(styles.container, "cursor-pointer")}
      onClick={() => openLetterModal(items, letter)}>
      <div className="relative h-24 w-full overflow-hidden rounded">
        <GameImage
          className="size-full rounded-none"
          src={item?.image_url ?? ""}
          alt={item?.title ?? "Game image"}
        />
        <b className={cn(styles.letter, status)}>{letter}</b>
        {hasItems && count > 1 && (
          <b className="absolute top-2 right-2 z-10 flex items-center justify-center rounded-md bg-white px-1.5 text-sm capitalize shadow-md">
            {`+${count - 1}`}
          </b>
        )}
      </div>
      <p className="mt-1 text-center text-sm font-semibold">{title}</p>
      <p className="text-sm">{`${item?.trophy?.rarity_label}, ${item?.trophy?.earned_rate}%`}</p>
    </div>
  );
};

const CardsAlphabet: FC = () => {
  const { getDifficulty } = useSettings();
  const letters = getDifficulty();
  return (
    <div className="@capture:grid-cols-5 container mx-auto grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default CardsAlphabet;
