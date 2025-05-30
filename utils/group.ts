import { Data, DataKey, GroupedData } from "@/models/data";
import {
  GroupedPlatinumKeys,
  NullablePlatinum,
  Platinum,
} from "@/models/platinum";
import { recognizeLetter } from "@/utils/letter";

export interface DataKeyParams {
  dataKey?: DataKey;
  letter: string;
  year?: number | string | null;
}

export interface GroupKeysParams {
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

  const isPlus = (item?.trophy?.earned_rate ?? 100) < 1;
  if (isPlatinum && isPlus) setItem(key, item, group["ultra-rare-plus"]);

  setItem(key, item, group.all);
};

const setLetterGroup = (params: SetGroupParams) => {
  const { key, item, group } = params;
  const isPlatinum = item?.completion === "platinum";
  if (!isPlatinum) return;
  setItem(key, item, group.names);
};

const getGroupKeys = (params: GroupKeysParams) => {
  const { letter, year } = params;
  const letterKey = getDataKey({ letter });
  const letterYearKey = getDataKey({ letter, year });
  return [letterKey[1], letterYearKey[1]];
};

const groupItem = (group: GroupedData, item: Platinum) => {
  if (!item.trophy?.earned_at) return group;
  if (!item.trophy?.title) return group;

  const year = Number(item.trophy.earned_at.slice(0, 4));

  const gameLetter = recognizeLetter(item.title);
  const gameKeys = getGroupKeys({ letter: gameLetter, year });
  for (const key of gameKeys) setGroup({ key, item, group });

  const trophyLetter = recognizeLetter(item.trophy.title);
  const trophyKeys = getGroupKeys({ letter: trophyLetter, year });
  for (const key of trophyKeys) setLetterGroup({ key, item, group });

  return group;
};

export const groupPlatinumList = (list: NullablePlatinum[]) =>
  list.reduce<GroupedData>(
    (acc, item) => {
      if (!item) return acc;
      const { id } = item;
      acc.games[id] = item;
      return groupItem(acc, item);
    },
    {
      all: {},
      names: {},
      games: {},
      platinums: {},
      completes: {},
      ["ultra-rare"]: {},
      ["ultra-rare-plus"]: {},
    },
  );
