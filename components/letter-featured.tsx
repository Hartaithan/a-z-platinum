import { useFeatured } from "@/providers/featured";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
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
  const { year } = useFilters();
  const { settings } = useSettings();
  const { getFeatured, setFeatured } = useFeatured();

  const dataKey = settings.data;

  const isFeatured = useMemo(
    () => getFeatured({ letter, year, dataKey, fallback: "" }) === item,
    [getFeatured, item, letter, year, dataKey],
  );

  const handleFeatured = useCallback(() => {
    if (!letter) return;
    setFeatured({ key: item, letter, year, dataKey });
  }, [item, letter, year, dataKey, setFeatured]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="absolute top-3 right-3"
          onClick={handleFeatured}>
          {isFeatured ? <BookmarkCheck /> : <Bookmark />}
        </TooltipTrigger>
        <TooltipContent>
          <p>Set this game as the main one</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LetterFeatured = memo(Component);

export default LetterFeatured;
