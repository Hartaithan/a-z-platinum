"use client";

import ImageUploadPopup, {
  ImageUploadPopupHandle,
} from "@/components/image-upload-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { downloadImage, isImagesLoading } from "@/utils/image";
import { getUploadFormData } from "@/utils/upload";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "sonner";

interface Context {
  handleSave: () => void;
  handleUpload: () => void;
}

const messages = {
  cancel: "Image upload was canceled by the user",
  generate: "Unable to generate image",
};

const initialValue: Context = {
  handleSave: () => null,
  handleUpload: () => null,
};

const Context = createContext<Context>(initialValue);

const ShareProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { profile } = useData();
  const { capture } = useCapture();
  const { abort, getSignal } = useAbortController({ message: messages.cancel });
  const popupRef = useRef<ImageUploadPopupHandle>(null);

  const handleSave: Context["handleSave"] = useCallback(async () => {
    try {
      if (isImagesLoading()) return;
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      downloadImage(image, profile?.name);
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, capture]);

  const handleUpload: Context["handleUpload"] = useCallback(async () => {
    const { set, open, close } = popupRef.current ?? {};
    const signal = getSignal();
    try {
      if (isImagesLoading()) return;
      open?.();
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      set?.({ status: "upload" });
      const psnId = profile?.name ?? "A-Z Platinum Challenge";
      const body = getUploadFormData(image, psnId);
      const response = await API.uploadImage({ body, signal });
      if (!response.success) throw new Error(response.message);
      set?.({ status: "complete", image: response.link });
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      toast.error(message);
      if (signal.aborted) close?.();
      else set?.({ status: "error", error: message });
    }
  }, [capture, profile?.name, getSignal]);

  const exposed = useMemo(
    () => ({ handleSave, handleUpload }) satisfies Context,
    [handleSave, handleUpload],
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
