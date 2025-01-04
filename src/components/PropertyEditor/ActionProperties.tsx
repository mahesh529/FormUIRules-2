import React from 'react';
import { FormComponent } from '../../types/form';
import { PropertyField } from './PropertyField';
import { getCustomAction } from '../../utils/customActionRegistry';
import { createActionId } from '../../utils/actionUtils';
import { ActionFeedback } from '../ActionFeedback';
import { createActionContext } from '../../utils/actionContextFactory';

interface ActionPropertiesProps {
  component: FormComponent;
  actionName: string;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const ActionProperties: React.FC<ActionPropertiesProps> = ({
  component,
  actionName,
  onUpdate,
}) => {
  const action = getCustomAction(actionName);
  if (!action) return null;

  const context = createActionContext(component);
  const actionId = createActionId(context, actionName);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        {action.description}
      </div>

      {actionName === 'evaluateExpression' && (
        <PropertyField label="Expression">
          <textarea
            value={component.properties.customExpression || ''}
            onChange={(e) =>
              onUpdate({
                properties: {
                  ...component.properties,
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
      )}

      {actionName === 'fetchData' && (
        <FetchDataProperties 
          component={component} 
          onUpdate={onUpdate} 
        />
      )}

      <ActionFeedback actionId={actionId} />
    </div>
  );
};

const FetchDataProperties: React.FC<{
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}> = ({ component, onUpdate }) => (
  <>
    <PropertyField label="API Endpoint">
      <input
        type="text"
        value={component.properties.api?.endpoint || ''}
        onChange={(e) =>
          onUpdate({
            properties: {
              ...component.properties,
              api: {
                ...component.properties.api,
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
        value={component.properties.api?.method || 'GET'}
        onChange={(e) =>
          onUpdate({
            properties: {
              ...component.properties,
              api: {
                ...component.properties.api,
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
        value={component.properties.dataPath || ''}
        onChange={(e) =>
          onUpdate({
            properties: {
              ...component.properties,
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