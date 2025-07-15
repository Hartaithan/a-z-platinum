"use client";

import CongratulationPopup, {
  CongratulationPopupHandle,
} from "@/components/congratulation-popup";
import { letterStatus } from "@/constants/alphabet";
import useConfetti from "@/hooks/use-confetti";
import { capture } from "@/utils/analytics";
import { sleep } from "@/utils/async";
import { getCount } from "@/utils/progress";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";

interface Context {
  check: () => void;
}

const initialValue: Context = {
  check: () => null,
};

const Context = createContext<Context>(initialValue);

const CongratulationProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { fireworks, reset } = useConfetti();
  const popupRef = useRef<CongratulationPopupHandle>(null);

  const check: Context["check"] = useCallback(async () => {
    await sleep(1000);
    const uncompleted = getCount(letterStatus.uncompleted);
    if (uncompleted > 0) return;
    capture("congratulation-show", { uncompleted });
    popupRef.current?.open();
    fireworks();
  }, [fireworks]);

  const handleClose = useCallback(() => {
    capture("congratulation-close");
    reset();
  }, [reset]);

  const exposed: Context = useMemo(
    () => ({ check }) satisfies Context,
    [check],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <CongratulationPopup ref={popupRef} onClose={handleClose} />
    </Context.Provider>
  );
};

export const useCongratulation = (): Context => useContext(Context);

export default CongratulationProvider;
