import React, { useState } from 'react';
import { FormComponent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { BasicSettings } from './tabs/BasicSettings';
import { ComponentSettings } from './tabs/ComponentSettings';
import { ValidationSettings } from './tabs/ValidationSettings';
import { Settings, Sliders, ShieldCheck } from 'lucide-react';

interface PropertyTabsProps {
  component: FormComponent;
}

export const PropertyTabs: React.FC<PropertyTabsProps> = ({ component }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const { updateComponent } = useFormStore();

  const tabs = [
    { id: 'basic', label: 'Basic', icon: Settings },
    { id: 'component', label: 'Component', icon: Sliders },
    { id: 'validation', label: 'Validation', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-4">
      <div className="flex border-b border-gray-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              activeTab === id
                ? 'text-blue-600 border-blue-500'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {activeTab === 'basic' && (
          <BasicSettings
            component={component}
            onChange={(updates) => updateComponent(component.id, updates)}
          />
        )}
        {activeTab === 'component' && (
          <ComponentSettings
            component={component}
            onChange={(updates) => updateComponent(component.id, updates)}
          />
        )}
        {activeTab === 'validation' && (
          <ValidationSettings
            component={component}
            onChange={(updates) => updateComponent(component.id, updates)}
          />
        )}
      </div>
    </div>
  );
};