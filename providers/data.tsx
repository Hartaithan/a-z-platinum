"use client";

import { dataKey, gamesKey, profileKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { NullableData } from "@/models/data";
import { NullableGroupedPlatinums, NullablePlatinum } from "@/models/platinum";
import { NullableProfile } from "@/models/profile";
import { DataKeyParams, getDataKey, groupPlatinumList } from "@/utils/group";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Status = "idle" | "profile-loading" | "platinums-loading" | "completed";

interface Items {
  items: string[];
  count: number;
  hasItems: boolean;
  status: string;
}

export const status = {
  completed: "completed-letter",
  uncompleted: "uncompleted-letter",
};

const defaultItems: Items = {
  items: [],
  count: 0,
  hasItems: false,
  status: status.uncompleted,
};

interface DataContext {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: (profile: NullableProfile) => void;
  getItem: (key: string | null) => NullablePlatinum;
  getItemKeys: (params: DataKeyParams) => Items;
  setData: (list: NullablePlatinum[]) => void;
}

type Context = DataContext;

const initial: DataContext = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  getItem: () => null,
  getItemKeys: () => defaultItems,
  setData: () => null,
};

const Context = createContext<Context>(initial);

const DataProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [status, setStatus] = useState<Context["status"]>(initial.status);
  const [profile, setProfile] = useLocalStorage<Context["profile"]>({
    key: profileKey,
    defaultValue: initial.profile,
  });
  const [data, setDataState] = useLocalStorage<NullableData>({
    key: dataKey,
    defaultValue: null,
  });
  const [games, setGames] = useLocalStorage<NullableGroupedPlatinums>({
    key: gamesKey,
    defaultValue: null,
  });

  const getItem: Context["getItem"] = useCallback(
    (key) => {
      if (!key) return null;
      if (!games?.[key]) return null;
      return games[key];
    },
    [games],
  );

  const getItemKeys: Context["getItemKeys"] = useCallback(
    (params) => {
      const [dataKey, groupKey] = getDataKey(params);
      const items = data?.[dataKey]?.[groupKey];
      if (!items) return defaultItems;
      const hasItems = items.length > 0;
      const status = hasItems ? "completed" : "uncompleted";
      return { items, count: items.length, hasItems, status };
    },
    [data],
  );

  const setData: Context["setData"] = useCallback(
    (list) => {
      if (list.length === 0) return;
      const { games, ...data } = groupPlatinumList(list);
      setDataState(data);
      setGames(games);
    },
    [setDataState, setGames],
  );

  const exposed = useMemo(() => {
    return {
      status,
      setStatus,
      profile,
      setProfile,
      getItem,
      getItemKeys,
      setData,
    } satisfies Context;
  }, [status, profile, setProfile, getItem, getItemKeys, setData]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
