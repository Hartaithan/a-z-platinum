import CompletionTag from "@/components/completion-tag";
import GameImage from "@/components/game-image";
import PlatformTags from "@/components/platform-tag";
import { useData } from "@/providers/data";
import { FC } from "react";

interface Props {
  item: string;
}

const GameContent: FC<Props> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const game = getItem(item);
  if (!game) return null;
  return (
    <div className="flex w-full items-center">
      <GameImage src={game?.image_url} alt={game?.title} />
      <div className="ml-3 flex-1">
        <h1 className="pr-6 text-sm leading-[normal] font-bold md:text-base">
          {game?.title}
        </h1>
        <div className="mt-1 flex flex-wrap gap-1 text-xs">
          <CompletionTag completion={game?.completion} />
          <PlatformTags platforms={game?.platforms} />
        </div>
      </div>
    </div>
  );
};

export default GameContent;
