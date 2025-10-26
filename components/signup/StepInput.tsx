"use client";

import { Input } from "@heroui/input";

const inputClassNames = {
  inputWrapper: [
    "backdrop-blur-md",
    "bg-white/5",
    "border-white/20",
    "hover:bg-white/10",
    "group-data-[focus=true]:bg-white/10",
    "group-data-[focus=true]:border-white/40",
  ],
  input: "text-gray-700 placeholder:text-gray-700/40 text-sm sm:text-base",
  label: "text-gray-700 text-sm sm:text-base",
  errorMessage: "text-red-300 text-xs sm:text-sm",
};

interface StepInputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  error: string;
  autoFocus?: boolean;
}

export function StepInput({
  type = "text",
  value,
  onChange,
  onKeyPress,
  label,
  placeholder,
  error,
  autoFocus = true,
}: StepInputProps) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      label={label}
      placeholder={placeholder}
      variant="bordered"
      isInvalid={!!error}
      errorMessage={error}
      classNames={{
        ...inputClassNames,
        label: "!text-gray-700 text-sm sm:text-base",
      }}
      autoFocus={autoFocus}
    />
  );
}
