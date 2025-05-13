"use client";

import { useProgress } from "@/hooks/use-progress";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { Progress } from "@/ui/progress";
import { FC } from "react";

const Component: FC = () => {
  const { year } = useFilters();
  const { label, value, completed, total } = useProgress();
  return (
    <div className="container mt-4">
      <div className="flex justify-between">
        <h1 className="font-bold">
          Progress
          {year && <span>&nbsp;{year}</span>}
        </h1>
        <div className="flex items-center gap-x-2 font-bold">
          <p className="leading-[normal]">{label}</p>
          <p className="leading-[normal]">{`(${completed}/${total})`}</p>
        </div>
      </div>
      <Progress className="mt-1" value={value} />
    </div>
  );
};

const AlphabetProgress: FC = () => {
  const { profile } = useData();
  if (!profile) return null;
  return <Component />;
};

export default AlphabetProgress;
