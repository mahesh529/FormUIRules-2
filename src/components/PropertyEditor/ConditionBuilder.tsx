import React from 'react';
import { Condition, ConditionGroup } from '../../types/form';
import { PropertyField } from './PropertyField';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ConditionBuilderProps {
  conditionGroups: ConditionGroup[];
  onChange: (groups: ConditionGroup[]) => void;
}

export const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  conditionGroups,
  onChange,
}) => {
  const addGroup = () => {
    onChange([
      ...conditionGroups,
      {
        conditions: [{ field: 'value', operator: 'equals' }],
        operator: 'and',
      },
    ]);
  };

  const updateGroup = (index: number, updates: Partial<ConditionGroup>) => {
    const newGroups = conditionGroups.map((group, i) =>
      i === index ? { ...group, ...updates } : group
    );
    onChange(newGroups);
  };

  const removeGroup = (index: number) => {
    onChange(conditionGroups.filter((_, i) => i !== index));
  };

  const addCondition = (groupIndex: number) => {
    const newGroups = [...conditionGroups];
    newGroups[groupIndex].conditions.push({ field: 'value', operator: 'equals' });
    onChange(newGroups);
  };

  const updateCondition = (
    groupIndex: number,
    conditionIndex: number,
    updates: Partial<Condition>
  ) => {
    const newGroups = [...conditionGroups];
    newGroups[groupIndex].conditions[conditionIndex] = {
      ...newGroups[groupIndex].conditions[conditionIndex],
      ...updates,
    };
    onChange(newGroups);
  };

  const removeCondition = (groupIndex: number, conditionIndex: number) => {
    const newGroups = [...conditionGroups];
    newGroups[groupIndex].conditions = newGroups[groupIndex].conditions.filter(
      (_, i) => i !== conditionIndex
    );
    if (newGroups[groupIndex].conditions.length === 0) {
      newGroups.splice(groupIndex, 1);
    }
    onChange(newGroups);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Conditions</h3>
        <button
          onClick={addGroup}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Group
        </button>
      </div>

      {conditionGroups.map((group, groupIndex) => (
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
              onClick={() => removeGroup(groupIndex)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {group.conditions.map((condition, conditionIndex) => (
              <div key={conditionIndex} className="flex gap-2 items-start">
                <select
                  value={condition.field}
                  onChange={(e) =>
                    updateCondition(groupIndex, conditionIndex, {
                      field: e.target.value,
                    })
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
                    updateCondition(groupIndex, conditionIndex, {
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
                      updateCondition(groupIndex, conditionIndex, {
                        value: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Value"
                  />
                )}

                <button
                  onClick={() => removeCondition(groupIndex, conditionIndex)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => addCondition(groupIndex)}
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