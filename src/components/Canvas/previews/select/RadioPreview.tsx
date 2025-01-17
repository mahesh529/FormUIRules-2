import React from 'react';
import { PreviewProps } from '../types';
import { useFormStore } from '../../../../store/formStore';

export const RadioPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const options = component.config.options || ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            name={component.id}
            value={option}
            checked={values[component.id] === option}
            onChange={(e) => {
              updateValue(component.id, e.target.value);
              onEvent('change', e.target.value);
            }}
            disabled={!component.config.enabled}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </div>
      ))}
    </div>
  );
};