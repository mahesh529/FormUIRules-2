import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface CheckboxPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const CheckboxProperties: React.FC<CheckboxPropertiesProps> = ({ component, onUpdate }) => {
  return (
    <PropertyField label="Default Value">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={component.properties.defaultChecked || false}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                defaultChecked: e.target.checked,
              },
            })
          }
          className="rounded border-gray-300"
        />
        <span className="text-sm">Checked by default</span>
      </label>
    </PropertyField>
  );
};