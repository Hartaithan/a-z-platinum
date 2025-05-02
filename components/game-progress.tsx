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
  const value = `${game?.progress}%`;
  return (
    <div className="mt-2">
      <ProgressBar
        value={value}
        trackClassName="rounded-full h-4"
        fillClassName="rounded-full">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-white mix-blend-exclusion">
          {value}
        </p>
      </ProgressBar>
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
