import React, { JSX } from "react";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
}

export default function InputField({
  type,
  name,
  placeholder,
  required,
}: InputFieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="border w-full border-b-gray-300 border-x-0 border-t-0 p-2 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
