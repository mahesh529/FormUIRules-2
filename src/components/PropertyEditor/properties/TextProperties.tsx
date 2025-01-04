import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface TextPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const TextProperties: React.FC<TextPropertiesProps> = ({ component, onUpdate }) => {
  return (
    <>
      <PropertyField label="Placeholder">
        <input
          type="text"
          value={component.properties.placeholder || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                placeholder: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Min Length">
        <input
          type="number"
          value={component.properties.minLength || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                minLength: e.target.value ? parseInt(e.target.value) : undefined,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Max Length">
        <input
          type="number"
          value={component.properties.maxLength || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                maxLength: e.target.value ? parseInt(e.target.value) : undefined,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
    </>
  );
};