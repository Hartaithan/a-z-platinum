import { DataKey } from "@/models/data";
import { NullablePlatinum } from "@/models/platinum";

export const getTitle = (dataKey: DataKey, item: NullablePlatinum) => {
  if (dataKey === "names") return item?.trophy?.title;
  return item?.title;
};
