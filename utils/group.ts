import { Data, DataKey } from "@/models/data";
import {
  GroupedPlatinumKeys,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";

export interface DataKeyParams {
  dataKey?: DataKey;
  letter: string;
  year?: number | string | null;
}

export const getDataKey = (params: DataKeyParams): [DataKey, string] => {
  const { dataKey = "all", letter, year } = params;
  const y = year ? year.toString() : "*";
  return [dataKey, `${letter}-${y}`];
};

const setItem = (key: string, item: Platinum, list: GroupedPlatinumKeys) => {
  if (list[key] !== undefined) {
    list[key].push(item.id);
  } else {
    list[key] = [item.id];
  }
};

interface SetGroupParams {
  key: string;
  item: Platinum;
  group: Data;
}

const setGroup = (params: SetGroupParams) => {
  const { key, item, group } = params;

  const isPlatinum = item?.completion === "platinum";
  if (isPlatinum) setItem(key, item, group.platinums);

  const isComplete = item?.completion === "complete";
  if (isComplete) setItem(key, item, group.completes);

  const isUltraRare = item?.trophy?.rarity === "ultra-rare";
  if (isPlatinum && isUltraRare) setItem(key, item, group["ultra-rare"]);

  setItem(key, item, group.all);
};

const getGroupKeys = (item: Platinum) => {
  if (!item.trophy?.earned_at) return [];

  const year = Number(item.trophy.earned_at.slice(0, 4));
  const letter = item.title.replace("The ", "")[0].toUpperCase();

  const letterKey = getDataKey({ letter });
  const letterYearKey = getDataKey({ letter, year });

  return [letterKey[1], letterYearKey[1]];
};

const groupItem = (group: Data, item: Platinum) => {
  if (!item.trophy?.earned_at) return group;
  const keys = getGroupKeys(item);
  for (const key of keys) setGroup({ key, item, group });
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
