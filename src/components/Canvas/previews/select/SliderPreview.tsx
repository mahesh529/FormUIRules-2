import React from 'react';
import { PreviewProps } from '../types';
import { useFormStore } from '../../../../store/formStore';

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