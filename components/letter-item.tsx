import GameContent from "@/components/game-content";
import GameProgress from "@/components/game-progress";
import GameTrophy from "@/components/game-trophy";
import LetterFeatured from "@/components/letter-featured";
import { FC, memo } from "react";

interface ItemProps {
  item: string;
  letter?: string;
}

const Item: FC<ItemProps> = (props) => {
  const { item, letter } = props;
  return (
    <div className="relative flex flex-col rounded-md border p-3">
      <LetterFeatured item={item} letter={letter} />
      <GameContent item={item} />
      <GameProgress item={item} />
      <GameTrophy item={item} />
    </div>
  );
};

const LetterItem = memo(Item);

export default LetterItem;
