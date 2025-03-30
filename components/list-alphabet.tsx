"use client";

import GameImage from "@/components/game-image";
import { useData } from "@/providers/data";
import { FC } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#0賞".split("");

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { getItemKeys, getItem } = useData();
  const { items, hasItems, count } = getItemKeys({ letter });
  const firstKey = hasItems ? items[0] : null;
  const item = getItem(firstKey);
  return (
    <div className="flex items-center gap-3 rounded-md border px-3 py-2.5">
      <p className="w-7 min-w-7 text-center text-3xl font-extrabold capitalize">
        {letter}
      </p>
      {item && <GameImage src={item?.image_url} alt={item?.title} />}
      <div className="flex flex-col text-xs">
        {hasItems ? (
          <>
            <p className="text-sm font-medium">{item?.title}</p>
            {item?.trophy?.earned_at && (
              <p>{new Date(item.trophy.earned_at).toLocaleString()}</p>
            )}
            <p>{count} plats</p>
          </>
        ) : (
          <p>not found</p>
        )}
      </div>
    </div>
  );
};

const ListAlphabet: FC = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default ListAlphabet;
