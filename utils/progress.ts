import { toFixed } from "@/utils/number";

export const getCount = (className: string) =>
  document.getElementsByClassName(className)?.length || 0;

export const getProgress = (current: number, total: number) => {
  const progress = (current / total) * 100;
  const notValid = progress < 0 || isNaN(progress) || !isFinite(progress);
  if (notValid) return { value: 0, label: "0%" };
  return { value: progress, label: `${toFixed(progress)}%` };
};
