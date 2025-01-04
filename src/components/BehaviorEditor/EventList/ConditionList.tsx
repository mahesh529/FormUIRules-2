import React from 'react';
import { Condition } from '../../../types/form';
import { Plus, Trash2 } from 'lucide-react';

interface ConditionListProps {
  conditions: Condition[];
  onChange: (conditions: Condition[]) => void;
}

export const ConditionList: React.FC<ConditionListProps> = ({
  conditions,
  onChange,
}) => {
  const addCondition = () => {
    onChange([...conditions, { field: 'value', operator: 'equals' }]);
  };

  const updateCondition = (index: number, updates: Partial<Condition>) => {
    const newConditions = conditions.map((condition, i) =>
      i === index ? { ...condition, ...updates } : condition
    );
    onChange(newConditions);
  };

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {conditions.map((condition, index) => (
        <div key={index} className="flex gap-2 items-start">
          <select
            value={condition.field}
            onChange={(e) =>
              updateCondition(index, { field: e.target.value })
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="value">Value</option>
            <option value="component">Component</option>
            <option value="values">Form Values</option>
          </select>

          <select
            value={condition.operator}
            onChange={(e) =>
              updateCondition(index, {
                operator: e.target.value as Condition['operator'],
              })
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="equals">Equals</option>
            <option value="notEquals">Not Equals</option>
            <option value="contains">Contains</option>
            <option value="notContains">Not Contains</option>
            <option value="greaterThan">Greater Than</option>
            <option value="lessThan">Less Than</option>
            <option value="empty">Is Empty</option>
            <option value="notEmpty">Is Not Empty</option>
          </select>

          {condition.operator !== 'empty' && condition.operator !== 'notEmpty' && (
            <input
              type="text"
              value={condition.value || ''}
              onChange={(e) =>
                updateCondition(index, { value: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Value"
            />
          )}

          <button
            onClick={() => removeCondition(index)}
            className="text-gray-400 hover:text-red-500 p-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        onClick={addCondition}
        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Condition
      </button>
    </div>
  );
};