import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface SliderPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const SliderProperties: React.FC<SliderPropertiesProps> = ({ component, onUpdate }) => {
  return (
    <>
      <PropertyField label="Min Value">
        <input
          type="number"
          value={component.properties.min ?? 0}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                min: e.target.value ? parseInt(e.target.value) : 0,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Max Value">
        <input
          type="number"
          value={component.properties.max ?? 100}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                max: e.target.value ? parseInt(e.target.value) : 100,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Step">
        <input
          type="number"
          value={component.properties.step ?? 1}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                step: e.target.value ? parseInt(e.target.value) : 1,
              },
            })
          }
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
    </>
  );
};