import React from 'react';
import { Condition, ConditionGroup } from '../../../types/form';
import { Plus, Trash2 } from 'lucide-react';

interface ConditionEditorProps {
  conditions: ConditionGroup[];
  onChange: (conditions: ConditionGroup[]) => void;
}

export const ConditionEditor: React.FC<ConditionEditorProps> = ({ conditions, onChange }) => {
  const addGroup = () => {
    onChange([
      ...conditions,
      {
        operator: 'and',
        conditions: [{ field: 'value', operator: 'equals' }]
      }
    ]);
  };

  const updateGroup = (index: number, updates: Partial<ConditionGroup>) => {
    const newGroups = conditions.map((group, i) =>
      i === index ? { ...group, ...updates } : group
    );
    onChange(newGroups);
  };

  const removeGroup = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Conditions
        </label>
        <button
          type="button"
          onClick={addGroup}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Condition Group
        </button>
      </div>

      {conditions.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
        >
          <div className="flex justify-between items-center">
            <select
              value={group.operator}
              onChange={(e) =>
                updateGroup(groupIndex, { operator: e.target.value as 'and' | 'or' })
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
            <button
              type="button"
              onClick={() => removeGroup(groupIndex)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {group.conditions.map((condition, conditionIndex) => (
            <div key={conditionIndex} className="flex gap-2">
              <select
                value={condition.operator}
                onChange={(e) => {
                  const newConditions = [...group.conditions];
                  newConditions[conditionIndex] = {
                    ...condition,
                    operator: e.target.value as Condition['operator']
                  };
                  updateGroup(groupIndex, { conditions: newConditions });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
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

              {!['empty', 'notEmpty'].includes(condition.operator) && (
                <input
                  type="text"
                  value={condition.value || ''}
                  onChange={(e) => {
                    const newConditions = [...group.conditions];
                    newConditions[conditionIndex] = {
                      ...condition,
                      value: e.target.value
                    };
                    updateGroup(groupIndex, { conditions: newConditions });
                  }}
                  placeholder="Value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              )}

              <button
                type="button"
                onClick={() => {
                  const newConditions = group.conditions.filter((_, i) => i !== conditionIndex);
                  updateGroup(groupIndex, { conditions: newConditions });
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const newConditions = [...group.conditions, { field: 'value', operator: 'equals' }];
              updateGroup(groupIndex, { conditions: newConditions });
            }}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Condition
          </button>
        </div>
      ))}
    </div>
  );
};