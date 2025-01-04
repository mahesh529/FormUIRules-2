import React from 'react';
import { useFormStore } from '../../store/formStore';
import { getComponentIcon } from '../../utils/componentIcons';
import { ComponentFields } from './ComponentFields';

export const PropertyEditor: React.FC = () => {
  const { selectedComponent, updateComponent } = useFormStore();

  if (!selectedComponent) {
    return (
      <div className="w-64 bg-gray-50 p-4 border-l border-gray-200">
        <p className="text-gray-500 text-center">
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const Icon = getComponentIcon(selectedComponent.type);

  const handleChange = (field: string, value: any) => {
    updateComponent(selectedComponent.id, {
      config: {
        ...selectedComponent.config,
        [field]: value
      }
    });
  };

  return (
    <div className="w-64 bg-gray-50 p-4 border-l border-gray-200 h-screen overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">{selectedComponent.type}</h2>
      </div>

      <form className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedComponent.config.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Component-specific fields */}
        <ComponentFields 
          component={selectedComponent} 
          onChange={handleChange}
        />

        {/* Common toggles */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedComponent.config.required}
              onChange={(e) => handleChange('required', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedComponent.config.enabled !== false}
              onChange={(e) => handleChange('enabled', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Enabled</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedComponent.config.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Visible</span>
          </label>
        </div>
      </form>
    </div>
  );
};