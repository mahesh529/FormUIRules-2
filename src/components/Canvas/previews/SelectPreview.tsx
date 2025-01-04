import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

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
      <span className="text-sm text-gray-700">{component.config.label}</span>
    </div>
  );
};

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