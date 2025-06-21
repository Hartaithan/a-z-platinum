"use client";

import { letterStatus } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useFilters } from "@/providers/filters";
import { useSettings } from "@/providers/settings";
import { getCount, getProgress } from "@/utils/progress";
import { useEffect, useState } from "react";

const defaultProgress = {
  completed: 0,
  uncompleted: 0,
  total: 0,
  value: 0,
  label: "0%",
};

export const useProgress = () => {
  const { getItemKeys } = useData();
  const { year } = useFilters();
  const { settings } = useSettings();
  const [progress, setProgress] = useState(defaultProgress);

  useEffect(() => {
    const completed = getCount(letterStatus.completed);
    const uncompleted = getCount(letterStatus.uncompleted);
    const total = completed + uncompleted;
    const { value, label } = getProgress(completed, total);
    setProgress({ completed, uncompleted, total, value, label });
  }, [settings.data, settings.difficulty, year, getItemKeys]);

  return progress;
};
