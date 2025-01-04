import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface RadioPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const RadioProperties: React.FC<RadioPropertiesProps> = ({ component, onUpdate }) => {
  const handleOptionsChange = (value: string) => {
    onUpdate({
      properties: {
        ...component.properties,
        options: value.split('\n').filter(Boolean),
      },
    });
  };

  return (
    <PropertyField label="Options (one per line)">
      <textarea
        value={(component.properties.options || []).join('\n')}
        onChange={(e) => handleOptionsChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Option 1&#10;Option 2&#10;Option 3"
      />
    </PropertyField>
  );
};