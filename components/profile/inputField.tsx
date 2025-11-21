// Example InputField implementation
import React from "react";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this prop
  readOnly?: boolean;
  type?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  readOnly = false,
  type = "text",
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none disabled:bg-gray-100"
      />
    </div>
  );
};

export default InputField;
