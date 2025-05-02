import Game from "@/components/game";
import { usePick } from "@/providers/pick";
import { FC, memo, useCallback } from "react";

interface ItemProps {
  item: string;
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
    <div className="flex flex-col rounded-md border p-3" onClick={handlePick}>
      <Game item={item} />
    </div>
  );
};

const LetterItem = memo(Item);

export default LetterItem;
