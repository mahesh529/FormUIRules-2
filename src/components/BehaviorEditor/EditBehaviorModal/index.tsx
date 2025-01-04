import React, { useState } from 'react';
import { ComponentEvent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import { X } from 'lucide-react';
import { ConditionEditor } from './ConditionEditor';
import { CustomCodeEditor } from './CustomCodeEditor';

interface EditBehaviorModalProps {
  componentId: string;
  behaviorIndex: number;
  onSave: (componentId: string, index: number, behavior: ComponentEvent) => void;
  onClose: () => void;
}

export const EditBehaviorModal: React.FC<EditBehaviorModalProps> = ({
  componentId,
  behaviorIndex,
  onSave,
  onClose
}) => {
  const { layout } = useFormStore();
  const component = layout.components.find(c => c.id === componentId);
  const behavior = component?.events?.[behaviorIndex];

  if (!component || !behavior) return null;

  const [editedBehavior, setEditedBehavior] = useState(behavior);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Behavior</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Trigger */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trigger
            </label>
            <select
              value={editedBehavior.trigger}
              onChange={(e) => setEditedBehavior({
                ...editedBehavior,
                trigger: e.target.value as ComponentEvent['trigger']
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="change">On Change</option>
              <option value="click">On Click</option>
              <option value="focus">On Focus</option>
              <option value="blur">On Blur</option>
            </select>
          </div>

          {/* Action */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <select
              value={editedBehavior.action}
              onChange={(e) => setEditedBehavior({
                ...editedBehavior,
                action: e.target.value as ComponentEvent['action']
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
              <option value="setValue">Set Value</option>
              <option value="customJs">Custom JavaScript</option>
            </select>
          </div>

          {editedBehavior.action === 'customJs' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom JavaScript
              </label>
              <CustomCodeEditor
                value={editedBehavior.customCode || ''}
                onChange={(code) => setEditedBehavior({
                  ...editedBehavior,
                  customCode: code || ''
                })}
              />
            </div>
          ) : (
            <>
              {/* Target Components */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Components
                </label>
                <select
                  multiple
                  value={editedBehavior.targetIds}
                  onChange={(e) => setEditedBehavior({
                    ...editedBehavior,
                    targetIds: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                >
                  {layout.components.map(comp => (
                    <option key={comp.id} value={comp.id}>
                      {comp.config.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditions */}
              <ConditionEditor
                conditions={editedBehavior.conditionGroups || []}
                onChange={(conditionGroups) => setEditedBehavior({
                  ...editedBehavior,
                  conditionGroups
                })}
              />
            </>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(componentId, behaviorIndex, editedBehavior)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};