import type { UploadBody, UploadResponse } from "@/models/upload";
import { API } from "@/utils/api";

export const getUploadFormData = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): FormData => {
  const formData = new FormData();
  formData.append("title", `${psnId}’s A-Z Platinum Challenge`);
  formData.append("image", image);
  return formData;
};

export const uploadImage = async (
  image: Blob,
  name: string | undefined,
): Promise<UploadResponse> => {
  const psnId = name ?? "A-Z Platinum Challenge";
  const formData = getUploadFormData(image, psnId);
  const response = await API.uploadImage(formData);
  return response;
};
