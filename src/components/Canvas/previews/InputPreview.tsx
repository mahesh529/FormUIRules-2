import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

export const TextPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { placeholder, minLength, maxLength } = component.config;
  
  return (
    <input
      type="text"
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      disabled={!component.config.enabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

export const TextAreaPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { placeholder, minLength, maxLength } = component.config;
  
  return (
    <textarea
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      disabled={!component.config.enabled}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};