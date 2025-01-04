import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BehaviorHighlighter } from '../../../utils/ai/highlighter';
import { FormComponent } from '../../../types/form';

interface InputFormProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  components: FormComponent[];
}

export const InputForm: React.FC<InputFormProps> = ({
  input,
  onInputChange,
  onSubmit,
  components
}) => (
  <form onSubmit={onSubmit} className="space-y-2">
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-3 text-gray-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Describe the behavior (e.g., When Email changes, show Password)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add
      </button>
    </div>

    {input && (
      <div className="p-3 bg-gray-50 rounded-md">
        <BehaviorHighlighter text={input} components={components} />
      </div>
    )}
  </form>
);