import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import type { SwitchProps } from "@radix-ui/react-switch";
import { memo, type FC } from "react";

interface Props extends SwitchProps {
  id: string;
  label: string;
}

const CustomSwitch: FC<Props> = (props) => {
  const { id, label, children, ...rest } = props;
  return (
    <div className="flex flex-col">
      <Label className="mb-1 w-full text-sm font-semibold" htmlFor={id}>
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        <Switch id={id} {...rest} />
        {children}
      </div>
    </div>
  );
};

const SettingsSwitch = memo(CustomSwitch);

export default SettingsSwitch;
