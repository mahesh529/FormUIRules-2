import React from 'react';
import { FormComponent } from '../../../types/form';
import { ValidationItem } from './ValidationItem';
import { Plus } from 'lucide-react';
import { useFormStore } from '../../../store/formStore';
import { createDefaultValidation } from '../../../utils/validationUtils';

interface ValidationListProps {
  component: FormComponent;
}

export const ValidationList: React.FC<ValidationListProps> = ({ component }) => {
  const { updateComponent } = useFormStore();
  const rules = component.validation || [];

  const handleAddRule = () => {
    updateComponent(component.id, {
      validation: [...rules, createDefaultValidation()],
    });
  };

  const handleUpdateRule = (index: number, updates: any) => {
    const newRules = rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } : rule
    );
    updateComponent(component.id, { validation: newRules });
  };

  const handleRemoveRule = (index: number) => {
    updateComponent(component.id, {
      validation: rules.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Add validation rules to ensure data quality
        </p>
        <button
          onClick={handleAddRule}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      {rules.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No validation rules configured</p>
      ) : (
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <ValidationItem
              key={index}
              rule={rule}
              onChange={(updates) => handleUpdateRule(index, updates)}
              onRemove={() => handleRemoveRule(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};