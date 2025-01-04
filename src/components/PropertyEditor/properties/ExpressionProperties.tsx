import React from 'react';
import { ComponentEvent } from '../../../types/form';
import { PropertyField } from '../PropertyField';

interface ExpressionPropertiesProps {
  event: ComponentEvent;
  onUpdate: (updates: Partial<ComponentEvent>) => void;
}

export const ExpressionProperties: React.FC<ExpressionPropertiesProps> = ({ 
  event, 
  onUpdate 
}) => {
  if (event.customAction === 'evaluateExpression') {
    return (
      <PropertyField label="Expression">
        <textarea
          value={event.properties?.customExpression || ''}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...event.properties,
                customExpression: e.target.value,
              },
            })
          }
          placeholder="value * 2"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Available variables: value, source, targets, values
        </p>
      </PropertyField>
    );
  }

  if (event.customAction === 'fetchData') {
    return (
      <>
        <PropertyField label="API Endpoint">
          <input
            type="text"
            value={event.properties?.api?.endpoint || ''}
            onChange={(e) =>
              onUpdate({
                properties: {
                  ...event.properties,
                  api: {
                    ...event.properties?.api,
                    endpoint: e.target.value,
                  },
                },
              })
            }
            placeholder="https://api.example.com/data/{value}"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use {'{value}'} to insert the component's value
          </p>
        </PropertyField>

        <PropertyField label="HTTP Method">
          <select
            value={event.properties?.api?.method || 'GET'}
            onChange={(e) =>
              onUpdate({
                properties: {
                  ...event.properties,
                  api: {
                    ...event.properties?.api,
                    method: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </PropertyField>

        <PropertyField label="Response Data Path">
          <input
            type="text"
            value={event.properties?.dataPath || ''}
            onChange={(e) =>
              onUpdate({
                properties: {
                  ...event.properties,
                  dataPath: e.target.value,
                },
              })
            }
            placeholder="data.result"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            Path to extract from response (e.g., data.result)
          </p>
        </PropertyField>
      </>
    );
  }

  return null;
};