import type { UploadBody } from "@/models/upload";

export const getUploadImage = (
  image: UploadBody["image"],
  psnId: UploadBody["psnId"],
): File => {
  const name = `${psnId}’s A-Z Platinum Challenge`;
  const options: FilePropertyBag = { type: image.type };
  return new File([image], name, options);
};
