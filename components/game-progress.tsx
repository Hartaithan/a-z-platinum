import ProgressBar from "@/components/progress-bar";
import TrophyCounter from "@/components/trophy-counter";
import { useData } from "@/providers/data";
import { FC } from "react";

interface Props {
  item: string;
}

const GameProgress: FC<Props> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const game = getItem(item);
  if (!game) return null;
  const label = `${game?.progress}%`;
  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">Progress</span>
        <span className="font-bold">{label}</span>
      </div>
      <ProgressBar value={label} />
      <div className="mt-2 flex justify-center gap-3">
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
