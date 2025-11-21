"use client";

import React from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  required?: boolean;
  className?: string;
}

// Context
import { useReport, useProgressBar } from "@/context/store";

function FormInputPayment({
  label,
  placeholder,
  type = "text",
  // value,
  required,
  className = "",
}: FormInputProps) {
  const { paymentDate, updatePaymentDate } = useReport();
  const { progress, updateProgress } = useProgressBar();

  const isHasValue = React.useRef(false);

  React.useEffect(() => {
    console.log("Date", paymentDate);
    if (Boolean(paymentDate && !isHasValue.current)) {
      updateProgress(Math.min(progress + 0.1, 1));
      isHasValue.current = true;
    }

    if (Boolean(!paymentDate && isHasValue.current)) {
      updateProgress(Math.min(progress - 0.1, 1));
      isHasValue.current = false;
    }
  }, [paymentDate, updateProgress, progress]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = String(event.target.value);
    updatePaymentDate(data);
  }
  return (
    <div className={className}>
      <label className="block text-sm mb-1 font-medium text-gray-700">
        {label} {required && <span className="text-gray-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={paymentDate}
        required={required}
        onChange={(event) => handleChange(event)}
        className="w-full bg-gray-200 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

export default FormInputPayment;
