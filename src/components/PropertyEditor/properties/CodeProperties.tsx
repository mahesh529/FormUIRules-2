import React from 'react';
import { PropertyField } from '../PropertyField';
import { FormComponent } from '../../../types/form';

interface CodePropertiesProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

export const CodeProperties: React.FC<CodePropertiesProps> = ({ component, onUpdate }) => {
  return (
    <>
      <PropertyField label="Language">
        <select
          value={component.properties.language || 'javascript'}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                language: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
        </select>
      </PropertyField>
      <PropertyField label="Theme">
        <select
          value={component.properties.theme || 'vs-dark'}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                theme: e.target.value,
              },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast Dark</option>
          <option value="hc-light">High Contrast Light</option>
        </select>
      </PropertyField>
      <PropertyField label="Font Size">
        <input
          type="number"
          value={component.properties.fontSize || 14}
          onChange={(e) =>
            onUpdate({
              properties: {
                ...component.properties,
                fontSize: parseInt(e.target.value),
              },
            })
          }
          min={8}
          max={32}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </PropertyField>
      <PropertyField label="Options">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={component.properties.lineNumbers !== false}
              onChange={(e) =>
                onUpdate({
                  properties: {
                    ...component.properties,
                    lineNumbers: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">Show Line Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={component.properties.wordWrap !== 'off'}
              onChange={(e) =>
                onUpdate({
                  properties: {
                    ...component.properties,
                    wordWrap: e.target.checked ? 'on' : 'off',
                  },
                })
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">Word Wrap</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={component.properties.formatOnPaste !== false}
              onChange={(e) =>
                onUpdate({
                  properties: {
                    ...component.properties,
                    formatOnPaste: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">Format On Paste</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={component.properties.formatOnType !== false}
              onChange={(e) =>
                onUpdate({
                  properties: {
                    ...component.properties,
                    formatOnType: e.target.checked,
                  },
                })
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm">Format On Type</span>
          </label>
        </div>
      </PropertyField>
    </>
  );
};