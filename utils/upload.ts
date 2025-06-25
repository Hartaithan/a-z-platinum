import type { UploadBody } from "@/models/upload";

export const getUploadFormData = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): FormData => {
  const formData = new FormData();
  formData.append("title", `${psnId}’s A-Z Platinum Challenge`);
  formData.append("image", image);
  return formData;
};
