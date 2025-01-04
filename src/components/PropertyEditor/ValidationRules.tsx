import React from 'react';
import { ValidationRule } from '../../types/form';
import { PropertyField } from './PropertyField';
import { Plus, Trash2 } from 'lucide-react';
import { VALIDATION_TYPES } from '../../utils/validationUtils';

interface ValidationRulesProps {
  rules: ValidationRule[];
  onChange: (rules: ValidationRule[]) => void;
}

export const ValidationRules: React.FC<ValidationRulesProps> = ({ rules = [], onChange }) => {
  const addRule = () => {
    onChange([...rules, { type: 'required', message: 'This field is required' }]);
  };

  const updateRule = (index: number, updates: Partial<ValidationRule>) => {
    const newRules = rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } : rule
    );
    onChange(newRules);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Validation Rules</h3>
        <button
          onClick={addRule}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
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
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
              <div className="flex justify-between">
                <div className="flex-1 space-y-4">
                  <PropertyField label="Type">
                    <select
                      value={rule.type}
                      onChange={(e) => updateRule(index, { type: e.target.value as ValidationRule['type'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {VALIDATION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </PropertyField>

                  {(rule.type === 'min' || rule.type === 'max') && (
                    <PropertyField label="Value">
                      <input
                        type="number"
                        value={rule.value || ''}
                        onChange={(e) => updateRule(index, { value: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </PropertyField>
                  )}

                  {rule.type === 'pattern' && (
                    <PropertyField label="Pattern">
                      <input
                        type="text"
                        value={rule.value || ''}
                        onChange={(e) => updateRule(index, { value: e.target.value })}
                        placeholder="Regular expression"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </PropertyField>
                  )}

                  <PropertyField label="Error Message">
                    <input
                      type="text"
                      value={rule.message}
                      onChange={(e) => updateRule(index, { message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </PropertyField>
                </div>

                <button
                  onClick={() => removeRule(index)}
                  className="text-gray-400 hover:text-red-500 p-1 h-fit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};