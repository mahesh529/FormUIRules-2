import React, { useState } from 'react';
import { ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { MessageSquare, Wand2 } from 'lucide-react';
import { parseBehaviorPrompt } from '../../utils/ai/parser';
import { BehaviorHighlighter } from '../../utils/ai/behaviorHighlighter';
import { generateBehaviorSuggestions } from '../../utils/ai/behaviorSuggestions';

interface AIBehaviorInputProps {
  onAddBehavior: (behavior: ComponentEvent) => void;
}

export const AIBehaviorInput: React.FC<AIBehaviorInputProps> = ({ onAddBehavior }) => {
  const [input, setInput] = useState('');
  const { layout } = useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parsed = parseBehaviorPrompt(input, layout.components);
    if (!parsed.sourceComponent) return;

    const behavior: ComponentEvent = {
      sourceComponent: parsed.sourceComponent,
      trigger: parsed.trigger,
      action: parsed.action,
      targetIds: parsed.targetComponents,
      conditionGroups: parsed.conditions ? [{
        operator: 'and',
        conditions: parsed.conditions
      }] : []
    };

    onAddBehavior(behavior);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
            <BehaviorHighlighter text={input} components={layout.components} />
          </div>
        )}
      </form>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Wand2 className="w-4 h-4" />
          <span>Try these examples:</span>
        </div>
        <div className="grid gap-2">
          {layout.components.length && generateBehaviorSuggestions(layout.components[0], layout.components).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="text-left hover:bg-blue-50 p-2 rounded-md transition-colors"
            >
              <BehaviorHighlighter 
                text={suggestion} 
                components={layout.components} 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};