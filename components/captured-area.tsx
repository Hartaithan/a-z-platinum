"use client";

import { useCapture } from "@/providers/capture";
import { FC, PropsWithChildren } from "react";

const CapturedArea: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { captureRef } = useCapture();
  return <div ref={captureRef}>{children}</div>;
};

export default CapturedArea;
