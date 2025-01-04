import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

export const SliderPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { min = 0, max = 100, step = 1 } = component.properties;
  
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
        disabled={!component.enabled}
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
      disabled={!component.enabled}
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
      disabled={!component.enabled}
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
          disabled={!component.enabled}
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
          disabled={!component.enabled}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-500 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export const MediaPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <div className="space-y-2">
      <div className="w-full aspect-video bg-gray-100 rounded-md flex items-center justify-center border border-gray-300">
        {values[component.id] ? (
          <img 
            src={values[component.id]} 
            alt="Preview" 
            className="max-h-full rounded-md"
          />
        ) : (
          <span className="text-gray-500">Media preview</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const value = e.target?.result;
              updateValue(component.id, value);
              onEvent('change', value);
            };
            reader.readAsDataURL(file);
          }
        }}
        disabled={!component.enabled}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};