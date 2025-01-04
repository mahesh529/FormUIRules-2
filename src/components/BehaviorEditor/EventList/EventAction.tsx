import React from 'react';
import { EVENT_ACTIONS } from '../../../utils/eventUtils';
import { ComponentEvent } from '../../../types/form';

interface EventActionProps {
  value: ComponentEvent['action'];
  onChange: (value: ComponentEvent['action']) => void;
}

export const EventAction: React.FC<EventActionProps> = ({ value, onChange }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Action
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ComponentEvent['action'])}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {EVENT_ACTIONS.map((action) => (
          <option key={action.value} value={action.value}>
            {action.label}
          </option>
        ))}
      </select>
    </div>
  );
};