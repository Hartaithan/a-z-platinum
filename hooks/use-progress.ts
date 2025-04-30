"use client";

import { status, useData } from "@/providers/data";
import { toFixed } from "@/utils/number";
import { useEffect, useState } from "react";

const defaultProgress = {
  completed: 0,
  uncompleted: 0,
  total: 0,
  value: 0,
  label: "0%",
};

export const getProgress = (current: number, total: number) => {
  const progress = (current / total) * 100;
  const notValid = progress < 0 || isNaN(progress) || !isFinite(progress);
  if (notValid) return { value: 0, label: "0%" };
  return { value: progress, label: `${toFixed(progress)}%` };
};

const getCount = (className: string) =>
  document.getElementsByClassName(className)?.length || 0;

export const useProgress = () => {
  const { getItemKeys } = useData();
  const [progress, setProgress] = useState(defaultProgress);

  useEffect(() => {
    const completed = getCount(status.completed);
    const uncompleted = getCount(status.uncompleted);
    const total = completed + uncompleted;
    const { value, label } = getProgress(completed, total);
    setProgress({ completed, uncompleted, total, value, label });
  }, [getItemKeys]);

  return { ...progress };
};
