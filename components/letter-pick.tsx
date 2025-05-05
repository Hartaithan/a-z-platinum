import { usePick } from "@/providers/pick";
import { Button } from "@/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { FC, useCallback, useMemo } from "react";

interface Props {
  item: string;
  letter?: string;
}

const LetterPick: FC<Props> = (props) => {
  const { item, letter } = props;
  const { setPick, getPickedKey } = usePick();

  const isActive = useMemo(() => {
    return getPickedKey(letter, "") === item;
  }, [getPickedKey, item, letter]);

  const handlePick = useCallback(
    () => setPick(item, letter ?? ""),
    [item, letter, setPick],
  );

  return (
    <Button
      className="absolute top-3 right-3 cursor-pointer"
      onClick={handlePick}
      unstyled>
      {isActive ? <BookmarkCheck /> : <Bookmark />}
    </Button>
  );
};

export default LetterPick;
