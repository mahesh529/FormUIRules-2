import React from 'react';
import { PreviewProps } from '../types';
import { useFormStore } from '../../../../store/formStore';

export const CheckboxPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { defaultValue = false } = component.config;

  React.useEffect(() => {
    if (values[component.id] === undefined) {
      updateValue(component.id, defaultValue);
    }
  }, [component.id, defaultValue]);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={values[component.id] ?? defaultValue}
        onChange={(e) => {
          updateValue(component.id, e.target.checked);
          onEvent('change', e.target.checked);
        }}
        disabled={!component.config.enabled}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  );
};