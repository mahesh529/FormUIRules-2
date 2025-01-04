import React from 'react';
import { FormComponent } from '../../../types/form';
import { ComponentProperties } from '../ComponentProperties';

interface ComponentSettingsProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

export const ComponentSettings: React.FC<ComponentSettingsProps> = ({ 
  component, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <ComponentProperties
        component={component}
        onUpdate={onChange}
      />
    </div>
  );
};