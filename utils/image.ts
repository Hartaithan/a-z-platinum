"use client";

import { imageStatues } from "@/constants/image";
import { APP_URL } from "@/constants/variables";
import { Sizes } from "@/models/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { toast } from "sonner";

const errors = {
  notFound: "Image is missing. Cannot proceed with download",
  loadingTitle: "Images are still loading",
  loadingDescription:
    "Cannot proceed while images are still loading. Please wait until all images have finished loading",
};

export const getImageURL = (
  url: string | StaticImport | undefined,
  sizes?: Sizes,
): string | StaticImport => {
  if (!url) return "";
  if (typeof url !== "string") return url;
  if (url.trim().length === 0) return url;
  const parsed = new URL(url);
  let dest: string | null = null;
  if (parsed.host.startsWith("image.api")) dest = "/api/image/ps";
  if (parsed.host.startsWith("psnobj.prod")) dest = "/api/image/obj";
  if (parsed.host.startsWith("psn-rsc.prod")) dest = "/api/image/rsc";
  if (dest === null) return url;
  if (sizes?.width) parsed.searchParams.set("w", sizes.width.toString());
  if (sizes?.height) parsed.searchParams.set("h", sizes.height.toString());
  return APP_URL + dest + parsed.pathname + parsed.search;
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
