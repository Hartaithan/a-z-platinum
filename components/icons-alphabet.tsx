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
  container:
    "relative flex flex-col items-center rounded-md aspect-square size-full shadow-md shadow-black/25 overflow-hidden",
  letter:
    "absolute top-1/2 left-1/2 text-7xl font-extrabold -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full capitalize text-neutral-300",
};

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { getItemKeys, getItem } = useData();
  const { settings } = useSettings();
  const { getFeatured, openLetterModal } = useFeatured();

  const dataKey = settings.data;
  const { items, hasItems, status } = getItemKeys({
    dataKey,
    letter,
    year,
  });

  const featured = getFeatured({ letter, year, dataKey, fallback: items[0] });
  const item = getItem(featured);
  const title = getTitle(settings.data, item);

  if (!hasItems) {
    return (
      <div className={cn(styles.container, "bg-neutral-200/75")}>
        <b className={cn(styles.letter, status)}>{letter}</b>
      </div>
    );
  }

  return (
    <div
      className={cn(styles.container, "cursor-pointer")}
      onClick={() => openLetterModal(items, letter)}>
      <GameImage
        className="size-full rounded-none bg-neutral-800"
        imgSizes={{ width: 132 }}
        src={item?.trophy?.image_url ?? ""}
        alt={item?.title ?? "Game image"}
      />
      <p className="text-shadow absolute bottom-2 left-2 z-20 w-[88%] text-xs leading-[normal] font-extrabold break-words text-white">
        {title}
      </p>
      <div className="absolute z-10 size-full bg-linear-to-b from-transparent via-black/10 via-80% to-black/60" />
      <b className={cn("hidden", status)}>{letter}</b>
    </div>
  );
};

const IconsAlphabet: FC = () => {
  const { getDifficulty } = useSettings();
  const letters = getDifficulty();
  return (
    <div className="@capture:grid-cols-7 container mx-auto grid grid-cols-4 gap-4 py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default IconsAlphabet;
