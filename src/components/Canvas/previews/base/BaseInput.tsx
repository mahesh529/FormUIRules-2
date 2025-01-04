import React from 'react';
import { FormComponent } from '../../../../types/form';
import { useFormStore } from '../../../../store/formStore';

interface BaseInputProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
  type?: string;
  className?: string;
  rows?: number;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  component,
  onEvent,
  type = 'text',
  className = '',
  rows,
}) => {
  const { values, updateValue } = useFormStore();
  const { placeholder, minLength, maxLength } = component.config;

  const baseClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";
  
  const commonProps = {
    value: values[component.id] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateValue(component.id, e.target.value);
      onEvent('change', e.target.value);
    },
    onFocus: () => onEvent('focus'),
    onBlur: () => onEvent('blur'),
    placeholder,
    minLength,
    maxLength,
    disabled: !component.config.enabled,
    className: `${baseClassName} ${className}`,
  };

  return rows ? (
    <textarea {...commonProps} rows={rows} />
  ) : (
    <input {...commonProps} type={type} />
  );
};