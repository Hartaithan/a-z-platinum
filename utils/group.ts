import { Data } from "@/models/data";
import {
  GroupedPlatinumKeys,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";

const setItem = (key: string, item: Platinum, list: GroupedPlatinumKeys) => {
  if (list[key] !== undefined) {
    list[key].push(item.id);
  } else {
    list[key] = [item.id];
  }
};

const groupItem = (group: Data, item: Platinum) => {
  if (!item.trophy?.earned_at) return group;
  const year = item.trophy.earned_at.slice(0, 4);

  const isPlatinum = item?.completion === "platinum";
  if (isPlatinum) setItem(year, item, group.platinums);

  const isComplete = item?.completion === "complete";
  if (isComplete) setItem(year, item, group.completes);

  const isUltraRare = item?.trophy?.rarity === "ultra-rare";
  if (isPlatinum && isUltraRare) setItem(year, item, group["ultra-rare"]);

  setItem(year, item, group.all);

  return group;
};

export const groupPlatinumList = (list: NullablePlatinum[]): Data =>
  list.reduce<Data>(
    (acc, item) => {
      if (!item) return acc;
      const { id } = item;
      acc.games[id] = item;
      return groupItem(acc, item);
    },
    {
      games: {},
      platinums: {},
      completes: {},
      ["ultra-rare"]: {},
      all: {},
    },
  );
