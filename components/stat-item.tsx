import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  value: string | number | undefined;
  label: string;
}

const StatItem: FC<Props> = (props) => {
  const { className, value, label, ...rest } = props;
  return (
    <div
      className={cn("flex flex-col items-center leading-[normal]", className)}
      {...rest}>
      <p className="@capture:text-base text-sm font-bold md:text-base">
        {value ?? "-"}
      </p>
      <p className="@capture:text-sm text-xs text-gray-600 md:text-sm">
        {label}
      </p>
    </div>
  );
};

export default StatItem;
