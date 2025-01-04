import React from 'react';
import { useFormStore } from '../../../store/formStore';
import { getComponentIcon } from '../../../utils/componentIcons';

interface EventTargetsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const EventTargets: React.FC<EventTargetsProps> = ({ value, onChange }) => {
  const { layout } = useFormStore();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Target Components
      </label>
      <select
        multiple
        value={value}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, option => option.value);
          onChange(selected);
        }}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[120px]"
      >
        {layout.components.map((component) => {
          const Icon = getComponentIcon(component.type);
          return (
            <option key={component.id} value={component.id}>
              {component.label} ({component.type})
            </option>
          );
        })}
      </select>
      <p className="mt-1 text-sm text-gray-500">
        Hold Ctrl/Cmd to select multiple components
      </p>
    </div>
  );
};