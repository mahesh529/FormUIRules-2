import React from 'react';
import { PreviewProps } from '../types';
import { useFormStore } from '../../../../store/formStore';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export const VotingPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();

  return (
    <div className="flex gap-4">
      {[
        { value: 'up', icon: ThumbsUp },
        { value: 'down', icon: ThumbsDown }
      ].map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => {
            updateValue(component.id, value);
            onEvent('change', value);
          }}
          disabled={!component.config.enabled}
          className={`p-3 rounded-full transition-colors ${
            values[component.id] === value
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          } ${!component.config.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};