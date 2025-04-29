"use client";

import { completed, letters } from "@/constants/letters";
import { useData } from "@/providers/data";
import { toFixed } from "@/utils/number";
import { useEffect, useState } from "react";

const defaultProgress = { count: 0, value: 0, left: 0, label: "0%" };

export const getProgress = (current: number, total: number) => {
  const progress = (current / total) * 100;
  const notValid = progress < 0 || isNaN(progress) || !isFinite(progress);
  if (notValid) return { value: 0, label: "0%" };
  return { value: progress, label: `${toFixed(progress)}%` };
};

export const useProgress = () => {
  const { getItemKeys } = useData();
  const [progress, setProgress] = useState(defaultProgress);
  const total = letters.length;

  useEffect(() => {
    const count = document.getElementsByClassName(completed)?.length || 0;
    const { value, label } = getProgress(count, total);
    const left = total - count;
    setProgress({ count, value, left, label });
  }, [getItemKeys, total]);

  return { ...progress, total };
};
