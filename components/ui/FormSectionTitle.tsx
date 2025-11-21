import React from 'react';

interface FormSectionTitleProps {
  title: string;
  subtitle?: string;
  step?: string;
}

export default function FormSectionTitle({ title, subtitle, step }: FormSectionTitleProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {subtitle}
          </p>
        )}
      </div>
      {step && (
        <div className="mt-4 md:mt-0 md:text-right text-sm text-green-600">
          {step}
        </div>
      )}
    </div>
  );
}