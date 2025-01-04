import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import { Star } from 'lucide-react';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

export const CheckboxPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { defaultValue = false } = component.config;
  
  React.useEffect(() => {
    if (values[component.id] === undefined) {
      updateValue(component.id, defaultValue);
    }
  }, [component.id, defaultValue]);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={values[component.id] ?? defaultValue}
        onChange={(e) => {
          updateValue(component.id, e.target.checked);
          onEvent('change', e.target.checked);
        }}
        disabled={!component.config.enabled}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  );
};

export const RadioPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const options = component.config.options || ['Option 1', 'Option 2', 'Option 3'];
  
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            name={component.id}
            value={option}
            checked={values[component.id] === option}
            onChange={(e) => {
              updateValue(component.id, e.target.value);
              onEvent('change', e.target.value);
            }}
            disabled={!component.config.enabled}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </div>
      ))}
    </div>
  );
};

export const SliderPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { min = 0, max = 100, step = 1 } = component.config;
  
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[component.id] ?? min}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          updateValue(component.id, value);
          onEvent('change', value);
        }}
        disabled={!component.config.enabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-sm text-gray-600 text-center">
        Value: {values[component.id] ?? min}
      </div>
    </div>
  );
};

export const TimePreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <input
      type="time"
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      disabled={!component.config.enabled}
      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export const DatePreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <input
      type="date"
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      disabled={!component.config.enabled}
      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export const VotingPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <div className="flex space-x-4">
      {['👍', '👎'].map((option, index) => (
        <button
          key={index}
          onClick={() => {
            updateValue(component.id, option);
            onEvent('change', option);
          }}
          disabled={!component.config.enabled}
          className={`p-2 text-2xl rounded-md transition-colors ${
            values[component.id] === option 
              ? 'bg-blue-100' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export const RatingPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const rating = values[component.id] || 0;
  
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            updateValue(component.id, star);
            onEvent('change', star);
          }}
          disabled={!component.config.enabled}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-500 transition-colors`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );
};