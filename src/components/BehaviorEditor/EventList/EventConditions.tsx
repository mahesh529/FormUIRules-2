import React from 'react';
import { ConditionGroup } from '../../../types/form';
import { Plus, Trash2 } from 'lucide-react';

interface EventConditionsProps {
  value: ConditionGroup[];
  onChange: (value: ConditionGroup[]) => void;
}

export const EventConditions: React.FC<EventConditionsProps> = ({ value, onChange }) => {
  const addGroup = () => {
    onChange([
      ...value,
      {
        conditions: [{ field: 'value', operator: 'equals' }],
        operator: 'and',
      },
    ]);
  };

  const updateGroup = (index: number, updates: Partial<ConditionGroup>) => {
    const newGroups = value.map((group, i) =>
      i === index ? { ...group, ...updates } : group
    );
    onChange(newGroups);
  };

  const removeGroup = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Conditions
        </label>
        <button
          onClick={addGroup}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Group
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No conditions</p>
      ) : (
        <div className="space-y-4">
          {value.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
            >
              <div className="flex justify-between items-center">
                <select
                  value={group.operator}
                  onChange={(e) =>
                    updateGroup(groupIndex, {
                      operator: e.target.value as 'and' | 'or',
                    })
                  }
                  className="text-sm border-gray-300 rounded-md"
                >
                  <option value="and">AND</option>
                  <option value="or">OR</option>
                </select>
                <button
                  onClick={() => removeGroup(groupIndex)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <ConditionList
                conditions={group.conditions}
                onChange={(conditions) =>
                  updateGroup(groupIndex, { conditions })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};