import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

export const NumberPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { min, max, step = 1 } = component.config;
  
  return (
    <input
      type="number"
      value={values[component.id] || ''}
      onChange={(e) => {
        const value = e.target.value ? parseFloat(e.target.value) : '';
        updateValue(component.id, value);
        onEvent('change', value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      min={min}
      max={max}
      step={step}
      disabled={!component.config.enabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};