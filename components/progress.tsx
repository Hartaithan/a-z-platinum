"use client";

import { useProgress } from "@/hooks/use-progress";
import { toFixed } from "@/utils/number";
import { FC } from "react";

const Progress: FC = () => {
  const { value, count, total } = useProgress();
  return (
    <div className="container mt-4 flex justify-between">
      <h1 className="font-bold">Progress</h1>
      <div className="mt-1 flex items-center gap-x-2">
        <p className="leading-[normal] font-extrabold">{toFixed(value)}%</p>
        <p className="text-sm leading-[normal]">
          {count}/{total} letters
        </p>
      </div>
    </div>
  );
};

export default Progress;
