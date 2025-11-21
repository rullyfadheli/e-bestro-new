import React, { JSX } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  formAction,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      onClick={onClick}
      formAction={formAction}
      className={`rounded transition ${className}`}
    >
      {children}
    </button>
  );
}
