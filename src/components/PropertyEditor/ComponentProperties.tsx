import React from 'react';
import { FormComponent } from '../../types/form';
import { PropertyField } from './PropertyField';

interface ComponentPropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const ComponentProperties: React.FC<ComponentPropertiesProps> = ({
  component,
  onUpdate,
}) => {
  const renderProperties = () => {
    switch (component.type) {
      case 'text':
      case 'textarea':
      case 'paragraph':
        return (
          <>
            <PropertyField label="Placeholder">
              <input
                type="text"
                value={component.config.placeholder || ''}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
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
                value={component.config.minLength || ''}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
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
                value={component.config.maxLength || ''}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
                      maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </PropertyField>
          </>
        );

      case 'number':
        return (
          <>
            <PropertyField label="Min Value">
              <input
                type="number"
                value={component.config.min || ''}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
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
                value={component.config.max || ''}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
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
                value={component.config.step || '1'}
                onChange={(e) =>
                  onUpdate({
                    config: {
                      ...component.config,
                      step: e.target.value ? parseFloat(e.target.value) : 1,
                    },
                  })
                }
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </PropertyField>
          </>
        );

      case 'radio':
      case 'checkbox':
        return (
          <PropertyField label="Options (one per line)">
            <textarea
              value={(component.config.options || []).join('\n')}
              onChange={(e) =>
                onUpdate({
                  config: {
                    ...component.config,
                    options: e.target.value.split('\n').filter(Boolean),
                  },
                })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Option 1&#10;Option 2&#10;Option 3"
            />
          </PropertyField>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderProperties()}</div>;
};