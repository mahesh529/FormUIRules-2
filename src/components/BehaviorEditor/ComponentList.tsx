import React from 'react';
import { FormComponent } from '../../types/form';
import { getComponentIcon } from '../../utils/componentIcons';

interface ComponentListProps {
  components: FormComponent[];
  selectedId?: string;
  onSelect: (component: FormComponent) => void;
}

export const ComponentList: React.FC<ComponentListProps> = ({
  components,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Form Components</h2>
      <div className="space-y-2">
        {components.map((component) => {
          const Icon = getComponentIcon(component.type);
          return (
            <button
              key={component.id}
              onClick={() => onSelect(component)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                selectedId === component.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-medium">{component.label}</div>
                <div className="text-sm text-gray-500">{component.type}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};