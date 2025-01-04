import React from 'react';

interface PropertyFieldProps {
  label: string;
  children: React.ReactNode;
}

export const PropertyField: React.FC<PropertyFieldProps> = ({ label, children }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
};