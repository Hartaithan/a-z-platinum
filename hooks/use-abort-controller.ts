import { useCallback, useRef } from "react";

interface Params {
  message?: string;
}

const defaultMessage = "Request was canceled by the user";

export const useAbortController = (params?: Params) => {
  const { message = defaultMessage } = params ?? {};
  const controller = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (!controller.current) return;
    controller.current.abort(message);
  }, [message]);

  const getSignal = useCallback(() => {
    if (controller.current) controller.current.abort();
    controller.current = new AbortController();
    return controller.current.signal;
  }, []);

  const isAborted = useCallback(
    () => controller.current?.signal.aborted ?? false,
    [],
  );

  return { controller, abort, getSignal, isAborted };
};
