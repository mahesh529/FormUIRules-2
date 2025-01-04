import React, { useState } from 'react';
import { PreviewProps } from '../types';
import { useFormStore } from '../../../../store/formStore';
import ReactMarkdown from 'react-markdown';
import { Eye, Edit } from 'lucide-react';

export const MarkdownPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          {isPreview ? (
            <>
              <Edit className="w-4 h-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
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