"use client";

import { Select, SelectItem } from "@heroui/select";

const selectClassNames = {
  trigger: [
    "backdrop-blur-md",
    "bg-white/5",
    "border-white/20",
    "hover:bg-white/10",
    "data-[focus=true]:bg-white/10",
    "data-[focus=true]:border-white/40",
  ],
  value: "text-white",
  label: "text-white/90",
  errorMessage: "text-red-300",
};

interface StepSelectOption {
  key: string;
  label: string;
}

interface StepSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  error: string;
  options: StepSelectOption[];
}

export function StepSelect({
  value,
  onChange,
  label,
  placeholder,
  error,
  options,
}: StepSelectProps) {
  return (
    <Select
      selectedKeys={value ? [value] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as string;
        onChange(selected);
      }}
      label={label}
      placeholder={placeholder}
      variant="bordered"
      isInvalid={!!error}
      errorMessage={error}
      classNames={selectClassNames}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
