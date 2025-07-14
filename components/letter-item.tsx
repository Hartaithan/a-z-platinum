import GameContent from "@/components/game-content";
import GameProgress from "@/components/game-progress";
import GameTrophy from "@/components/game-trophy";
import LetterFeatured from "@/components/letter-featured";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FC, memo } from "react";

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  item: string;
  last: boolean;
}

const LetterItem: FC<ItemProps> = (props) => {
  const { item, last, ...rest } = props;
  return (
    <div
      className={cn(
        "relative mb-3 flex flex-col rounded-md border p-3",
        last && "mb-0",
      )}
      {...rest}>
      <LetterFeatured item={item} />
      <GameContent item={item} />
      <GameProgress item={item} />
      <GameTrophy item={item} />
    </div>
  );
};

export default memo(LetterItem);
