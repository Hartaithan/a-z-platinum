import { DataKey } from "@/models/data";
import type { NullablePlatinum } from "@hartaithan/trophy-scout/types";

export const getTitle = (dataKey: DataKey, item: NullablePlatinum) => {
  if (dataKey === "names") return item?.trophy?.title;
  return item?.title;
};
