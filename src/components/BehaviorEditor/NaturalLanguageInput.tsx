import React, { useState } from 'react';
import { FormComponent, ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { MessageSquare, Wand2 } from 'lucide-react';
import { parseBehaviorText, generateBehaviorSuggestions } from '../../utils/behaviorParser';
import { CountryStateTemplate } from './templates/CountryStateTemplate';

interface NaturalLanguageInputProps {
  component: FormComponent;
  onAddBehavior: (behavior: ComponentEvent) => void;
}

export const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({ 
  component, 
  onAddBehavior 
}) => {
  const [input, setInput] = useState('');
  const { layout } = useFormStore();
  const suggestions = generateBehaviorSuggestions(component, layout.components);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { trigger, action, targetIds, value } = parseBehaviorText(input, layout.components);
    
    const behavior: ComponentEvent = {
      trigger,
      action,
      targetIds,
      conditionGroups: value ? [{
        operator: 'and',
        conditions: [{
          field: 'value',
          operator: 'equals',
          value
        }]
      }] : []
    };

    onAddBehavior(behavior);
    setInput('');
  };

  const formatSuggestion = (text: string) => {
    // Highlight field names in blue
    const fieldHighlight = layout.components.reduce((acc, comp) => {
      const regex = new RegExp(`(${comp.config.label})`, 'g');
      return acc.replace(regex, '<span class="text-blue-600 font-medium">$1</span>');
    }, text);

    // Highlight actions in purple
    const actionWords = ['changes', 'clicked', 'focused', 'blurred', 'show', 'hide', 'enable', 'disable', 'update', 'set'];
    const actionHighlight = actionWords.reduce((acc, word) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      return acc.replace(regex, '<span class="text-purple-600 font-medium">$1</span>');
    }, fieldHighlight);

    return actionHighlight;
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
              placeholder="Describe the behavior in natural language..."
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
      </form>

      {/* Templates */}
      <CountryStateTemplate onApply={setInput} />

      {/* Suggestions */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Wand2 className="w-4 h-4" />
          <span>Try these examples:</span>
        </div>
        <div className="grid gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="text-left text-sm hover:bg-blue-50 p-2 rounded-md transition-colors"
              dangerouslySetInnerHTML={{ __html: formatSuggestion(suggestion) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};