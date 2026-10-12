"use client";

import ImageUploadPopup, {
  ImageUploadPopupHandle,
} from "@/components/image-upload-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { useTheme } from "@/providers/theme";
import { API } from "@/utils/api";
import { downloadImage, isImagesLoading } from "@/utils/image";
import { getUploadImage } from "@/utils/upload";
import { TrophyScoutError } from "@hartaithan/trophy-scout";
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
  const { abort, getSignal } = useAbortController();
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(initialValue.isLoading);
  const popupRef = useRef<ImageUploadPopupHandle>(null);

  const handleSave: Context["handleSave"] = useCallback(async () => {
    if (isImagesLoading()) return;
    const flow = API.flow("image_save", { theme });
    try {
      setLoading(true);
      flow.stage("generate");
      const image = await capture();
      if (!image) throw new TrophyScoutError(messages.generate);
      downloadImage(image, profile?.name);
      flow.complete();
    } catch (error) {
      flow.fail(error);
      toast.error(API.getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [profile?.name, capture, theme]);

  const handleUpload: Context["handleUpload"] = useCallback(async () => {
    if (isImagesLoading()) return;
    const { set, open, close } = popupRef.current ?? {};
    const flow = API.flow("image_upload", { theme });
    const signal = getSignal();
    try {
      open?.();
      setLoading(true);
      flow.stage("generate");
      const captured = await capture();
      if (!captured) throw new TrophyScoutError(messages.generate);
      set?.({ status: "upload" });
      const psnId = profile?.name ?? "A-Z Platinum Challenge";
      const image = getUploadImage(captured, psnId);
      const response = await API.uploadImage({ image, signal, flow });
      set?.({ status: "complete", image: response.image.url });
      flow.complete();
    } catch (error) {
      if (flow.fail(error) === "failed") {
        const message = API.getErrorMessage(error);
        set?.({ status: "error", error: message });
        toast.error(message);
      } else {
        close?.();
      }
    } finally {
      setLoading(false);
    }
  }, [capture, profile?.name, getSignal, theme]);

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
