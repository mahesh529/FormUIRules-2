import React from 'react';
import { FormComponent } from '../../types/form';
import { ComponentPreviews } from './previews';
import { useFormStore } from '../../store/formStore';
import { handleComponentEvent } from '../../utils/eventHandler';

interface PreviewComponentProps {
  component: FormComponent;
  error?: string;
}

export const PreviewComponent: React.FC<PreviewComponentProps> = ({ component, error }) => {
  const store = useFormStore();
  const Preview = ComponentPreviews[component.type];

  if (!component.config.visible || !Preview) {
    return null;
  }

  const handleEvent = (eventType: 'change' | 'focus' | 'blur' | 'click', value?: any) => {
    component.events?.forEach(event => {
      if (event.trigger === eventType) {
        handleComponentEvent(event, component, value, store);
      }
    });
  };

  return (
    <div 
      className="space-y-1"
      onClick={() => handleEvent('click')}
      onFocus={() => handleEvent('focus')}
      onBlur={() => handleEvent('blur')}
    >
      <label className="block text-sm font-medium text-gray-700">
        {component.config.label}
        {component.config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Preview 
        component={component} 
        onEvent={handleEvent}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};