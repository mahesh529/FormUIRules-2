import React from 'react';
import { EVENT_TRIGGERS } from '../../../utils/eventUtils';
import { ComponentEvent } from '../../../types/form';

interface EventTriggerProps {
  value: ComponentEvent['trigger'];
  onChange: (value: ComponentEvent['trigger']) => void;
}

export const EventTrigger: React.FC<EventTriggerProps> = ({ value, onChange }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Trigger
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ComponentEvent['trigger'])}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {EVENT_TRIGGERS.map((trigger) => (
          <option key={trigger.value} value={trigger.value}>
            {trigger.label}
          </option>
        ))}
      </select>
    </div>
  );
};