import React from 'react';
import { FormComponent } from '../../../types/form';
import { ValidationRules } from '../ValidationRules';

interface ValidationSettingsProps {
  component: FormComponent;
  onChange: (updates: Partial<FormComponent>) => void;
}

export const ValidationSettings: React.FC<ValidationSettingsProps> = ({ 
  component, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <ValidationRules
        rules={component.validation || []}
        onChange={(validation) => onChange({ validation })}
      />
    </div>
  );
};