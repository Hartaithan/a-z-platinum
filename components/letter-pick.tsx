import { usePick } from "@/providers/pick";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { FC, memo, useCallback, useMemo } from "react";

interface Props {
  item: string;
  letter?: string;
}

const Component: FC<Props> = (props) => {
  const { item, letter } = props;
  const { setPick, getPickedKey } = usePick();

  const isActive = useMemo(
    () => getPickedKey(letter, "") === item,
    [getPickedKey, item, letter],
  );

  const handlePick = useCallback(() => {
    if (!letter) return;
    setPick(item, letter);
  }, [item, letter, setPick]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handlePick}>
          {isActive ? <BookmarkCheck /> : <Bookmark />}
        </TooltipTrigger>
        <TooltipContent>
          <p>Set this game as the main one</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LetterPick = memo(Component);

export default LetterPick;
