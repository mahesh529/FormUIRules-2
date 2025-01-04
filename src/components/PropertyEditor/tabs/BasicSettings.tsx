import React from 'react';
import { FormComponent } from '../../../types/form';
import { PropertyField } from '../PropertyField';

interface BasicSettingsProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

export const BasicSettings: React.FC<BasicSettingsProps> = ({ component, onChange }) => {
  return (
    <div className="space-y-4">
      <PropertyField label="Label">
        <input
          type="text"
          value={component.config.label}
          onChange={(e) =>
            onChange({
              config: {
                ...component.config,
                label: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={component.config.required}
            onChange={(e) =>
              onChange({
                config: {
                  ...component.config,
                  required: e.target.checked,
                },
              })
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Required</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={component.config.enabled !== false}
            onChange={(e) =>
              onChange({
                config: {
                  ...component.config,
                  enabled: e.target.checked,
                },
              })
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Enabled</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={component.config.visible !== false}
            onChange={(e) =>
              onChange({
                config: {
                  ...component.config,
                  visible: e.target.checked,
                },
              })
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Visible</span>
        </label>
      </div>
    </div>
  );
};