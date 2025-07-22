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
  badge:
    "absolute z-10 flex items-center justify-center rounded-md border border-black/20 bg-white px-1 text-xs capitalize shadow-md",
};

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { year } = useFilters();
  const { profile, getItemKeys, getItem } = useData();
  const { settings } = useSettings();
  const { getFeatured, openLetterModal } = useFeatured();

  const dataKey = settings.data;
  const { items, hasItems, count, status } = getItemKeys({
    dataKey,
    letter,
    year,
  });

  const featured = getFeatured({
    name: profile?.name,
    letter,
    year,
    dataKey,
    fallback: items[0],
  });
  const item = getItem(featured);
  const title = getTitle(settings.data, item);

  if (!hasItems) {
    return (
      <div className={cn(styles.container, "bg-neutral-100")}>
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
      <b
        className={cn(
          styles.badge,
          "top-2 left-2 size-5 rounded-full px-0",
          status,
        )}>
        {letter}
      </b>
      {hasItems && count > 1 && (
        <b className={cn(styles.badge, "top-2 right-2", status)}>
          {`+${count - 1}`}
        </b>
      )}
      <div className="absolute z-10 flex size-full flex-col justify-end bg-linear-to-b from-transparent via-transparent via-60% to-black/60 p-2">
        <p className="text-shadow line-clamp-3 text-xs leading-[normal] font-extrabold break-words text-ellipsis text-white">
          {title}
        </p>
      </div>
    </div>
  );
};

const IconsAlphabet: FC = () => {
  const { getDifficulty } = useSettings();
  const letters = getDifficulty();
  return (
    <div className="@capture:grid-cols-7 container mx-auto grid grid-cols-3 gap-4 py-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default IconsAlphabet;
