import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { FC, memo } from "react";

interface Props extends SelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  labels: Record<string, string>;
}

const CustomSelect: FC<Props> = (props) => {
  const { id, label, placeholder, options, labels, children, ...rest } = props;
  return (
    <div className="flex flex-col">
      <Label className="mb-1 text-sm font-semibold" htmlFor={id}>
        {label}
      </Label>
      <Select {...rest}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {labels[theme]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {children}
    </div>
  );
};

const SettingsSelect = memo(CustomSelect);

export default SettingsSelect;
