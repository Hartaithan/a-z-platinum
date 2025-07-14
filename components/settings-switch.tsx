import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { cn } from "@/utils/styles";
import type { SwitchProps } from "@radix-ui/react-switch";
import { memo, type FC } from "react";

interface Props extends SwitchProps {
  id: string;
  label: string;
}

const SettingsSwitch: FC<Props> = (props) => {
  const { id, label, className, children, ...rest } = props;
  return (
    <div className="flex items-center">
      <Label
        className="mb-1 flex w-full flex-col items-start gap-1 text-sm font-semibold"
        htmlFor={id}>
        {label}
        {children}
      </Label>
      <Switch
        id={id}
        className={cn("child:size-5 ml-2 h-6 w-10", className)}
        {...rest}
      />
    </div>
  );
};

export default memo(SettingsSwitch);
