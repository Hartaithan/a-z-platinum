import GameImage from "@/components/game-image";
import { useData } from "@/providers/data";
import { usePick } from "@/providers/pick";
import { FC, memo, useCallback } from "react";

interface GameProps {
  item: string;
}

const Game: FC<GameProps> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const game = getItem(item);
  if (!game) return null;
  return (
    <div className="flex">
      <GameImage src={game?.image_url} alt={game?.title} />
      <div className="ml-3">
        <h1 className="text-sm font-semibold">{game?.title}</h1>
        <div className="mt-1 flex text-xs">
          <p className="rounded bg-neutral-100 px-1.5 py-0.5 capitalize">
            {game?.completion}
          </p>
          {game?.platforms.map((platform) => (
            <p
              key={platform}
              className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5">
              {platform}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ItemProps extends GameProps {
  letter?: string;
}

const Item: FC<ItemProps> = (props) => {
  const { item, letter } = props;
  const { setPick } = usePick();

  const handlePick = useCallback(
    () => setPick(item, letter ?? ""),
    [item, letter, setPick],
  );

  return (
    <div className="flex rounded-md border p-3" onClick={handlePick}>
      <Game item={item} />
    </div>
  );
};

const LetterItem = memo(Item);

export default LetterItem;
