import { Device } from "@/models/app";
import { headers as readHeaders } from "next/headers";
import { userAgent } from "next/server";

const isDesktop = (ua: string) => /Windows NT|Macintosh|Linux.*X11/i.test(ua);
const isMobile = (ua: string) => /Mobile|Tablet/i.test(ua);

export const getDeviceType = async (): Promise<Device> => {
  const headers = await readHeaders();
  const { ua } = userAgent({ headers });
  return isDesktop(ua) && !isMobile(ua) ? "desktop" : "mobile";
};
