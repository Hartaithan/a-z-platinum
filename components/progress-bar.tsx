import { cn } from "@/utils/styles";
import { FC } from "react";

interface Props {
  value: string;
  trackClassName?: string;
  fillClassName?: string;
}

const ProgressBar: FC<Props> = (props) => {
  const { value, trackClassName, fillClassName } = props;
  return (
    <div className={cn("mt-1 h-2 rounded bg-neutral-100", trackClassName)}>
      <div
        className={cn(
          "h-full rounded bg-black transition-all duration-700 ease-in-out",
          fillClassName,
        )}
        style={{ width: value }}
      />
    </div>
  );
};

export default ProgressBar;
