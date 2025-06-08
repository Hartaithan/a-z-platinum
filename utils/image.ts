"use client";

import { imageStatues } from "@/constants/image";
import { APP_URL } from "@/constants/variables";
import { toast } from "sonner";

const errors = {
  notFound: "Image is missing. Cannot proceed with download",
  loadingTitle: "Images are still loading",
  loadingDescription:
    "Cannot proceed while images are still loading. Please wait until all images have finished loading",
};

export const getImageURL = (url: string | undefined): string => {
  if (!url) return "";
  if (url.trim().length === 0) return url;
  const parsed = new URL(url);
  return APP_URL + "/api/image" + parsed.pathname;
};

export const downloadImage = (image: Blob | null, name?: string) => {
  if (!image) throw new Error(errors.notFound);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(image);
  link.download = `${name ?? "a-z platinum challenge"}.png`;
  link.click();
  link.remove();
};

export const isImagesLoading = () => {
  const elements = document.getElementsByClassName(imageStatues.loading);
  if (elements.length > 0) {
    toast.warning(errors.loadingTitle, {
      description: errors.loadingDescription,
      duration: Infinity,
    });
    return true;
  }
  return false;
};
