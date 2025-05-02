import CompletionTag from "@/components/completion-tag";
import GameImage from "@/components/game-image";
import GameProgress from "@/components/game-progress";
import PlatformTags from "@/components/platform-tag";
import { useData } from "@/providers/data";
import { FC } from "react";

interface Props {
  item: string;
}

const Game: FC<Props> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const game = getItem(item);
  if (!game) return null;
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <GameImage src={game?.image_url} alt={game?.title} />
        <div className="ml-3">
          <h1 className="font-bold">{game?.title}</h1>
          <div className="mt-1 flex gap-1 text-xs">
            <CompletionTag completion={game?.completion} />
            <PlatformTags platforms={game?.platforms} />
          </div>
        </div>
      </div>
      <GameProgress item={item} />
    </div>
  );
};

export default Game;
