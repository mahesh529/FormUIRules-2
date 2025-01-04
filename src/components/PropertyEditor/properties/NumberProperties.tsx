import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface NumberPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const NumberProperties: React.FC<NumberPropertiesProps> = ({ component, onUpdate }) => {
  return (
    <>
      <PropertyField label="Min Value">
        <input
          type="number"
          value={component.properties.min || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                min: e.target.value ? parseFloat(e.target.value) : undefined,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Max Value">
        <input
          type="number"
          value={component.properties.max || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                max: e.target.value ? parseFloat(e.target.value) : undefined,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Step">
        <input
          type="number"
          value={component.properties.step || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                step: e.target.value ? parseFloat(e.target.value) : undefined,
              },
            })
          }
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
    </>
  );
};