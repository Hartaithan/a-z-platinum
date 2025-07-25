"use client";

import ImageUploadPopup, {
  ImageUploadPopupHandle,
} from "@/components/image-upload-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { capture as captureEvent, withTheme } from "@/utils/analytics";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { downloadImage, isImagesLoading } from "@/utils/image";
import { getUploadFormData } from "@/utils/upload";
import type { FC, PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface Context {
  isLoading: boolean;
  handleSave: () => void;
  handleUpload: () => void;
}

const messages = {
  cancel: "Image upload was canceled by the user",
  generate: "Unable to generate image",
};

const initialValue: Context = {
  isLoading: false,
  handleSave: () => null,
  handleUpload: () => null,
};

const Context = createContext<Context>(initialValue);

const ShareProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { profile } = useData();
  const { capture } = useCapture();
  const { abort, getSignal } = useAbortController({ message: messages.cancel });
  const [isLoading, setLoading] = useState(initialValue.isLoading);
  const popupRef = useRef<ImageUploadPopupHandle>(null);

  const handleSave: Context["handleSave"] = useCallback(async () => {
    try {
      if (isImagesLoading()) return;
      captureEvent("save-start", withTheme({ id: profile?.name }));
      setLoading(true);
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      downloadImage(image, profile?.name);
      captureEvent("save-complete", withTheme({ id: profile?.name }));
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
      captureEvent("save-error", withTheme({ id: profile?.name, message }));
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture]);

  const handleUpload: Context["handleUpload"] = useCallback(async () => {
    const { set, open, close } = popupRef.current ?? {};
    const signal = getSignal();
    try {
      if (isImagesLoading()) return;
      captureEvent("upload-start", withTheme({ id: profile?.name }));
      open?.();
      setLoading(true);
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      set?.({ status: "upload" });
      const psnId = profile?.name ?? "A-Z Platinum Challenge";
      const body = getUploadFormData(image, psnId);
      const response = await API.uploadImage({ body, signal });
      if (!response.success) throw new Error(response.message);
      set?.({ status: "complete", image: response.link });
      const theme = withTheme({ id: profile?.name, link: response.link });
      captureEvent("upload-complete", theme);
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      toast.error(message);
      captureEvent("upload-error", withTheme({ id: profile?.name, message }));
      if (signal.aborted) close?.();
      else set?.({ status: "error", error: message });
    } finally {
      setLoading(false);
    }
  }, [capture, profile?.name, getSignal]);

  const exposed = useMemo(
    () => ({ isLoading, handleSave, handleUpload }) satisfies Context,
    [isLoading, handleSave, handleUpload],
  );

  return (
    <Context.Provider value={exposed}>
      {children}
      <ImageUploadPopup ref={popupRef} abort={abort} />
    </Context.Provider>
  );
};

export const useShare = (): Context => useContext(Context);

export default ShareProvider;
