"use client";

import DataLoadingPopup, {
  DataLoadingPopupHandle,
} from "@/components/data-loading-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import type { PlatinumProgressData } from "@/models/platinum";
import { useData } from "@/providers/data";
import { useFeatured } from "@/providers/featured";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import type { FC, FormEvent, FormEventHandler, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";

interface Context {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface Form extends HTMLFormControlsCollection {
  id: { value: string };
}

const errors = {
  empty: "Enter your PSN ID. This field cannot be empty",
  fetch: "Unable to fetch profile",
};

const getId = (e: FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  const elements = form.elements as Form;
  return elements?.id.value.trim();
};

const initialValue: Context = {
  onSubmit: () => null,
};

const Context = createContext<Context>(initialValue);

const SubmitProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { resetFeatured } = useFeatured();
  const { abort, getSignal } = useAbortController();
  const { setStatus, setProfile, setData } = useData();
  const popupRef = useRef<DataLoadingPopupHandle>(null);

  const onProgress = useCallback((data: PlatinumProgressData) => {
    const current = data?.current || 0;
    const total = data?.total || 0;
    popupRef.current?.setPages({ current, total });
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const id = getId(e);
      let expires: string | undefined;

      try {
        if (id.length === 0) throw new Error(errors.empty);

        setStatus("profile-loading");

        const { profile, expires: profileExpires } = await API.getProfile({
          id,
          signal: getSignal(),
        });
        if (!profile) throw new Error(errors.fetch);
        expires = profileExpires;
        setProfile(profile);

        setStatus("platinums-loading");

        const { list, expires: platinumsExpires } = await API.getPlatinums({
          id,
          onProgress,
          signal: getSignal(),
        });
        expires = platinumsExpires;
        resetFeatured();
        setData(list);

        setStatus("completed");
        popupRef.current?.reset();
        console.info("expires", expires);
      } catch (error) {
        console.error("submit error", error);
        const message = readError(error);
        console.info("error", message, error);
        popupRef.current?.reset();
      }
    },
    [setStatus, getSignal, onProgress, setProfile, resetFeatured, setData],
  );

  const exposed = useMemo(() => ({ onSubmit }) satisfies Context, [onSubmit]);

  return (
    <Context.Provider value={exposed}>
      {children}
      <DataLoadingPopup ref={popupRef} handleAbort={abort} />
    </Context.Provider>
  );
};

export const useSubmit = (): Context => useContext(Context);

export default SubmitProvider;
