import React from 'react';
import { FormComponent } from '../../types/form';
import { Star } from 'lucide-react';

interface ComponentFieldsProps {
  component: FormComponent;
  onChange: (field: string, value: any) => void;
}

export const ComponentFields: React.FC<ComponentFieldsProps> = ({ component, onChange }) => {
  switch (component.type) {
    case 'text':
    case 'textarea':
    case 'paragraph':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={component.config.placeholder || ''}
              onChange={(e) => onChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Length
            </label>
            <input
              type="number"
              value={component.config.minLength || ''}
              onChange={(e) => onChange('minLength', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Length
            </label>
            <input
              type="number"
              value={component.config.maxLength || ''}
              onChange={(e) => onChange('maxLength', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </>
      );

    case 'number':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Value
            </label>
            <input
              type="number"
              value={component.config.min || ''}
              onChange={(e) => onChange('min', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Value
            </label>
            <input
              type="number"
              value={component.config.max || ''}
              onChange={(e) => onChange('max', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Step
            </label>
            <input
              type="number"
              value={component.config.step || '1'}
              onChange={(e) => onChange('step', e.target.value ? Number(e.target.value) : 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </>
      );

    case 'code':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={component.config.language || 'javascript'}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="sql">SQL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              value={component.config.theme || 'vs-dark'}
              onChange={(e) => onChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
            </select>
          </div>
        </>
      );

    case 'radio':
    case 'checkbox':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options (one per line)
          </label>
          <textarea
            value={(component.config.options || []).join('\n')}
            onChange={(e) => onChange('options', e.target.value.split('\n').filter(Boolean))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      );

    case 'rating':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Rating
            </label>
            <input
              type="number"
              value={component.config.maxRating || '5'}
              onChange={(e) => onChange('maxRating', parseInt(e.target.value) || 5)}
              min={1}
              max={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm text-gray-600">Star</span>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
};