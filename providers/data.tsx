"use client";

import { dataKey, profileKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { NullableData } from "@/models/data";
import { NullablePlatinum } from "@/models/platinum";
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
}

const defaultItems: Items = { items: [], count: 0, hasItems: false };

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

  const getItem: Context["getItem"] = useCallback(
    (key) => {
      if (!key) return null;
      if (!data?.games?.[key]) return null;
      return data.games[key];
    },
    [data],
  );

  const getItemKeys: Context["getItemKeys"] = useCallback(
    (params) => {
      const [dataKey, groupKey] = getDataKey(params);
      if (!data?.[dataKey]?.[groupKey]) return defaultItems;
      const items = data[dataKey][groupKey];
      return { items, count: items.length, hasItems: items.length > 0 };
    },
    [data],
  );

  const setData: Context["setData"] = useCallback(
    (list) => {
      if (list.length === 0) return;
      const data = groupPlatinumList(list);
      setDataState(data);
    },
    [setDataState],
  );

  const exposed: Context = useMemo(
    () => ({
      status,
      setStatus,
      profile,
      setProfile,
      getItem,
      getItemKeys,
      setData,
    }),
    [status, profile, setProfile, getItem, getItemKeys, setData],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
