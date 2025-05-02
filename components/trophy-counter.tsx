import { TrophyType } from "@/models/trophy";
import { cn } from "@/utils/styles";
import { Trophy } from "lucide-react";
import { FC } from "react";

const colors: Record<TrophyType, string> = {
  platinum: "bg-blue-100 text-blue-800",
  gold: "bg-amber-100 text-amber-800",
  silver: "bg-gray-200 text-gray-700",
  bronze: "bg-amber-800/20 text-amber-900",
};

interface Props {
  type: TrophyType;
  count: number;
  earned: number;
}

const TrophyCounter: FC<Props> = (props) => {
  const { type, count, earned } = props;
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex size-6 items-center justify-center gap-1 rounded-full",
          colors[type],
        )}>
        <Trophy className="size-3" />
      </div>
      <span className="text-sm font-medium">{`${earned} / ${count}`}</span>
    </div>
  );
};

export default TrophyCounter;
