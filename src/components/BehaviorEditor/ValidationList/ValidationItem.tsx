import React from 'react';
import { ValidationRule } from '../../../types/form';
import { Trash2 } from 'lucide-react';
import { VALIDATION_TYPES } from '../../../utils/validationUtils';

interface ValidationItemProps {
  rule: ValidationRule;
  onChange: (updates: Partial<ValidationRule>) => void;
  onRemove: () => void;
}

export const ValidationItem: React.FC<ValidationItemProps> = ({
  rule,
  onChange,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-4 flex-1">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={rule.type}
                onChange={(e) =>
                  onChange({ type: e.target.value as ValidationRule['type'] })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {VALIDATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {(rule.type === 'min' || rule.type === 'max') && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={rule.value || ''}
                  onChange={(e) =>
                    onChange({ value: parseInt(e.target.value, 10) })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            {rule.type === 'pattern' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pattern
                </label>
                <input
                  type="text"
                  value={rule.value || ''}
                  onChange={(e) => onChange({ value: e.target.value })}
                  placeholder="Regular expression"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Error Message
            </label>
            <input
              type="text"
              value={rule.message}
              onChange={(e) => onChange({ message: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};