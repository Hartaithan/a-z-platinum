"use client";

import { useProgress } from "@/hooks/use-progress";
import { useFilters } from "@/providers/filters";
import { FC } from "react";

const Progress: FC = () => {
  const { year } = useFilters();
  const { label, completed, total } = useProgress();
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
      <div className="mt-1 h-2 rounded bg-neutral-100">
        <div
          className="h-full rounded bg-black transition-all duration-700 ease-in-out"
          style={{ width: label }}
        />
      </div>
    </div>
  );
};

export default Progress;
