import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import ReactMarkdown from 'react-markdown';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

export const TextPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { placeholder, minLength, maxLength } = component.config;
  
  return (
    <input
      type="text"
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      disabled={!component.config.enabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

export const TextAreaPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { placeholder, minLength, maxLength } = component.config;
  
  return (
    <textarea
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      disabled={!component.config.enabled}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

export const MarkdownPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const [isPreview, setIsPreview] = React.useState(false);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {isPreview ? (
        <div className="prose max-w-none p-4 border rounded-md bg-gray-50">
          <ReactMarkdown>{values[component.id] || ''}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={values[component.id] || ''}
          onChange={(e) => {
            updateValue(component.id, e.target.value);
            onEvent('change', e.target.value);
          }}
          onFocus={() => onEvent('focus')}
          onBlur={() => onEvent('blur')}
          placeholder="Write markdown here..."
          disabled={!component.config.enabled}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );
};

export const ParagraphPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const { placeholder } = component.config;
  
  return (
    <textarea
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      onFocus={() => onEvent('focus')}
      onBlur={() => onEvent('blur')}
      placeholder={placeholder || 'Enter paragraph text...'}
      disabled={!component.config.enabled}
      rows={6}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};