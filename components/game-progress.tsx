import TrophyCounter from "@/components/trophy-counter";
import { useData } from "@/providers/data";
import { Progress } from "@/ui/progress";
import { FC } from "react";

interface Props {
  item: string;
}

const GameProgress: FC<Props> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const game = getItem(item);
  if (!game) return null;
  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">Progress</span>
        <span className="font-bold">{`${game?.progress}%`}</span>
      </div>
      <Progress value={game?.progress} />
      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
        <TrophyCounter
          type="platinum"
          earned={game.earned_counts.platinum}
          count={game.counts.platinum}
        />
        <TrophyCounter
          type="gold"
          earned={game.earned_counts.gold}
          count={game.counts.gold}
        />
        <TrophyCounter
          type="silver"
          earned={game.earned_counts.silver}
          count={game.counts.silver}
        />
        <TrophyCounter
          type="bronze"
          earned={game.earned_counts.bronze}
          count={game.counts.bronze}
        />
      </div>
    </div>
  );
};

export default GameProgress;
