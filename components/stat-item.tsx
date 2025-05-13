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
      <p className="font-bold">{value ?? "-"}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default StatItem;
