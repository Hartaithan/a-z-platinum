"use client";

import { completed, letters } from "@/constants/letters";
import { useData } from "@/providers/data";
import { useEffect, useState } from "react";

const defaultProgress = { count: 0, value: 0, left: 0 };

export const useProgress = () => {
  const { getItemKeys } = useData();
  const [progress, setProgress] = useState(defaultProgress);
  const total = letters.length;

  useEffect(() => {
    const count = document.getElementsByClassName(completed)?.length || 0;
    const value = (count * 100) / total;
    const left = total - count;
    setProgress({ count, value, left });
  }, [getItemKeys, total]);

  return { ...progress, total };
};
