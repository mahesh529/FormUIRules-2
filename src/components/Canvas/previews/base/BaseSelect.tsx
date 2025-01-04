import React from 'react';
import { FormComponent } from '../../../../types/form';
import { useFormStore } from '../../../../store/formStore';

interface BaseSelectProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
  options: { value: string; label: string }[];
  multiple?: boolean;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  component,
  onEvent,
  options,
  multiple,
}) => {
  const { values, updateValue } = useFormStore();

  return (
    <select
      value={values[component.id] || (multiple ? [] : '')}
      onChange={(e) => {
        const value = multiple
          ? Array.from(e.target.selectedOptions, option => option.value)
          : e.target.value;
        updateValue(component.id, value);
        onEvent('change', value);
      }}
      multiple={multiple}
      disabled={!component.config.enabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};