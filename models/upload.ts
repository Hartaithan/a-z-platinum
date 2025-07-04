import type { ReactNode } from "react";

export interface UploadBody {
  image: Blob;
  psnId: string;
}

export interface UploadSuccessResponse {
  success: true;
  message: string;
  link: string;
  content?: ReactNode;
}

export interface UploadErrorResponse {
  success: false;
  message: string;
}

export interface UploadParams {
  body: FormData;
  signal?: AbortSignal;
}

export type UploadResponse = UploadSuccessResponse | UploadErrorResponse;
