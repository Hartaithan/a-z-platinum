import { useData } from "@/providers/data";
import { useFeatured } from "@/providers/featured";
import { useFilters } from "@/providers/filters";
import { useLetter } from "@/providers/letter";
import { useSettings } from "@/providers/settings";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { FC, memo, useCallback, useMemo } from "react";

interface Props {
  item: string;
}

const LetterFeatured: FC<Props> = (props) => {
  const { item } = props;
  const { profile } = useData();
  const { year } = useFilters();
  const { letter } = useLetter();
  const { settings } = useSettings();
  const { getFeatured, setFeatured } = useFeatured();

  const dataKey = settings.data;

  const isFeatured = useMemo(
    () =>
      getFeatured({
        name: profile?.name,
        letter,
        year,
        dataKey,
        fallback: "",
      }) === item,
    [profile?.name, getFeatured, item, letter, year, dataKey],
  );

  const handleFeatured = useCallback(() => {
    if (!letter) return;
    setFeatured({
      name: profile?.name,
      key: item,
      letter,
      year,
      dataKey,
    });
  }, [profile?.name, item, letter, year, dataKey, setFeatured]);

  return (
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
  );
};

export default memo(LetterFeatured);
