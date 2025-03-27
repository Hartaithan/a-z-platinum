"use client";

import { dataKey, profileKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DataKey, NullableData } from "@/models/data";
import { NullablePlatinum } from "@/models/platinum";
import { NullableProfile } from "@/models/profile";
import { groupPlatinumList } from "@/utils/group";
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

export interface DataContext {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  profile: NullableProfile;
  setProfile: (profile: NullableProfile) => void;
  getData: (dataKey: DataKey, groupKey: string) => string[];
  setData: (list: NullablePlatinum[]) => void;
}

type Context = DataContext;

const initial: DataContext = {
  status: "idle",
  setStatus: () => null,
  profile: null,
  setProfile: () => null,
  getData: () => [],
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

  const getData: Context["getData"] = useCallback(
    (dataKey, groupKey) => {
      if (!data) return [];
      if (!data[dataKey]) return [];
      if (!data[dataKey][groupKey]) return [];
      return data[dataKey][groupKey];
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
    () => ({ status, setStatus, profile, setProfile, getData, setData }),
    [status, profile, setProfile, getData, setData],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useData = (): Context => useContext(Context);

export default DataProvider;
